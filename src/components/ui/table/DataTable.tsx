import { ReactNode } from "react";

export type DataTableProps<T extends { id: string | number }> = {
  data: T[];
  headers?: ReadonlyArray<keyof T & string>;
  columnRenderers?: Partial<
    Record<keyof T & string, (value: T[keyof T], row: T) => ReactNode>
  >;
  labelMap?: Partial<Record<keyof T & string, string>>;
  displayId?: boolean;
  hideRowIndex?: boolean;
};

/**
 * 📊 DataTable<T>
 * A flexible, generic, and type-safe table component for displaying structured tabular data.
 *
 * @typeParam T - The shape of each row, which must include an `id` field (string or number).
 *
 * @prop data - An array of objects representing rows in the table.
 *              Each object must include a unique `id` field.
 *
 * @prop headers - Optional. An array of keys (from T) to define the column order.
 *                 If not provided, headers are inferred from the first row in `data`
 *                 and any keys from `columnRenderers`.
 *
 * @prop columnRenderers - Optional. A mapping of column keys to custom render functions.
 *                          Each function receives the cell value and the full row object.
 *                          Useful for rendering buttons, images, or formatted values.
 *
 * @prop labelMap - Optional. A mapping of column keys to human-readable header labels.
 *                  Falls back to a formatted version of the key (e.g., "first_name" → "First Name").
 *
 * @prop displayId - Optional. Whether to display the `id` column. Default is false.
 *
 * @prop hideRowIndex - Optional. Whether to hide the row index column. Default is false (shows row index by default).
 *
 * 🧠 Notes:
 * - To add virtual columns (e.g. an "actions" column), include the key in the row type
 *   with a value of `undefined`, and define its render logic in `columnRenderers`.
 * - Cells default to basic string rendering unless overridden by a renderer.
 *
 * 🧪 Example:
 * ```
 * <DataTable
 *   data={rows}
 *   columnRenderers={{
 *     image: (url) => <img src={url} alt="Preview" />,
 *     actions: (_, row) => <button onClick={() => edit(row.id)}>Edit</button>,
 *   }}
 *   labelMap={{ discount_percent: "Discount %" }}
 * />
 * ```
 */
export default function DataTable<T extends { id: string | number }>({
  data,
  columnRenderers,
  labelMap,
  displayId = false,
  hideRowIndex = false,
}: DataTableProps<T>) {
  if (data.length === 0) return <p>No data to display.</p>;

  // Combine headers from data and columnRenderers
  const dataHeaders = Object.keys(data[0]) as (keyof T & string)[];
  const rendererHeaders = columnRenderers
    ? (Object.keys(columnRenderers) as (keyof T & string)[])
    : [];

  const combinedHeaders = [
    ...new Set([...dataHeaders, ...rendererHeaders]),
  ].filter((header): header is keyof T & string =>
    displayId ? true : header !== "id"
  );

  return (
    <table>
      <thead>
        <tr>
          {!hideRowIndex && <th>#</th>}
          {combinedHeaders.map((header) => (
            <th key={header}>
              {labelMap?.[header] ?? formatHeaderLabel(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            {!hideRowIndex && <td>{index + 1}</td>}
            {combinedHeaders.map((header) => (
              <td key={header}>
                {columnRenderers?.[header]
                  ? columnRenderers[header]!(item[header], item)
                  : String(item[header])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatHeaderLabel(label: string) {
  return label === "id"
    ? "ID"
    : label.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
