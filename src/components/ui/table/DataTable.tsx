type DataTableProps<T extends { id: string | number }> = {
  headers: ReadonlyArray<keyof T & string>;
  data: T[];
};

export default function DataTable<T extends { id: string | number }>({
  headers,
  data,
}: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {headers
            .filter((header) => header !== "id")
            .map((header) => (
              <th key={header}>{header}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {headers
              .filter((header) => header !== "id")
              .map((header) => (
                <td key={header}>{String(item[header])}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
