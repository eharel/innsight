import CabinsTable from "@/features/cabins/CabinsTable";
import { Button } from "@/components/ui";
import { useState } from "react";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";

export default function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Cabins</h1>
          <p className="text-text-muted">Manage all hotel cabins here.</p>
        </div>
        {/* TODO: Add filter and sort */}
        <p>Filter / Sort</p>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add New Cabin"}
        </Button>
      </div>
      {showForm && <CreateCabinForm />}
      <CabinsTable />
    </div>
  );
}
