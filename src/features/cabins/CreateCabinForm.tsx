import { FormField, Input } from "@/components/ui";
import Form from "@/components/ui/Form/Form";

export default function CreateCabinForm() {
  return (
    <Form>
      <FormField
        label="Cabin name"
        htmlFor="cabinName"
        required
      >
        <Input type="text" id="cabinName" />
      </FormField>
      <FormField
        label="Price per night"
        htmlFor="pricePerNight"
        required
      >
        <Input type="number" id="pricePerNight" />
      </FormField>
      <FormField
        label="Description"
        htmlFor="description"
        hint="Brief description of the cabin"
      >
        <Input type="text" id="description" />
      </FormField>
      <FormField
        label="Image URL"
        htmlFor="imageUrl"
      >
        <Input type="text" id="imageUrl" />
      </FormField>
      <FormField
        label="Maximum capacity"
        htmlFor="maxCapacity"
        required
      >
        <Input type="number" id="maxCapacity" />
      </FormField>
    </Form>
  );
}
