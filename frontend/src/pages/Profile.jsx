import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User, Mail, Calendar, FileText, Bell, LogOut, Loader2,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const API_BASE = import.meta.env.VITE_API_URL ;

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-neutral-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
          <Icon size={16} />
        </div>
        <h2 className="font-medium">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function Profile() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifyEmail, setNotifyEmail] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const meRes = await fetch(`${API_BASE}/api/auth/me`, { credentials: "include" });
        if (!meRes.ok) throw new Error("Not authenticated");
        const meData = await meRes.json();
        setUser(meData?.user ??null);
        if (typeof meData?.notifyEmail === "boolean") {
          setNotifyEmail(meData.notifyEmail);
        }

        try {
          const resumeRes = await fetch(`${API_BASE}/api/user/resume`, { credentials: "include" });
          if (resumeRes.ok) {
            const resumeData = await resumeRes.json();
            setResume(resumeData?.resume ?? null);
          }
        } catch {
          setResume(null);
        }
      } catch (err) {
        setError(err.message || "Could not load your profile");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleLogout() {
    await logout();
  }

  // Delete-account flow is hidden until the backend exposes
  // DELETE /api/user/account. Re-add handleDeleteAccount + the
  // button in "Account actions" once that endpoint ships.

  if (loading) {
    return (
      <main className="flex-1 px-10 py-8 max-w-3xl flex items-center gap-2 text-neutral-400 text-sm">
        <Loader2 size={16} className="animate-spin" />
        Loading your profile...
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 px-10 py-8 max-w-3xl">
        <div className="rounded-xl border border-red-100 bg-red-50 text-red-700 text-sm px-4 py-3">
          {error}. Try signing in again.
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-10 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-tight">Profile</h1>
        <p className="text-sm text-neutral-400 mt-1">Manage your account and resume.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Account info */}
        <SectionCard icon={User} title="Account">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center text-lg font-medium overflow-hidden shrink-0">
              {user?.picture ? (
                <img src={user.picture} alt={user?.name || "User"} className="w-full h-full object-cover" />
              ) : (
                (user?.name?.[0] || "U").toUpperCase()
              )}
            </div>
            <div>
              <p className="font-medium">{user?.name || "—"}</p>
              <p className="text-sm text-neutral-500 flex items-center gap-1.5 mt-0.5">
                <Mail size={13} /> {user?.email || "—"}
              </p>
              {user?.createdAt && (
                <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-1">
                  <Calendar size={12} />
                  Member since {new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </p>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Resume summary */}
        <SectionCard icon={FileText} title="Resume">
          {resume ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{resume.fileName}</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Uploaded {new Date(resume.uploadedAt).toLocaleDateString()} · ATS score {resume.atsScore}/100
                </p>
              </div>
              <Link
                to="/resume"
                className="text-sm font-medium text-violet-600 border border-violet-200 rounded-lg px-4 py-2 hover:bg-violet-50 transition-colors"
              >
                View / replace
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">No resume uploaded yet.</p>
              <Link
                to="/resume"
                className="text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 transition-colors"
              >
                Upload resume
              </Link>
            </div>
          )}
        </SectionCard>

        {/* Notifications */}
        <SectionCard icon={Bell} title="Notifications">
          <label className="flex items-center justify-between opacity-60 cursor-not-allowed">
            <div>
              <p className="text-sm font-medium flex items-center gap-2">
                Email alerts for new matches
                <span className="text-[10px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">Get notified when a high-fit job is found.</p>
            </div>
            <input
              type="checkbox"
              checked={notifyEmail}
              disabled
              className="w-4 h-4 accent-violet-600 cursor-not-allowed"
            />
          </label>
        </SectionCard>

        {/* Danger zone */}
        <SectionCard icon={LogOut} title="Account actions">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-sm font-medium border border-neutral-200 rounded-lg px-4 py-2 hover:bg-neutral-50 transition-colors flex items-center gap-2"
            >
              <LogOut size={14} /> Log out
            </button>
            {/* <button
              onClick={handleDeleteAccount}
              className="text-sm font-medium border border-red-200 text-red-600 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} /> Delete account
            </button> */}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}