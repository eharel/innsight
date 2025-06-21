import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import Spinner from "@/components/ui/base/Spinner";
import DataTable from "@/components/ui/table/DataTable";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { CabinRow } from "./types";
import { DataTableProps } from "@/components/ui/table";
import { Image } from "@/components/ui/base";
import { useMutation } from "@tanstack/react-query";
import { deleteCabin } from "@/services/api/apiCabins";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function CabinsTable() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      console.log("Cabin deleted successfully");
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      console.error("Error deleting cabin:", error);
      toast.error("Error deleting cabin");
    },
  });

  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching cabins</div>;
  }

  const handleEdit = (id: number) => {
    console.log("Edit cabin with id: ", id);
  };

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

  const columnRenderers: DataTableProps<CabinRow>["columnRenderers"] = {
    photo_url: (value: string) => (
      <Image src={value} alt="Cabin" className="w-16 h-12" enablePreview />
    ),
    price: (value: number) => formatCurrency(value),
    discount_percent: (value: number) => `${value}%`,
    description: (value: string) => (
      <span className="line-clamp-2 max-w-[200px] cursor-help" title={value}>
        {value}
      </span>
    ),
    actions: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => handleEdit(row.id)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => deleteMutation(row.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    ),
  };

  const labelMap: DataTableProps<CabinRow>["labelMap"] = {
    photo_url: "Photo",
    discount_percent: "Discount %",
    discount_amount: "Discount $",
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing {cabinsData.length}{" "}
        {cabinsData.length === 1 ? "cabin" : "cabins"}
      </p>

      <DataTable
        data={cabinsData}
        columnRenderers={columnRenderers}
        labelMap={labelMap}
      />
    </div>
  );
}
