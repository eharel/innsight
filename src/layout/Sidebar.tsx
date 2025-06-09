import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  // State to track dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has previously set a preference
    const savedMode = localStorage.getItem('darkMode');
    // Check if the system prefers dark mode
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Return true if explicitly saved as 'true' or if system prefers dark and no preference is saved
    return savedMode === 'true' || (systemPrefersDark && savedMode === null);
  });

  // Apply the theme class to the document root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <aside className="sidebar">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Innsight</h1>
        <p className="text-text-muted text-sm">Hotel Management</p>
      </div>

      <nav>
        <ul className="space-y-1">
          <li>
            <NavLink to="/dashboard" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookings" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"}
            >
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/cabins" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"}
            >
              Cabins
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({isActive}) => 
              isActive ? "nav-link active" : "nav-link"}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-8">
        <button 
          onClick={toggleDarkMode}
          className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
        >
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather">
            {darkMode ? (
              // Sun icon for light mode switch
              <>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </>
            ) : (
              // Moon icon for dark mode switch
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            )}
          </svg>
        </button>
      </div>
    </aside>
  );
}