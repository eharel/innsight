import { Badge } from '../ui';

// Define the booking data type
export interface BookingRowData {
  id: number;
  guest: string;
  checkIn: string;
  checkOut: string;
  cabin: string;
  status: 'Checked In' | 'Pending' | 'Confirmed' | 'Cancelled';
}

interface BookingRowProps {
  booking: BookingRowData;
  onClick?: (booking: BookingRowData) => void;
}

export default function BookingRow({ booking, onClick }: BookingRowProps) {
  // Badge styles by status
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'Checked In': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(booking);
    }
  };

  return (
    <tr 
      className={`hover:bg-bg-subtle transition-colors ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick ? handleClick : undefined}
    >
      <td className="p-3">{booking.guest}</td>
      <td className="p-3">{booking.checkIn}</td>
      <td className="p-3">{booking.checkOut}</td>
      <td className="p-3">{booking.cabin}</td>
      <td className="p-3">
        <Badge variant={getBadgeVariant(booking.status)}>
          {booking.status}
        </Badge>
      </td>
    </tr>
  );
}
