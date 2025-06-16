import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Header />
      <main className="content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
