import { NavLink } from "react-router-dom";
import {
  Home, Search, ClipboardList, FileText, Bookmark,
  User, Sparkles, Settings,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";



const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/recommendations", icon: Search, label: "Recommendations" },
  { to: "/applications", icon: ClipboardList, label: "Applications" },
  { to: "/resume", icon: FileText, label: "Resume" },
  { to: "/profile", icon: User, label: "Profile" },
  // { to: "/", icon: Sparkles, label: "AI coach", badge: "Coming Soon" },
  // { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {

    const {user} = useAuth();
    const {logout} = useAuth();


  return (
    <aside className="w-60 shrink-0 border-r border-neutral-100 flex flex-col py-6 px-4 sticky top-0 h-screen overflow-y-auto">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
          <span className="text-white text-sm font-bold">J</span>
        </div>
        <span className="font-semibold">JobPilot</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-neutral-500 hover:bg-neutral-50"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <item.icon size={17} />
              {item.label}
            </span>
            {item.badge && (
              <span className="text-[10px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
  {/* <div className="rounded-xl bg-neutral-50 p-4">
    <p className="text-sm font-medium">Upgrade to Pro</p>
    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
      Unlimited applications and AI resume review.
    </p>
    <button className="mt-3 w-full text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 transition-colors">
      Upgrade now
    </button>
  </div> */}




  <div className="flex items-center gap-3 mt-5 px-1">
    {user?.picture ? (
      <img
        src={user.picture}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-semibold shrink-0">
        {user?.name
          ?.split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>
    )}

    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-neutral-900 truncate">
        {user?.name}
      </p>
      <p className="text-xs text-neutral-500 truncate">
        {user?.email}
      </p>
    </div>
  </div>


    <button onClick={logout} className="mt-3 w-full text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 transition-colors">
      Log Out
    </button>
 
</div>
    </aside>
  );
}