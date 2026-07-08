import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex min-w-0">
        <Outlet />
      </div>
    </div>
  );
}