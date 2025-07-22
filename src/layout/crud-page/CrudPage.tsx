import {
  forwardRef,
  JSX,
  useImperativeHandle,
  useState,
  type ForwardedRef,
} from "react";

import { Button, DataTable } from "@/components/ui";
import { CrudMode, CrudPageProps } from "./types";
import Modal from "@/components/ui/base/Modal";
import CrudForm from "./CrudForm";
import { defaultRowActions } from "@/components/ui/table/rowActions";

function CrudPageInner<TForm, TTableDisplay extends { id: number }>(
  {
    title,
    tableProps,
    formInputs,
    handlers,
    defaultValuesMapper,
  }: CrudPageProps<TForm, TTableDisplay>,
  ref: ForwardedRef<CrudPageHandle<TTableDisplay>>
) {
  const [editingRow, setEditingRow] = useState<TTableDisplay | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<CrudMode>("create");

  const handleClose = () => setModalOpen(false);

  const onSubmit = (data: TForm) => {
    if (mode === "edit") {
      handlers.onUpdate?.(editingRow?.id, data, { onSuccess: handleClose });
    } else {
      handlers.onCreate?.(data, { onSuccess: handleClose });
    }
  };

  // 👇 Expose modal control via the ref
  useImperativeHandle(ref, () => ({
    closeModal: handleClose,
    openCreateModal: () => {
      setMode("create");
      setModalOpen(true);
    },
    openEditModal: (row: TTableDisplay) => {
      setEditingRow(row);
      setMode("edit");
      setModalOpen(true);
    },
  }));

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
          defaultValues={
            mode === "edit"
              ? defaultValuesMapper?.(editingRow as TTableDisplay) ?? undefined
              : undefined
          }
          onSubmit={onSubmit}
          onError={handlers.onError}
        />
      </Modal>
    </div>
  );
}

export type CrudPageHandle<TTableDisplay = unknown> = {
  closeModal: () => void;
  openCreateModal: () => void;
  openEditModal: (row: TTableDisplay) => void;
};

const CrudPage = forwardRef(CrudPageInner) as <
  TForm,
  TTableDisplay extends { id: number }
>(
  props: CrudPageProps<TForm, TTableDisplay> & {
    ref?: React.Ref<CrudPageHandle<TTableDisplay>>;
  }
) => JSX.Element;

export default CrudPage;
