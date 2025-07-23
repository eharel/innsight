import CrudPage from "@/layout/crud-page/CrudPage";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import { CabinFormData, CabinRow, CabinTableRow } from "@/features/cabins";
import { DataTableProps } from "@/components/ui";
import { Image } from "@/components/ui/base";
import { formatCurrency } from "@/utils/helpers";
import { useCrudMutations } from "@/hooks/useCrudMutations";
import {
  createCabin,
  updateCabin,
  deleteCabin,
} from "@/services/api/apiCabins";
import { CrudFormInput, CrudHandlers } from "@/layout/crud-page/types";
import { useRef } from "react";
import { CrudPageHandle } from "@/layout/crud-page/CrudPage";

export default function Cabins() {
  const ref = useRef<CrudPageHandle<CabinRow>>(null);

  const cabins = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const queryClient = useQueryClient();
  const mutations = useCrudMutations({
    entityName: "Cabin",
    createFn: createCabin,
    updateFn: updateCabin,
    deleteFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      ref.current?.closeModal();
    },
  });

  const handleCreate = (data: CabinFormData) => {
    mutations.create.mutate(data);
  };

  const handleUpdate = (id: number, data: CabinFormData) => {
    mutations.update.mutate({ id, data });
  };

  const handleDelete = (id: number) => {
    mutations.delete.mutate(id);
  };

  const crudPageHandlers: CrudHandlers<CabinFormData> = {
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  };

  const cabinsData: CabinRow[] =
    cabins?.data?.map(
      (cabin): CabinRow => ({
        id: cabin.id,
        photo_url: cabin.photo_url,
        name: cabin.name,
        capacity: cabin.capacity,
        price: cabin.price,
        discount_amount: cabin.discount_amount,
        discount_percent: cabin.discount_percent,
        description: cabin.description,
      })
    ) || [];

  const tableProps: DataTableProps<CabinRow> = {
    data: cabinsData,
    labelMap,
    columnRenderers,
  };

  return (
    <CrudPage
      title="Cabins"
      tableProps={tableProps}
      formInputs={formInputs}
      handlers={crudPageHandlers}
      defaultValuesMapper={defaultValuesMapper}
      ref={ref}
    />
  );
}

const labelMap: DataTableProps<CabinTableRow>["labelMap"] = {
  photo_url: "Photo",
  discount_percent: "Discount %",
  discount_amount: "Discount $",
};

const columnRenderers: DataTableProps<CabinTableRow>["columnRenderers"] = {
  photo_url: (value: string) => (
    <Image src={value} alt="Cabin" className="w-16 h-12" enablePreview />
  ),
  discount_amount: (value: number) => formatCurrency(value),
  discount_percent: (value: number) => `${value}%`,
  description: (value: string) => (
    <span className="line-clamp-2 max-w-[200px] cursor-help" title={value}>
      {value}
    </span>
  ),
};

const formInputs: CrudFormInput<CabinFormData>[] = [
  {
    name: "name",
    label: "Cabin name",
    required: true,
    validation: { required: "Name is required" },
  },
  {
    name: "description",
    label: "Cabin description",
    required: true,
    validation: { required: "Description is required" },
  },
  {
    name: "price",
    label: "Cabin price",
    required: true,
    validation: {
      required: "Price is required",
      min: { value: 1, message: "Price must be at least 1" },
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
    },
  },
  {
    name: "discount_amount",
    label: "Cabin discount amount",
    validation: (methods) => ({
      min: { value: 0, message: "Discount amount cannot be negative" },
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
      validate: (value) => {
        const price = methods.getValues("price");
        if (value <= price || value === undefined) return true;
        return "Discount amount cannot exceed price";
      },
    }),
  },
  {
    name: "discount_percent",
    label: "Cabin discount percentage",
    validation: {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
      min: {
        value: 0,
        message: "Discount percentage cannot be negative",
      },
      max: {
        value: 100,
        message: "Discount percentage cannot exceed 100",
      },
    },
  },
  {
    name: "capacity",
    label: "Cabin capacity",
    required: true,
    validation: {
      setValueAs: (value) => (value === "" ? undefined : Number(value)),
      required: "Capacity is required",
      min: { value: 1, message: "Capacity must be at least 1" },
    },
  },
  {
    name: "photo_url",
    label: "Cabin image",
    type: "file",
    validation: {},
  },
];

const defaultValuesMapper = (row: CabinRow) => ({
  name: row.name,
  description: row.description,
  price: row.price,
  discount_amount: row.discount_amount,
  discount_percent: row.discount_percent,
  capacity: row.capacity,
  photo_url: undefined,
});
