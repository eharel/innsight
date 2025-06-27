import { Button, DataTable } from "@/components/ui";
import { CrudMode, CrudPageProps } from "./types";
import { useState } from "react";
import { DataTableProps } from "@/components/ui/table";
import Modal from "@/components/ui/base/Modal";
import CrudForm from "./CrudForm";

export default function CrudPage<TForm, TTableDisplay extends { id: number }>({
  title,
  data,
  tableConfig,
  formInputs,
  handlers,
}: CrudPageProps<TForm, TTableDisplay>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<CrudMode>("create");

  const handleClose = () => {
    setModalOpen(false);
  };

  const columnActions = {
    actions: (_, row) => {
      // TODO: track if this row is being deleted
      const isBeingDeleted = false;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            // onClick={() => mutations.update.mutate({ id: row.id, data: row })}
            onClick={() => {
              console.log(`Edit: ${row.id}`);
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handlers?.onDelete?.(row.id);
            }}
            disabled={isBeingDeleted}
          >
            {isBeingDeleted ? "Deleting..." : "Delete"}
          </Button>
        </div>
      );
    },
  } as DataTableProps<TTableDisplay>["columnRenderers"];

  const tableProps: DataTableProps<TTableDisplay> = {
    data,
    labelMap: tableConfig.labelMap,
    columnRenderers: {
      ...columnActions,
      ...tableConfig.columnRenderers,
    },
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

      <DataTable {...tableProps} />

      <Modal isOpen={modalOpen} onClose={handleClose}>
        <CrudForm
          formInputs={formInputs}
          isEdit={mode === "edit"}
          onSubmit={(data) => {
            if (mode === "edit") {
              // You probably want to store `row.id` in state earlier when editing
              // For now, hardcoded/fake id to illustrate:
              handlers.onUpdate?.(/* id */ 123, data);
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
