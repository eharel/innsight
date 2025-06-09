import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Pagination, Table } from "../components/ui";
import { BookingStatus } from "../components/booking";

// Map the existing status strings to our BookingStatus component types
const mapStatusToType = (
  status: string
): "confirmed" | "checked-in" | "checked-out" | "cancelled" | "no-show" => {
  switch (status) {
    case "Checked In":
      return "checked-in";
    case "Checked Out":
      return "checked-out";
    case "Booked":
    case "Confirmed":
      return "confirmed";
    case "Pending":
      return "confirmed"; // Using confirmed as a fallback
    default:
      return "confirmed";
  }
};

export default function Bookings() {
  // Mock data for bookings (in a real app, this would come from an API)
  const allBookings = [
    {
      id: 1,
      guest: "John Smith",
      status: "Checked In",
      dates: "Jun 10-15, 2025",
      cabin: "Cabin 3",
    },
    {
      id: 2,
      guest: "Sarah Johnson",
      status: "Booked",
      dates: "Jun 12-14, 2025",
      cabin: "Cabin 7",
    },
    {
      id: 3,
      guest: "Michael Brown",
      status: "Checked Out",
      dates: "Jun 5-10, 2025",
      cabin: "Cabin 2",
    },
    {
      id: 4,
      guest: "Emma Wilson",
      status: "Pending",
      dates: "Jun 15-20, 2025",
      cabin: "Cabin 5",
    },
    {
      id: 5,
      guest: "Robert Davis",
      status: "Confirmed",
      dates: "Jun 18-22, 2025",
      cabin: "Cabin 1",
    },
    // Add more mock data to demonstrate pagination
    {
      id: 6,
      guest: "Jennifer Lee",
      status: "Confirmed",
      dates: "Jun 20-25, 2025",
      cabin: "Cabin 4",
    },
    {
      id: 7,
      guest: "William Clark",
      status: "Cancelled",
      dates: "Jun 22-27, 2025",
      cabin: "Cabin 6",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  
  // Calculate total pages
  const totalPages = Math.ceil(allBookings.length / bookingsPerPage);
  
  // Get current bookings for the page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = allBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-base">Bookings</h1>
          <p className="text-text-muted">Manage all guest bookings here.</p>
        </div>
        <Button>+ New Booking</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Guest</Table.HeaderCell>
                <Table.HeaderCell>Dates</Table.HeaderCell>
                <Table.HeaderCell>Cabin</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currentBookings.map((booking) => (
                <Table.Row key={booking.id}>
                  <Table.Cell>#{booking.id}</Table.Cell>
                  <Table.Cell>{booking.guest}</Table.Cell>
                  <Table.Cell>{booking.dates}</Table.Cell>
                  <Table.Cell>{booking.cabin}</Table.Cell>
                  <Table.Cell>
                    <BookingStatus
                      status={mapStatusToType(booking.status)}
                      size="sm"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="text"
                      size="sm"
                      as={Link}
                      to={`/bookings/${booking.id}`}
                    >
                      View Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
