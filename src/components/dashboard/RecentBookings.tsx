import BookingRow from '../../components/booking/BookingRow';
import type { BookingRowData } from '../../components/booking/BookingRow';

interface RecentBookingsProps {
  bookings?: BookingRowData[];
  isLoading?: boolean;
  limit?: number;
  onBookingClick?: (booking: BookingRowData) => void;
}

export default function RecentBookings({ 
  bookings, 
  isLoading = false,
  limit = 5,
  onBookingClick
}: RecentBookingsProps) {
  // Use mock data if no bookings are provided
  const displayBookings = bookings || [
    { id: 1, guest: "John Smith", checkIn: "Today", checkOut: "Jun 12, 2025", cabin: "Cabin 3", status: "Checked In" as const },
    { id: 2, guest: "Sarah Johnson", checkIn: "Today", checkOut: "Jun 14, 2025", cabin: "Cabin 7", status: "Pending" as const },
    { id: 3, guest: "Robert Davis", checkIn: "Tomorrow", checkOut: "Jun 15, 2025", cabin: "Cabin 5", status: "Confirmed" as const },
    { id: 4, guest: "Emma Wilson", checkIn: "Jun 11, 2025", checkOut: "Jun 16, 2025", cabin: "Cabin 1", status: "Pending" as const },
    { id: 5, guest: "Michael Brown", checkIn: "Jun 12, 2025", checkOut: "Jun 17, 2025", cabin: "Cabin 9", status: "Confirmed" as const },
  ].slice(0, limit);

  return (
    <div className="card bg-bg-surface">
      <div className="mb-4">
        <h2 className="text-lg font-medium">Recent Bookings</h2>
      </div>
      
      <table className="w-full text-left">
        <thead className="bg-bg-subtle">
          <tr>
            <th className="p-3 font-medium">Guest</th>
            <th className="p-3 font-medium">Check-in</th>
            <th className="p-3 font-medium">Check-out</th>
            <th className="p-3 font-medium">Cabin</th>
            <th className="p-3 font-medium">Status</th>
          </tr>
        </thead>
        
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-8">
                Loading bookings...
              </td>
            </tr>
          ) : displayBookings.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8">
                No recent bookings found
              </td>
            </tr>
          ) : (
            displayBookings.map((booking) => (
              <BookingRow 
                key={booking.id} 
                booking={booking} 
                onClick={onBookingClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
