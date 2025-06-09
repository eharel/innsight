export default function Header() {
  return (
    <header>
      <div className="text-xl font-semibold text-primary">Innsight Dashboard</div>
      
      <div className="flex items-center gap-4">
        <span className="text-text-muted">Welcome, Admin</span>
        <button className="btn-secondary text-sm">Logout</button>
      </div>
    </header>
  );
}