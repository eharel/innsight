import CabinsTable from "@/features/cabins/CabinsTable";
import { Button } from "@/components/ui";

export default function Cabins() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Cabins</h1>
          <p className="text-text-muted">Manage all hotel cabins here.</p>
        </div>
        {/* TODO: Add filter and sort */}
        <p>Filter / Sort</p>
        <Button>+ Add New Cabin</Button>
      </div>
      <CabinsTable />
    </div>
  );
}
