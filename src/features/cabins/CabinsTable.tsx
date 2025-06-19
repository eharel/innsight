import { CabinRow } from "./CabinRow";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import Spinner from "@/components/ui/base/Spinner";
import DataTable from "@/components/ui/table/DataTable";

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

  // const headers = ["Photo", "Name", "Capacity", "Price", "Discount", "Actions"];
  const headers = ["Name", "Capacity", "Price", "Discount"] as const;

  const cabinsData = cabins?.map((cabin) => {
    return {
      id: cabin.id,
      Name: cabin.name,
      Capacity: cabin.capacity,
      Price: cabin.price,
      Discount: cabin.discount_percent,
    };
  });

  return <DataTable headers={headers} data={cabinsData || []} />;

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
