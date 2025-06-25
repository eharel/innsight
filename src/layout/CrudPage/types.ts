import { UpdateArgs } from "@/hooks/useCrudMutations";
import { UseMutationResult } from "@tanstack/react-query";
import { ComponentType, ReactNode } from "react";

export type CrudMode = "create" | "edit";

export type CrudFormProps<T> = {
  mode: CrudMode;
  onClose: () => void;
  initialData?: T;
};

export type CrudTableConfig<T> = {
  columns: (keyof T & string)[];
  labelMap?: Partial<Record<keyof T, string>>;
  columnRenderers?: Partial<
    Record<keyof T & string, (value: any, row: T) => ReactNode>
  >;
};

export type CrudMutationProps<TInput, TOutput> = {
  create: UseMutationResult<TOutput, unknown, TInput>;
  update: UseMutationResult<TOutput, unknown, UpdateArgs<TInput>>;
  delete: UseMutationResult<TOutput, unknown, number>;
};

export type CrudPageProps<TInput, TOutput extends { id: number }> = {
  title: string;
  queryKey: string;
  data: TOutput[];
  FormComponent: ComponentType<CrudFormProps<TInput>>;
  createLabel?: string;

  tableConfig: CrudTableConfig<TOutput>;
  mutations: CrudMutationProps<TInput, TOutput>;

  // Built-in behavioral hooks
  onEdit?: (row: TOutput) => void;
  onDelete?: (id: number) => void;
  isDeleting?: (id: number) => boolean;
  extraActions?: (row: TOutput) => ReactNode;
};
