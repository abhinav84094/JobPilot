import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, Menu, Briefcase, ShieldCheck, Flame, ChevronRight,
  ChevronDown, MapPin, ArrowRight, Sparkles,
} from "lucide-react";
import { jobs } from "../data/jobs.js";

const stats = [
  { label: "Matching jobs", value: "124", delta: "+18 today", icon: Briefcase, tint: "bg-violet-50 text-violet-600" },
  { label: "Eligible jobs", value: "48", delta: "+10 today", icon: ShieldCheck, tint: "bg-emerald-50 text-emerald-600" },
  { label: "High match (90%+)", value: "19", delta: null, icon: Flame, tint: "bg-orange-50 text-orange-600" },
];

function ScoreRing({ score, size = 44 }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 90 ? "#059669" : score >= 80 ? "#4f46e5" : "#d97706";
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f0ee" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-medium">{score}</span>
    </div>
  );
}

function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors p-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white font-medium text-sm"
          style={{ background: job.logoBg }}>
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {job.top && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">
                Top match
              </span>
            )}
            <h3 className="font-medium">{job.role}</h3>
          </div>
          <p className="text-sm text-neutral-500 mt-0.5">{job.company}</p>
          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
            <MapPin size={12} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {job.tags.map((t) => (
              <span key={t} className="text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-full px-2.5 py-1">
                {t}
              </span>
            ))}
            <span className="text-xs font-medium">{job.pay}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <ScoreRing score={job.score} />
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            job.eligible ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}>
            {job.eligible ? "Eligible" : "Not eligible"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700">
          Skills match
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <button className="text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 transition-colors">
          View job
        </button>
      </div>

      {open && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {job.matched.map((s) => <span key={s} className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700">{s}</span>)}
          {job.missing.map((s) => <span key={s} className="px-2 py-1 rounded-md bg-red-50 text-red-600">{s}</span>)}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <main className="flex-1 px-10 py-8 max-w-4xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm text-neutral-400 mb-1">Good evening, Rahul</p>
            <h1 className="text-2xl font-semibold leading-tight">
              Your next dream job<br />is closer than you think.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center relative">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center">
              <Menu size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-neutral-100 p-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.tint}`}>
                <s.icon size={16} />
              </div>
              <p className="text-xl font-semibold">{s.value}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{s.label}</p>
              {s.delta && <p className="text-[11px] text-emerald-600 mt-1">{s.delta}</p>}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-medium">Top recommendations</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Personalized for your skills and experience</p>
          </div>
          <Link to="/recommendations" className="flex items-center gap-1 text-sm text-violet-600 font-medium">
            View all <ChevronRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>

        <Link to="/recommendations" className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-violet-600 border border-dashed border-violet-200 rounded-xl py-3 hover:bg-violet-50 transition-colors">
          <Sparkles size={15} />
          View all recommendations
          <ArrowRight size={14} />
        </Link>
      </main>

      <aside className="w-80 shrink-0 border-l border-neutral-100 px-6 py-8 flex flex-col gap-6">
        <div className="rounded-xl border border-neutral-100 p-5">
          <p className="text-sm font-medium mb-4">Resume strength</p>
          <div className="flex items-center gap-4">
            <ScoreRing score={87} size={56} />
            <div>
              <p className="text-sm font-medium text-emerald-600">Excellent</p>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Your resume is well optimized.</p>
            </div>
          </div>
          <Link to="/resume" className="mt-4 block text-center text-xs font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 transition-colors">
            Improve resume
          </Link>
        </div>
      </aside>
    </>
  );
}