import { RegisterOptions, useFormContext } from "react-hook-form";
import FormField from "./FormField";
import Input from "@/components/ui/base/Input";

export type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  validation?: RegisterOptions;
  defaultValue?: string | number;
};

export default function FormInput({
  name,
  label,
  type,
  required,
  validation = {},
  defaultValue,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      label={label}
      required={required}
      error={errors?.[name]?.message as string}
    >
      <Input
        type={type}
        defaultValue={defaultValue}
        {...register(name, validation)}
      />
    </FormField>
  );
}
