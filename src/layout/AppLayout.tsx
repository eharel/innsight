import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Header />
      <main className="content">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>
    </div>
  );
}