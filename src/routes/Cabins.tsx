import CabinForm from "@/features/cabins/CabinForm";
import CrudPage from "@/layout/CrudPage";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import { CabinRow, CabinTableRow } from "@/features/cabins";
import { DataTableProps } from "@/components/ui";
import { Image } from "@/components/ui/base";
import { formatCurrency } from "@/utils/helpers";
import { useCrudMutations } from "@/hooks/useCrudMutations";
import {
  createCabin,
  updateCabin,
  deleteCabin,
} from "@/services/api/apiCabins";

export default function Cabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
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
    },
  });

  const cabinsData: CabinRow[] =
    cabins?.map(
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

  return (
    <CrudPage
      title="Cabins"
      queryKey="cabins"
      data={cabinsData}
      FormComponent={CabinForm}
      createLabel="+ Add New Cabin"
      tableConfig={{
        columns: [],
        labelMap,
        columnRenderers,
      }}
      mutations={mutations}
    />
  );
}
