export default function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="app-title">Innsight</div>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <button>Logout</button>
        </div>
      </div>
    </header>
  );
}