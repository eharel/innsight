import React, { ReactNode } from "react";

export type DataTableProps<T extends { id: string | number }> = {
  data: T[];
  columnRenderers?: Partial<
    Record<keyof T & string, (value: T[keyof T], row: T) => ReactNode>
  >;
  labelMap?: Partial<Record<keyof T & string, string>>;
  rowActions?: Array<(row: T) => ReactNode>;
  displayId?: boolean;
  hideRowIndex?: boolean;
};

export default function DataTable<T extends { id: string | number }>({
  data,
  columnRenderers,
  labelMap,
  rowActions,
  displayId = false,
  hideRowIndex = false,
}: DataTableProps<T>) {
  if (data.length === 0)
    return <p className="text-text-muted italic">No data to display.</p>;

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
    <div className="overflow-auto border border-border rounded-lg shadow-sm">
      <table className="min-w-full table-auto border-collapse text-sm text-left">
        <thead className="bg-bg-surface text-text-muted uppercase tracking-wide text-xs border-b border-border">
          <tr>
            {!hideRowIndex && <th className="px-4 py-2">#</th>}
            {combinedHeaders.map((header) => (
              <th key={header} className="px-4 py-2 whitespace-nowrap">
                {labelMap?.[header] ?? formatHeaderLabel(header)}
              </th>
            ))}
            {rowActions?.length > 0 && (
              <th className="px-4 py-2 whitespace-nowrap">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-bg-base transition-colors duration-100"
            >
              {!hideRowIndex && (
                <td className="px-4 py-2 text-text-muted">{index + 1}</td>
              )}
              {combinedHeaders.map((header) => (
                <td key={header} className="px-4 py-2 align-top">
                  {columnRenderers?.[header]
                    ? columnRenderers[header]!(item[header], item)
                    : String(item[header])}
                </td>
              ))}

              {rowActions?.length > 0 && (
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex gap-2">
                    {rowActions.map((action, index) => (
                      <React.Fragment key={index}>
                        {action(item)}
                      </React.Fragment>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatHeaderLabel(label: string) {
  return label === "id"
    ? "ID"
    : label.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
