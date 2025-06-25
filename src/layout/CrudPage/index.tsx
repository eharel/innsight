import { Button, DataTable } from "@/components/ui";
import { CrudMode, CrudPageProps } from "./types";
import { useState } from "react";
import { DataTableProps } from "@/components/ui/table";
import Modal from "@/components/ui/base/Modal";

export default function CrudPage<TInput, TOutput extends { id: number }>({
  title,
  FormComponent,
  data,
  createLabel = "+ Add New",
  tableConfig,
  mutations,
}: CrudPageProps<TInput, TOutput>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<CrudMode>("create");
  const [initialData, setInitialData] = useState<TInput | undefined>(undefined);

  const handleCreate = () => {
    setInitialData(undefined);
    setMode("create");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setInitialData(undefined);
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
            onClick={() => mutations.delete.mutate(row.id)}
            disabled={isBeingDeleted}
          >
            {isBeingDeleted ? "Deleting..." : "Delete"}
          </Button>
        </div>
      );
    },
  } as DataTableProps<TInput & { id: number }>["columnRenderers"];

  const tableProps: DataTableProps<TInput & { id: number }> = {
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
            setInitialData(undefined);
          }}
        >
          {modalOpen ? "Close" : createLabel}
        </Button>
      </div>

      <DataTable {...tableProps} />

      <Modal isOpen={modalOpen} onClose={handleClose}>
        <FormComponent
          mode={mode}
          onClose={handleClose}
          initialData={initialData}
        />
      </Modal>
    </div>
  );
}
