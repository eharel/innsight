export default function Header() {
  return (
    <div className="flex items-center justify-between w-full h-16 px-6">
      {/* Logo / Title */}
      <div className="text-xl font-semibold text-primary">
        Innsight Dashboard
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-muted">Welcome, Admin</span>
        <button className="text-sm px-3 py-1.5 rounded-md border border-border text-text-main hover:bg-bg-base transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
