import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui";
// Import icons
import { MdDashboard, MdHotel, MdPeople, MdSettings } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Sidebar() {
  // State to track dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has previously set a preference
    const savedMode = localStorage.getItem("darkMode");
    // Check if the system prefers dark mode
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    // Return true if explicitly saved as 'true' or if system prefers dark and no preference is saved
    return savedMode === "true" || (systemPrefersDark && savedMode === null);
  });

  // Apply the theme class to the document root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <aside className="sidebar">
      <div className="mb-8">
        <Logo size="medium" />
      </div>

      <nav>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="flex items-center gap-2">
                <MdDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="flex items-center gap-2">
                <BsCalendarCheck size={18} />
                <span>Bookings</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cabins"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="flex items-center gap-2">
                <MdHotel size={18} />
                <span>Cabins</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="flex items-center gap-2">
                <MdPeople size={18} />
                <span>Users</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <div className="flex items-center gap-2">
                <MdSettings size={18} />
                <span>Settings</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={toggleDarkMode}
          className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
        >
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
      </div>
    </aside>
  );
}
