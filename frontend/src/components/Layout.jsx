import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MobileTopBar from "./MobileTopBar.jsx";

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close on Escape, and lock page scroll while the drawer is open
  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen flex text-neutral-900">
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-base"
        />
      )}

      <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopBar onOpenMenu={() => setDrawerOpen(true)} />
        <div className="flex-1 flex min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}