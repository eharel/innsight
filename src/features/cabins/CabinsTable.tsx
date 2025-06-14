import { CabinRow } from "./CabinRow";
import { useState } from "react";
import type { CabinData } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/api/apiCabins";
import Spinner from "@/components/ui/Spinner";

export default function CabinsTable() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  console.log(cabins);

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

  return (
    <div className="card bg-bg-surface overflow-hidden">
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cabins?.map((cabin) => (
            <CabinRow
              key={cabin.id}
              cabin={cabin}
              // onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
