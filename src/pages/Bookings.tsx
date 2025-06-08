import React from 'react';
import styled from 'styled-components';

const StyledBookings = styled.div`
  padding: 2rem;
`;

function Bookings() {
  return (
    <StyledBookings>
      <h1>Bookings</h1>
      <p>Manage all hotel bookings here.</p>
      <div>
        <h2>Booking Table</h2>
        <p>This will display a table with all bookings, showing arrival and departure dates, status, paid amount, cabin and guest data.</p>
        <p>You'll be able to filter bookings by status: unconfirmed, checked in, or checked out.</p>
      </div>
    </StyledBookings>
  );
}

export default Bookings;
