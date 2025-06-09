import { Link } from "react-router-dom";

export default function Bookings() {
  // Mock data for bookings
  const bookings = [
    { id: 1, guest: "John Smith", status: "Checked In", dates: "Jun 10-15, 2025", cabin: "Cabin 3" },
    { id: 2, guest: "Sarah Johnson", status: "Booked", dates: "Jun 12-14, 2025", cabin: "Cabin 7" },
    { id: 3, guest: "Michael Brown", status: "Checked Out", dates: "Jun 5-10, 2025", cabin: "Cabin 2" },
    { id: 4, guest: "Emma Wilson", status: "Pending", dates: "Jun 15-20, 2025", cabin: "Cabin 5" },
    { id: 5, guest: "Robert Davis", status: "Confirmed", dates: "Jun 18-22, 2025", cabin: "Cabin 1" },
  ];
  
  // Helper function to return status style based on booking status
  const getStatusStyle = (status: string) => {
    switch(status) {
      case "Checked In": 
        return "bg-success/20 text-success";
      case "Booked":
      case "Confirmed": 
        return "bg-accent/20 text-accent";
      case "Checked Out": 
        return "bg-bg-base text-text-muted";
      case "Pending": 
        return "bg-warning/20 text-warning";
      default: 
        return "bg-bg-base text-text-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Bookings</h1>
          <p className="text-text-muted">Manage all guest bookings here.</p>
        </div>
        <button className="btn-primary">+ New Booking</button>
      </div>

      <div className="card bg-bg-surface">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Cabin</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>{booking.guest}</td>
                <td>{booking.dates}</td>
                <td>{booking.cabin}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <Link to={`/bookings/${booking.id}`} className="text-primary hover:underline">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
