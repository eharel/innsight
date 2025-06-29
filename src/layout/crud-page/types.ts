import { DataTableProps, FormInputProps } from "@/components/ui";
import { RegisterOptions, UseFormReturn } from "react-hook-form";

// ============================================================
// ========================= General ==========================
// ============================================================

export type CrudMode = "create" | "edit";

export type CrudHandlers<TForm> = {
  onCreate?: (data: TForm) => void;
  onUpdate?: (id: number, data: TForm) => void;
  onDelete?: (id: number) => void;
  onSubmit?: (data: TForm) => void;
  onError?: (error: unknown) => void;
};

export type CrudPageProps<TForm, TTableDisplay extends { id: number }> = {
  title: string;
  tableProps: DataTableProps<TTableDisplay>;
  formInputs: CrudFormInput<TForm>[];
  handlers: CrudHandlers<TForm>;

  // Built-in behavioral hooks
  // isDeleting?: (id: number) => boolean;
  // extraActions?: (row: TTableDisplay) => ReactNode;
};

// ============================================================
// =============== 🧾 CRUD Form Type System ===================
// ============================================================

/**
 * Describes a single input field in the form,
 * tied to a key in the TForm object.
 */
export type CrudFormInput<TForm> = Omit<
  FormInputProps,
  "name" | "validation"
> & {
  name: keyof TForm & string;
  validation?:
    | RegisterOptions
    | ((methods: UseFormReturn<TForm>) => RegisterOptions);
};

/**
 * Props for the internal CrudForm component.
 * Used by CrudPage to render the form UI.
 */
export type InternalCrudFormProps<TForm> = {
  formInputs: CrudFormInput<TForm>[];
  isEdit?: boolean;
  title?: string;
  onSubmit?: (data: TForm) => void;
  onError?: (error: unknown) => void;
};

// ============================================================
// ========================= Table ============================
// ============================================================

// export type CrudTableConfig<T> = {
//   labelMap?: Partial<Record<keyof T, string>>;
//   // columnRenderers?: Partial<
//   //   Record<keyof T & string, (value: any, row: T) => ReactNode>
//   // >;
//   columnRenderers?: {
//     [K in keyof T & string]?: (value: T[K], row: T) => ReactNode;
//   };
// };
