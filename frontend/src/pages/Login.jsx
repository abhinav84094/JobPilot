import { Sparkles, ArrowRight, ShieldCheck, Lock, BadgeCheck, FileText, Target, TrendingUp, Send } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const features = [
  { icon: FileText, tint: "bg-violet-50 text-violet-600", title: "AI resume analysis", desc: "Get in-depth insights from your resume" },
  { icon: Target, tint: "bg-emerald-50 text-emerald-600", title: "Personalized job recommendations", desc: "Jobs that match your profile perfectly" },
  { icon: TrendingUp, tint: "bg-amber-50 text-amber-600", title: "ATS score and skill gap analysis", desc: "Improve your ATS score and fill skill gaps" },
  { icon: Send, tint: "bg-blue-50 text-blue-600", title: "Smart auto apply (coming soon)", desc: "Apply to jobs automatically with AI" },
];

const trustBadges = [
  { icon: ShieldCheck, title: "Secure Google sign-in", desc: "Your data is protected" },
  { icon: Lock, title: "Your data stays private", desc: "We never share your data" },
  { icon: BadgeCheck, title: "No password required", desc: "One-click secure access" },
];


const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {

    const {  user, loading } = useAuth();

    if (!loading && user) {
        return <Navigate to="/dashboard" replace />;
    }


  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="flex-1 bg-gradient-to-br from-violet-50 via-violet-50 to-indigo-50 px-16 py-14 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-lg relative z-10">
          <p className="text-lg font-semibold text-violet-600 flex items-center gap-2">
            Hello Buddy <span>👋</span>
          </p>
          <h1 className="text-4xl font-bold leading-tight mt-2 text-neutral-900">
            Your resume is<br />working for you.
          </h1>
          <p className="text-neutral-500 mt-4 leading-relaxed">
            Our AI analyzes your resume and recommends opportunities that match your skills, experience, and career goals.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${f.tint}`}>
                  <f.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{f.title}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-xl px-6 py-3.5 transition-colors">
            <Sparkles size={16} />
            Discover matching jobs with Google Login
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Floating illustration cards with a soft decorative gradient backdrop */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-80 h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-200/60 via-indigo-100/50 to-transparent blur-2xl" />
          <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-violet-300/40 to-indigo-200/30 blur-xl" />

          <div className="absolute top-4 right-0 w-40 bg-white rounded-xl border border-neutral-100 shadow-sm p-3">
            <p className="text-[11px] text-neutral-500">Resume score</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">92%</p>
            <p className="text-[11px] text-emerald-600 font-medium">Excellent</p>
          </div>

          <div className="absolute top-32 right-0 w-36 bg-white rounded-xl border border-neutral-100 shadow-sm p-3">
            <p className="text-[11px] font-medium text-neutral-700 mb-2">Top skills</p>
            {["JavaScript", "Node.js", "React", "MongoDB"].map((s) => (
              <div key={s} className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-neutral-500">{s}</span>
                <span className="w-10 h-1 rounded-full bg-emerald-100 relative overflow-hidden">
                  <span className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full" style={{ width: "80%" }} />
                </span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-16 left-0 w-44 bg-white rounded-xl border border-neutral-100 shadow-sm p-3">
            <p className="text-[11px] font-medium text-neutral-700 mb-2">Top companies hiring</p>
            <div className="flex items-center gap-1">
              <span className="text-lg">🔵</span>
              <span className="text-lg">🟪</span>
              <span className="text-lg">🟧</span>
              <span className="text-[10px] text-violet-600 font-medium ml-1">+12K more</span>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="relative z-10 mt-14 max-w-2xl bg-white/70 rounded-2xl border border-white p-5 grid grid-cols-3 gap-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-start gap-2.5">
              <b.icon size={18} className="text-violet-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-neutral-900 leading-tight">{b.title}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-[460px] shrink-0 flex flex-col items-center justify-center px-12 border-l border-neutral-100">
        <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mb-4">
          <Sparkles className="text-white" size={26} />
        </div>
        <p className="text-2xl font-bold text-neutral-900">
          Match<span className="text-violet-600">ora</span>
        </p>
        <p className="text-sm text-neutral-500 mt-2">
          Find <span className="text-violet-600 font-medium">smarter</span>. Apply <span className="text-violet-600 font-medium">faster</span>.
        </p>

        <div className="mt-10 text-center">
          <h2 className="text-xl font-bold text-neutral-900">Welcome Buddy</h2>
          <p className="text-sm text-neutral-500 mt-1" >Continue with your Google account</p>
        </div>

        <GoogleLogin
            onSuccess={async (credentialResponse) => {

                const res = await fetch(
                    `${API_URL}/api/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            token: credentialResponse.credential,
                        }),
                    }
                );

                if (res.ok) {
                    window.location.href = "/dashboard";
                }

            }}
            onError={() => {
                console.log("Google Login Failed");
            }}
          />

        <div className="flex items-center gap-3 w-full mt-8">
          <div className="flex-1 h-px bg-neutral-100" />
          <span className="text-xs text-neutral-400">or</span>
          <div className="flex-1 h-px bg-neutral-100" />
        </div>

        <p className="text-xs text-neutral-400 text-center mt-8 leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-violet-600 font-medium">Terms of Service</a> and{" "}
          <a href="/privacy" className="text-violet-600 font-medium">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
