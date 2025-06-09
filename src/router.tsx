import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./routes/Dashboard";
import Bookings from "./routes/Bookings";
import Cabins from "./routes/Cabins";
import Users from "./routes/Users";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import BookingCheckIn from "./routes/BookingCheckIn";
import AccountSettings from "./routes/AccountSettings";
import AppSettings from "./routes/AppSettings";

// Create the router with all routes configuration
// This is the modern approach recommended in React Router v6.4+
export const router = createBrowserRouter([
  {
    // Protected routes - all require authentication and share the same layout
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />, // Used for error boundaries within this route
    children: [
      // Root path redirects to dashboard
      { index: true, element: <Navigate to="/dashboard" replace /> },
      // Main application routes
      { path: "dashboard", element: <Dashboard /> },
      { path: "bookings", element: <Bookings /> },
      { path: "bookings/:bookingId", element: <BookingCheckIn /> },
      { path: "cabins", element: <Cabins /> },
      { path: "users", element: <Users /> },
      // Settings routes grouped
      {
        path: "settings",
        element: <Outlet />, // Nested outlet for settings routes
        children: [
          { index: true, element: <Navigate to="/settings/app" replace /> },
          { path: "app", element: <AppSettings /> },
          { path: "account", element: <AccountSettings /> },
        ],
      },
    ],
  },
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },
  // 404 catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Exporting route types for type-safe navigation (optional)
export type AppRoutes = typeof router;
