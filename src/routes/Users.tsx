import { useState } from "react";

export default function Users() {
  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@innsight.com", role: "Admin" },
    { id: 2, name: "Staff Member", email: "staff@innsight.com", role: "Staff" },
    { id: 3, name: "Reception User", email: "reception@innsight.com", role: "Reception" },
  ]);

  // Function to handle user deletion
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <p>Manage system users and their roles.</p>

      <button>Add New User</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
