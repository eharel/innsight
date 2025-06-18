import { FormField, Input, Form } from "@/components/ui";

export default function CreateCabinForm() {
  return (
    <Form>
      <FormField label="Cabin name" htmlFor="cabinName" required>
        <Input type="text" id="cabinName" />
      </FormField>
      <FormField label="Cabin description" htmlFor="cabinDescription">
        <Input type="text" id="cabinDescription" />
      </FormField>
      <FormField label="Cabin price" htmlFor="cabinPrice" required>
        <Input type="number" id="cabinPrice" min={0} />
      </FormField>
      <FormField label="Cabin capacity" htmlFor="cabinCapacity" required>
        <Input type="number" id="cabinCapacity" min={1} defaultValue={1} />
      </FormField>
      <FormField label="Cabin image" htmlFor="cabinImage">
        <Input type="file" id="cabinImage" />
      </FormField>
    </Form>
  );
}
