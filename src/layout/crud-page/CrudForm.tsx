import { FormInputProps, FormInput } from "@/components/ui";
import { DefaultValues, RegisterOptions, useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CrudFormInput, InternalCrudFormProps } from "./types";

export default function CrudForm<T>({
  formInputs = [],
  isEdit,
  defaultValues,
  onSubmit,
  onError,
}: InternalCrudFormProps<T>) {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  return (
    <div className="bg-[var(--color-bg-base)] rounded-lg border border-[--color-border] p-6 shadow-sm transition-shadow hover:shadow-md max-w-2xl mx-auto w-full">
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          {formInputs.map((input) => (
            <FormInput
              key={input.name}
              {...(input as FormInputProps)}
              validation={resolveValidation(input, methods)}
            />
          ))}
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
              {isEdit ? "Update " : "Create "}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

function resolveValidation<T>(
  input: CrudFormInput<T>,
  methods: UseFormReturn<T>
): RegisterOptions | undefined {
  return typeof input.validation === "function"
    ? input.validation(methods)
    : input.validation;
}
