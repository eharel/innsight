import { MetricCard } from "../components/dashboard/MetricCard";
import RecentBookings from "../components/dashboard/RecentBookings";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1>Dashboard</h1>
        <p className="text-text-muted">
          Welcome to the Innsight Hotel Management Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Bookings Today"
          value={8}
          trend={{ value: 12, isPositive: true }}
        />

        <MetricCard title="Check-ins Today" value={5} />

        <MetricCard title="Check-outs Today" value={3} />

        <MetricCard
          title="Occupancy Rate"
          value="72%"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <RecentBookings limit={3} />
    </div>
  );
}
