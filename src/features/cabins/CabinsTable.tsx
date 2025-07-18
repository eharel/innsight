import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import Spinner from "@/components/ui/base/Spinner";
import DataTable from "@/components/ui/table/DataTable";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { CabinRow, CabinTableRow } from "./types";
import { DataTableProps } from "@/components/ui/table";
import { Image } from "@/components/ui/base";
import { useMutation } from "@tanstack/react-query";
import { deleteCabin } from "@/services/api/apiCabins";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CabinsTable() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { isPending: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: deleteCabin,
    onMutate: (id) => {
      setDeleteId(id);
    },
    onSuccess: (_, id) => {
      const cabinName = cabins?.find((c) => c.id === id)?.name ?? "Cabin";
      const deleteMsg = `Cabin ${cabinName} deleted successfully`;
      toast.success(deleteMsg);
      console.log(deleteMsg);

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      console.error("Error deleting cabin:", error);
      toast.error("Error deleting cabin");
    },
    onSettled: (_, __, id) => {
      setDeleteId((currentId) => (currentId === id ? null : currentId));
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

  const columnRenderers: DataTableProps<CabinTableRow>["columnRenderers"] = {
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
    actions: (_, row) => {
      const isDeletingThisCabin = deleteId === row.id;
      return (
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleEdit(row.id)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteMutation(row.id)}
            disabled={isDeleting}
          >
            {isDeletingThisCabin ? "Deleting..." : "Delete"}
          </Button>
        </div>
      );
    },
  };

  const labelMap: DataTableProps<CabinTableRow>["labelMap"] = {
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
