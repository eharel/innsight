import { MetricCard } from "../components/dashboard/MetricCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1>Dashboard</h1>
        <p className="text-text-muted">Welcome to the Innsight Hotel Management Dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Bookings Today" 
          value={8} 
          trend={{ value: 12, isPositive: true }}
        />
        
        <MetricCard 
          title="Check-ins Today" 
          value={5}
        />
        
        <MetricCard 
          title="Check-outs Today" 
          value={3}
        />
        
        <MetricCard 
          title="Occupancy Rate" 
          value="72%" 
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="card bg-bg-surface">
        <h2 className="mb-4">Recent Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Cabin</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>Today</td>
              <td>Jun 12, 2025</td>
              <td>Cabin 3</td>
              <td><span className="px-2 py-1 rounded-full text-xs bg-success/20 text-success">Checked In</span></td>
            </tr>
            <tr>
              <td>Sarah Johnson</td>
              <td>Today</td>
              <td>Jun 14, 2025</td>
              <td>Cabin 7</td>
              <td><span className="px-2 py-1 rounded-full text-xs bg-warning/20 text-warning">Pending</span></td>
            </tr>
            <tr>
              <td>Robert Davis</td>
              <td>Tomorrow</td>
              <td>Jun 15, 2025</td>
              <td>Cabin 5</td>
              <td><span className="px-2 py-1 rounded-full text-xs bg-bg-base text-text-muted">Confirmed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
