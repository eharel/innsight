
import styled from 'styled-components';

const StyledDashboard = styled.div`
  padding: 2rem;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <h1>Dashboard</h1>
      <p>Welcome to the hotel management dashboard. This will display important information for the last 7, 30, or 90 days.</p>
      <div>
        <h2>Today's Activity</h2>
        <p>Guests checking in and out today will appear here.</p>
      </div>
      <div>
        <h2>Statistics</h2>
        <p>Recent bookings, sales, check-ins, and occupancy rate will be displayed here.</p>
      </div>
      <div>
        <h2>Charts</h2>
        <p>Charts showing daily hotel sales and stay durations will appear here.</p>
      </div>
    </StyledDashboard>
  );
}

export default Dashboard;
