import CabinsTable from "@/features/cabins/CabinsTable";

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
        <button className="btn-primary">+ Add New Cabin</button>
      </div>
      <CabinsTable />
    </div>
  );
}
