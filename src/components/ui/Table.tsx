import type {
  ReactNode,
  ThHTMLAttributes,
  TdHTMLAttributes,
  TableHTMLAttributes,
} from "react";
import { createContext, useContext } from "react";

// Context to share table styling
type TableContextType = {
  variant: "default" | "compact" | "border";
  hoverable: boolean;
  striped: boolean;
};

const TableContext = createContext<TableContextType>({
  variant: "default",
  hoverable: false,
  striped: false,
});

// Root Table component
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  variant?: "default" | "compact" | "border";
  hoverable?: boolean;
  striped?: boolean;
  fullWidth?: boolean;
}

function Table({
  children,
  variant = "default",
  hoverable = false,
  striped = false,
  fullWidth = true,
  className = "",
  ...props
}: TableProps) {
  // Base table styles
  const baseClasses = "border-collapse text-sm text-left";

  // Width styles
  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <TableContext.Provider value={{ variant, hoverable, striped }}>
      <div className="overflow-x-auto">
        <table
          className={`${baseClasses} ${widthClasses} ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

// Table Header
interface TableHeaderProps extends ThHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

function TableHeader({ children, className = "", ...props }: TableHeaderProps) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

// Table Body
interface TableBodyProps extends ThHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

function TableBody({ children, className = "", ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

// Table Row
interface TableRowProps extends ThHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

function TableRow({ children, className = "", ...props }: TableRowProps) {
  const { variant, hoverable } = useContext(TableContext);

  // Hoverable effect
  const hoverClasses = hoverable ? "hover:bg-bg-base/60" : "";

  // Striped effect - applied in TableBody logic to actual rows

  // Border variant adds border to rows
  const variantClasses = variant === "border" ? "border-b border-border" : "";

  return (
    <tr className={`${hoverClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </tr>
  );
}

// Table Header Cell
interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

function TableHeaderCell({
  children,
  className = "",
  ...props
}: TableHeaderCellProps) {
  const { variant } = useContext(TableContext);

  // Base header styles
  const baseClasses = "font-medium text-text-base";

  // Variant-specific styles
  const variantClasses = {
    default: "p-4 border-b border-border",
    compact: "p-2 border-b border-border",
    border: "p-4 border-b border-border",
  }[variant];

  return (
    <th className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </th>
  );
}

// Table Cell
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

function TableCell({ children, className = "", ...props }: TableCellProps) {
  const { variant } = useContext(TableContext);

  // Variant-specific styles
  const variantClasses = {
    default: "p-4",
    compact: "p-2",
    border: "p-4 border-b border-border",
  }[variant];

  return (
    <td className={`${variantClasses} ${className}`} {...props}>
      {children}
    </td>
  );
}

// Compound component exports
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;

export { Table };
