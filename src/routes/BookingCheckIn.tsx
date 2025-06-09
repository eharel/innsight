import { useParams, Link } from "react-router-dom";

export default function BookingCheckIn() {
  // Get the booking ID from the URL parameters
  const { bookingId } = useParams<{ bookingId: string }>();
  
  // In a real app, you would fetch the booking details using the ID
  // For now, we'll use mock data
  const booking = {
    id: Number(bookingId),
    guest: "John Smith",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    dates: "Jun 10-15, 2025",
    status: "Booked",
    cabin: "Forest Retreat",
    numGuests: 2,
    observations: "Guest requested extra pillows."
  };

  const handleCheckIn = () => {
    // In a real app, this would update the booking status in the database
    alert(`Checking in booking #${bookingId}`);
  };

  return (
    <div>
      <div>
        <Link to="/bookings">&larr; Back to all bookings</Link>
      </div>

      <h1>Booking #{bookingId}</h1>
      
      <div>
        <h2>Guest Information</h2>
        <p>Name: {booking.guest}</p>
        <p>Email: {booking.email}</p>
        <p>Phone: {booking.phone}</p>
      </div>

      <div>
        <h2>Booking Details</h2>
        <p>Dates: {booking.dates}</p>
        <p>Cabin: {booking.cabin}</p>
        <p>Number of guests: {booking.numGuests}</p>
        <p>Status: {booking.status}</p>
        <p>Observations: {booking.observations}</p>
      </div>

      <div>
        <button onClick={handleCheckIn}>Check In</button>
        <button onClick={() => alert(`Cancelling booking #${bookingId}`)}>Cancel Booking</button>
      </div>
    </div>
  );
}
