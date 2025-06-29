import { Button, DataTable } from "@/components/ui";
import { CrudMode, CrudPageProps } from "./types";
import { useState } from "react";
import Modal from "@/components/ui/base/Modal";
import CrudForm from "./CrudForm";
import { defaultRowActions } from "@/components/ui/table/rowActions";

export default function CrudPage<TForm, TTableDisplay extends { id: number }>({
  title,
  tableProps,
  formInputs,
  handlers,
}: CrudPageProps<TForm, TTableDisplay>) {
  const [editingRow, setEditingRow] = useState<TTableDisplay | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<CrudMode>("create");

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>{title}</h1>
        <Button
          variant={modalOpen ? "outline" : "primary"}
          onClick={() => {
            setModalOpen(!modalOpen);
            setMode("create");
          }}
        >
          {modalOpen ? "Close" : "Create"}
        </Button>
      </div>

      <DataTable
        {...tableProps}
        rowActions={defaultRowActions<TTableDisplay>({
          onEdit: (row) => {
            setModalOpen(true);
            setMode("edit");
            setEditingRow(row);
          },
          onDelete: (row) => {
            handlers.onDelete?.(row.id);
          },
        })}
      />

      <Modal isOpen={modalOpen} onClose={handleClose}>
        <CrudForm
          formInputs={formInputs}
          isEdit={mode === "edit"}
          onSubmit={(data) => {
            if (mode === "edit") {
              // You probably want to store `row.id` in state earlier when editing
              // For now, hardcoded/fake id to illustrate:
              handlers.onUpdate?.(editingRow?.id, data);
            } else {
              handlers.onCreate?.(data);
            }
          }}
          onError={handlers.onError}
        />
      </Modal>
    </div>
  );
}
