import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type UpdateArgs<Input> = {
  id: number;
  data: Input;
};

type UseCrudMutationsProps<Input, Output> = {
  entityName: string; // for toasts and queryKey
  createFn: (data: Input) => Promise<Output>;
  updateFn: (id: number, data: Input) => Promise<Output>;
  deleteFn: (id: number) => Promise<Output>;
  onSuccess?: () => void;
};

export function useCrudMutations<Input, Output>({
  entityName,
  createFn,
  updateFn,
  deleteFn,
  onSuccess,
}: UseCrudMutationsProps<Input, Output>) {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Output, unknown, Input>({
    mutationFn: createFn,
    onSuccess: () => {
      toast.success(`${entityName} created successfully`);
      queryClient.invalidateQueries({ queryKey: [entityName] });
      onSuccess?.();
    },
    onError: () => {
      const msg = `Failed to create ${entityName}`;
      console.log(msg);
      toast.error(msg);
    },
  });

  const updateMutation = useMutation<Output, unknown, UpdateArgs<Input>>({
    mutationFn: ({ id, data }) => updateFn(id, data),
    onSuccess: () => {
      toast.success(`${entityName} updated successfully`);
      queryClient.invalidateQueries({ queryKey: [entityName] });
      onSuccess?.();
    },
    onError: () => {
      const msg = `Failed to update ${entityName}`;
      console.log(msg);
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation<Output, unknown, number>({
    mutationFn: deleteFn,
    onSuccess: () => {
      const msg = `${entityName} deleted successfully`;
      console.log(msg);
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: [entityName] });
      onSuccess?.();
    },
    onError: () => {
      const msg = `Failed to delete ${entityName}`;
      console.log(msg);
      toast.error(msg);
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
  };
}
