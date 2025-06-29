import { Button } from "../base";
import { ReactNode } from "react";

// Optional utility: group buttons with prewiring
export function defaultRowActions<T>({
  onEdit,
  onDelete,
}: {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}): Array<(row: T) => ReactNode> {
  return [
    (row) =>
      onEdit ? (
        <Button variant="outline" onClick={() => onEdit(row)}>
          Edit
        </Button>
      ) : null,
    (row) =>
      onDelete ? (
        <Button variant="destructive" onClick={() => onDelete(row)}>
          Delete
        </Button>
      ) : null,
  ];
}
