import { Link } from "react-router-dom";

export default function Bookings() {
  // Mock data for bookings
  const bookings = [
    { id: 1, guest: "John Smith", status: "Checked In", dates: "Jun 10-15, 2025" },
    { id: 2, guest: "Sarah Johnson", status: "Booked", dates: "Jun 12-14, 2025" },
    { id: 3, guest: "Michael Brown", status: "Checked Out", dates: "Jun 5-10, 2025" },
  ];

  return (
    <div>
      <h1>Bookings</h1>
      <p>Manage all guest bookings here.</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.guest}</td>
              <td>{booking.dates}</td>
              <td>{booking.status}</td>
              <td>
                <Link to={`/bookings/${booking.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
