import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | allowed | denied

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE}/api/admin/verify`, { credentials: "include" })
      .then((res) => {
        if (cancelled) return;
        setStatus(res.ok ? "allowed" : "denied");
      })
      .catch(() => {
        if (!cancelled) setStatus("denied");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-neutral-400">
        Loading...
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
