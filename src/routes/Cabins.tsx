import { useEffect, useState } from "react";
import { CabinRow } from "../components/cabin/CabinRow";
import { getCabins } from "@/services/api/apiCabins";

type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export default function Cabins() {
  useEffect(() => {
    getCabins().then((cabins) => {
      console.log(cabins);
    });
  }, []);

  // Mock cabin data
  const [cabins, setCabins] = useState<Cabin[]>([
    {
      id: 1,
      name: "Forest Retreat",
      maxCapacity: 2,
      regularPrice: 250,
      discount: 0,
      description: "Cozy cabin for two with forest views.",
      image:
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Mountain View",
      maxCapacity: 4,
      regularPrice: 350,
      discount: 25,
      description: "Spacious cabin with stunning mountain views.",
      image:
        "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Lakeside Cabin",
      maxCapacity: 6,
      regularPrice: 500,
      discount: 50,
      description: "Large cabin by the lake, perfect for families.",
      image:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3",
    },
  ]);

  // Function to handle cabin deletion
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this cabin?")) {
      setCabins(cabins.filter((cabin) => cabin.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Cabins</h1>
          <p className="text-text-muted">Manage all hotel cabins here.</p>
        </div>
        <button className="btn-primary">+ Add New Cabin</button>
      </div>

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
            {cabins.map((cabin) => (
              <CabinRow
                key={cabin.id}
                id={cabin.id}
                name={cabin.name}
                maxCapacity={cabin.maxCapacity}
                regularPrice={cabin.regularPrice}
                discount={cabin.discount}
                description={cabin.description}
                image={cabin.image}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
