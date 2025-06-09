import { useState } from "react";

export default function Cabins() {
  // Mock cabin data
  const [cabins, setCabins] = useState([
    {
      id: 1,
      name: "Forest Retreat",
      maxCapacity: 2,
      regularPrice: 250,
      discount: 0,
      description: "Cozy cabin for two with forest views.",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Mountain View",
      maxCapacity: 4,
      regularPrice: 350,
      discount: 25,
      description: "Spacious cabin with stunning mountain views.",
      image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Lakeside Cabin",
      maxCapacity: 6,
      regularPrice: 500,
      discount: 50,
      description: "Large cabin by the lake, perfect for families.",
      image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3"
    },
  ]);

  // Function to handle cabin deletion
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this cabin?")) {
      setCabins(cabins.filter(cabin => cabin.id !== id));
    }
  };

  return (
    <div>
      <h1>Cabins</h1>
      <p>Manage all hotel cabins here.</p>

      <button>Add New Cabin</button>

      <div>
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
            {cabins.map(cabin => (
              <tr key={cabin.id}>
                <td>
                  <img 
                    src={cabin.image} 
                    alt={cabin.name} 
                    style={{ width: "64px", height: "48px", objectFit: "cover" }} 
                  />
                </td>
                <td>{cabin.name}</td>
                <td>{cabin.maxCapacity} persons</td>
                <td>${cabin.regularPrice}</td>
                <td>{cabin.discount > 0 ? `$${cabin.discount}` : "—"}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(cabin.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
