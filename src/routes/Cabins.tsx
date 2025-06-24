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
        </div>
        <Button
          variant={showForm ? "outline" : "primary"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add New Cabin"}
        </Button>
      </div>
      {showForm && (
        <div className="flex justify-center">
          <CreateCabinForm onClose={() => setShowForm(false)} />
        </div>
      )}
      {/* TODO: Add filter and sort */}
      <CabinsTable />
    </div>
  );
}
