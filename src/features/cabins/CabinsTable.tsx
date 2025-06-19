import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import Spinner from "@/components/ui/base/Spinner";
import DataTable from "@/components/ui/table/DataTable";
import { formatCurrency } from "@/utils/helpers";
import { Button } from "@/components/ui";
import { CabinRow } from "./types";
import { DataTableProps } from "@/components/ui/table";

export default function CabinsTable() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  // Function to handle cabin deletion
  // const handleDelete = (id: number) => {
  //   if (window.confirm("Are you sure you want to delete this cabin?")) {
  //     setCabins(cabins.filter((cabin) => cabin.id !== id));
  //   }
  // };

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching cabins</div>;
  }

  const handleDelete = (id: number) => {
    console.log("Delete cabin with id: ", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit cabin with id: ", id);
  };

  const cabinsData: CabinRow[] =
    cabins?.map(
      (cabin): CabinRow => ({
        id: cabin.id,
        image: cabin.photo_url,
        name: cabin.name,
        capacity: cabin.capacity,
        price: cabin.price,
        discount_percent: cabin.discount_percent,
      })
    ) || [];

  const columnRenderers: DataTableProps<CabinRow>["columnRenderers"] = {
    image: (value: string) => (
      <img src={value} alt="Cabin" className="w-16 h-12" />
    ),
    price: (value: number) => formatCurrency(value),
    discount_percent: (value: number) => `${value}%`,
    actions: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => handleEdit(row.id)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(row.id)}>
          Delete
        </Button>
      </div>
    ),
  };

  return <DataTable data={cabinsData} columnRenderers={columnRenderers} />;

  // return (
  //   <div className="card bg-bg-surface overflow-hidden">
  //     <table>
  //       <p>{cabins?.length}</p>
  //       <thead>
  //         <tr>
  //           <th>Photo</th>
  //           <th>Name</th>
  //           <th>Capacity</th>
  //           <th>Price</th>
  //           <th>Discount</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {cabins?.map((cabin) => (
  //           <CabinRow
  //             key={cabin.id}
  //             cabin={cabin}
  //             // onDelete={handleDelete}
  //           />
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}
