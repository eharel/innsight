import { NavLink } from "react-router-dom";
import { Logo } from "@/components/ui";
import { MdDashboard, MdHotel, MdPeople, MdSettings } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import ThemeSelector from "@/components/ui/base/ThemeSelector";

export default function Sidebar() {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <MdDashboard size={18} /> },
    { to: "/bookings", label: "Bookings", icon: <BsCalendarCheck size={18} /> },
    { to: "/cabins", label: "Cabins", icon: <MdHotel size={18} /> },
    { to: "/users", label: "Users", icon: <MdPeople size={18} /> },
    { to: "/settings", label: "Settings", icon: <MdSettings size={18} /> },
  ];

  return (
    <aside className="flex flex-col h-full p-4 gap-6">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Logo size="medium" />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                   ${
                     isActive
                       ? "bg-primary text-white"
                       : "text-text-muted hover:bg-bg-base hover:text-text-main"
                   }`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeSelector />
    </aside>
  );
}
