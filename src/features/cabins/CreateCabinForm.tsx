import { FormField, Input, Form, Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { BaseCabin } from "./types";
import { useMutation } from "@tanstack/react-query";
import { createCabin } from "@/services/api/apiCabins";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateCabinForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BaseCabin>();

  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createMutation } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      console.log("Cabin created successfully");
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      onClose();
      reset();
    },
    onError: (error) => {
      console.error("Error creating cabin:", error);
      toast.error("Error creating cabin");
    },
  });

  const onSubmit = (data: BaseCabin) => {
    console.log("Creating cabin:", data);
    createMutation(data);
  };

  // TODO: Add form validation. If required fields are missing, show an error message
  return (
    <div className="bg-white rounded-lg border border-[--color-border] p-6 shadow-sm transition-shadow hover:shadow-md max-w-xl mx-auto">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Cabin name"
          htmlFor="name"
          required
          error={errors.name?.message}
        >
          <Input type="text" id="name" {...register("name")} />
        </FormField>
        <FormField label="Cabin description" htmlFor="description">
          <Input type="text" id="description" {...register("description")} />
        </FormField>
        <FormField label="Cabin price" htmlFor="price" required>
          <Input type="number" id="price" min={0} {...register("price")} />
        </FormField>
        <FormField label="Cabin capacity" htmlFor="capacity" required>
          <Input
            type="number"
            id="capacity"
            min={1}
            defaultValue={1}
            {...register("capacity")}
          />
        </FormField>
        <FormField label="Cabin image" htmlFor="photo_url">
          <Input type="file" id="photo_url" {...register("photo_url")} />
        </FormField>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" type="reset" disabled={isCreating}>
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={isCreating}>
            Create Cabin
          </Button>
          <Button variant="destructive">Test 1</Button>
          <Button variant="text">Test 2</Button>
          <Button variant="link">Test 3</Button>
        </div>
      </Form>
    </div>
  );
}
