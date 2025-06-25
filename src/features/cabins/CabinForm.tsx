import { FormProvider, useForm } from "react-hook-form";
import { Form, Button } from "@/components/ui";
import { CabinFormData, CabinRow } from "./types";
import { createCabin, updateCabin } from "@/services/api/apiCabins";
import { toast } from "sonner";
import { FormInput } from "@/components/ui/form";
import { useCrudMutations } from "@/hooks/useCrudMutations";

export default function CabinForm({
  onClose,
  cabin,
  mode,
}: {
  onClose: () => void;
  mode: "create" | "edit";
  cabin?: CabinRow;
}) {
  const methods = useForm<CabinFormData>({
    defaultValues: toCabinFormDefaults(cabin),
  });
  const isEdit = mode === "edit";

  const onSubmit = (data: CabinFormData) => {
    const formattedData = {
      ...data,
      photo_url: data.photo_url ?? undefined,
    };

    console.log(isEdit ? "Updating cabin:" : "Creating cabin:", formattedData);

    if (isEdit && cabin?.id) {
      updateMutation.mutate({ id: cabin.id, data: formattedData });
    } else {
      createMutation.mutate(formattedData);
    }
  };

  const onError = (error: unknown) => {
    const msg = isEdit ? "Error updating cabin" : "Error creating cabin";
    console.error(msg, error);
    toast.error(msg);
  };

  // TODO: Add form validation. If required fields are missing, show an error message
  return (
    <div className="bg-[var(--color-bg-base)] rounded-lg border border-[--color-border] p-6 shadow-sm transition-shadow hover:shadow-md max-w-2xl mx-auto w-full">
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <FormInput
            name="name"
            label="Cabin name"
            required
            validation={{ required: "Name is required" }}
          />

          <FormInput
            name="description"
            label="Cabin description"
            required
            validation={{ required: "Description is required" }}
          />

          <FormInput
            name="price"
            label="Cabin price"
            required
            validation={{
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            }}
          />

          <FormInput
            name="discount_amount"
            label="Cabin discount amount"
            required
            validation={{
              required: "Discount amount is required",
              min: { value: 0, message: "Discount amount cannot be negative" },
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
              validate: (value) => {
                const price = methods.getValues("price");
                if (value <= price) return true;
                return "Discount amount cannot exceed price";
              },
            }}
          />

          <FormInput
            name="discount_percent"
            label="Cabin discount percentage"
            required
            validation={{
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
              required: "Discount percentage is required",
              min: {
                value: 0,
                message: "Discount percentage cannot be negative",
              },
              max: {
                value: 100,
                message: "Discount percentage cannot exceed 100",
              },
            }}
          />

          <FormInput
            name="capacity"
            label="Cabin capacity"
            required
            validation={{
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
              required: "Capacity is required",
              min: { value: 1, message: "Capacity must be at least 1" },
            }}
          />

          <FormInput
            name="photo_url"
            label="Cabin image"
            type="file"
            validation={{}}
          />

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              type="reset"
              // disabled={createMutation.isPending || updateMutation.isPending}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              // disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEdit ? "Update Cabin" : "Create Cabin"}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

function toCabinFormDefaults(cabin?: CabinRow): CabinFormData {
  return {
    name: cabin?.name || "",
    description: cabin?.description || "",
    price: cabin?.price || 0,
    discount_amount: cabin?.discount_amount || 0,
    discount_percent: cabin?.discount_percent || 0,
    capacity: cabin?.capacity || 0,
    photo_url: undefined,
  };
}
