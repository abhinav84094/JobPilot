import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Briefcase,
  ShieldCheck,
  Flame,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function ScoreRing({ score = 0, size = 44 }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  const color =
    score >= 85
      ? "#059669"
      : score >= 70
      ? "#d97706"
      : "#dc2626";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f1f0ee"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute text-xs font-semibold">
        {score}
      </span>
    </div>
  );
}


function JobCardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-lg bg-neutral-200" />

        <div className="flex-1">
          <div className="h-4 w-52 bg-neutral-200 rounded mb-2" />
          <div className="h-3 w-36 bg-neutral-200 rounded mb-2" />
          <div className="h-3 w-28 bg-neutral-200 rounded" />
        </div>

        <div className="w-12 h-12 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}



export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resumeScore, setResumeScore] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        /*
        ==========================
        USER
        ==========================
        */

        const meRes = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: "include",
        });

        if (!meRes.ok) {
          throw new Error("Please login again.");
        }

        const meData = await meRes.json();


        // backend response:
        // { success:true, user:{...} }

        setUser(meData.user);


        const applicationsRes = await fetch(
          `${API_BASE}/api/jobs/applications`,
          {
            credentials: "include",
          }
        );

        if (!applicationsRes.ok) {
          throw new Error("Unable to load applications.");
        }

        const applicationsData = await applicationsRes.json();

        setApplications(applicationsData.applications || []);

        const appliedKeys = new Set(
          (applicationsData.applications || []).map(
            (a) => `${a.platform}:${a.jobId}`
          )
        );

        /*
        ==========================
        RECOMMENDED JOBS
        ==========================
        */

        const jobsRes = await fetch(
          `${API_BASE}/api/jobs/recommendations`,
          {
            credentials: "include",
          }
        );

        if (!jobsRes.ok) {
          throw new Error("Unable to load recommendations.");
        }

        const jobsData = await jobsRes.json();

        // backend response:
        // {
        //   success:true,
        //   total:8,
        //   jobs:[]
        // }

        const filteredJobs = (jobsData.jobs || []).filter(
          (job) => !appliedKeys.has(`${job.platform}:${job.jobKey}`)
        );

        setJobs(filteredJobs);

        /*
        ==========================
        RESUME
        ==========================
        */

        try {
          const resumeRes = await fetch(
            `${API_BASE}/api/user/resume`,
            {
              credentials: "include",
            }
          );

          if (resumeRes.ok) {
            const resumeData = await resumeRes.json();

            setResumeScore(
              resumeData?.resume?.atsScore ?? null
            );
          }
        } catch (err) {
          console.log(err);
          setResumeScore(null);
        }
      } catch (err) {
        console.error(err);

        setError(
          err.message || "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /*
  ==========================
  Dashboard Stats
  ==========================
  */

  const appliedCount = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const highMatchCount = jobs.filter(
    (job) => (job.fitScore || 0) >= 90
  ).length;


    const statCards = [
      {
        label: "Matching Jobs",
        value: jobs.length,
        icon: Briefcase,
        tint: "bg-violet-50 text-violet-600",
      },
      {
        label: "Applied Jobs",
        value: appliedCount,
        icon: ShieldCheck,
        tint: "bg-emerald-50 text-emerald-600",
      },
      {
        label: "High Match (90%+)",
        value: highMatchCount,
        icon: Flame,
        tint: "bg-orange-50 text-orange-600",
      },
    ];
  
  return (
  <>
    <main className="flex-1 px-10 py-8 max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-neutral-400 mb-1">
            {user
              ? `Welcome back, ${user.name.split(" ")[0]}`
              : "Welcome back"}
          </p>

          <h1 className="text-2xl font-semibold leading-tight">
            Your next dream job
            <br />
            is closer than you think.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            title="Notifications coming soon"
            disabled
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-300 cursor-not-allowed"
          >
            <Bell size={16} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-10">
        {statCards.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-neutral-100 p-4"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${item.tint}`}
            >
              <item.icon size={16} />
            </div>

            <p className="text-2xl font-semibold">
              {loading ? "--" : item.value}
            </p>

            <p className="text-xs text-neutral-500 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-semibold">
            Top Recommendations
          </h2>

          <p className="text-xs text-neutral-400">
            Personalized based on your resume
          </p>
        </div>

        <Link
          to="/recommendations"
          className="flex items-center gap-1 text-violet-600 text-sm font-medium"
        >
          View All

          <ChevronRight size={15} />
        </Link>
      </div>

      <div className="space-y-4">
        {loading && (
          <>
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </>
        )}


        {!loading && jobs.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-200 py-14 text-center">
            <p className="font-semibold">
              No job recommendations found.
            </p>

            <p className="text-sm text-neutral-500 mt-2">
              Upload your resume or update your profile to
              receive personalized job recommendations.
            </p>

            <Link
              to="/resume"
              className="inline-block mt-5 bg-violet-600 text-white rounded-lg px-5 py-2"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </div>

      {!loading && jobs.length > 0 && (
        <Link
          to="/recommendations"
          className="mt-6 flex justify-center items-center gap-2 border border-dashed border-violet-300 rounded-xl py-3 text-violet-600 hover:bg-violet-50 transition"
        >
          <Sparkles size={15} />

          View All Recommendations

          <ArrowRight size={15} />
        </Link>
      )}
    </main>

    <aside className="w-80 border-l border-neutral-100 px-6 py-8">
      <div className="rounded-xl border border-neutral-100 p-5">
        <p className="font-semibold mb-5">
          Resume Strength
        </p>

        {resumeScore == null ? (
          <>
            <p className="text-sm text-neutral-500">
              No resume uploaded yet.
            </p>

            <Link
              to="/resume"
              className="block mt-5 text-center bg-violet-600 text-white rounded-lg py-2"
            >
              Upload Resume
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <ScoreRing
                score={resumeScore}
                size={60}
              />

              <div>
                <p
                  className={`font-semibold ${
                    resumeScore >= 85
                      ? "text-emerald-600"
                      : resumeScore >= 70
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {resumeScore >= 85
                    ? "Excellent"
                    : resumeScore >= 70
                    ? "Good"
                    : "Needs Improvement"}
                </p>

                <p className="text-xs text-neutral-400 mt-1">
                  ATS Resume Score
                </p>
              </div>
            </div>

            <Link
              to="/resume"
              className="block mt-6 text-center bg-violet-600 text-white rounded-lg py-2"
            >
              Improve Resume
            </Link>
          </>
        )}
      </div>

      <div className="rounded-xl border border-neutral-100 p-5 mt-5">
        <p className="font-semibold mb-4">Your Applications</p>

        {applications.length === 0 ? (
          <>
            <p className="text-sm text-neutral-500">
              You haven't applied to any jobs yet.
            </p>

            <Link
              to="/recommendations"
              className="block mt-4 text-center border border-violet-200 text-violet-600 rounded-lg py-2 text-sm font-medium hover:bg-violet-50 transition"
            >
              Browse Recommendations
            </Link>
          </>
        ) : (
          <>
            <p className="text-3xl font-semibold">
              {applications.length}
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {applications.length === 1 ? "application" : "applications"} tracked
            </p>

            <Link
              to="/applications"
              className="flex items-center justify-center gap-1 mt-5 text-center border border-neutral-200 rounded-lg py-2 text-sm font-medium hover:border-neutral-300 transition"
            >
              View Applications
              <ChevronRight size={14} />
            </Link>
          </>
        )}
      </div>
    </aside>
  </>
);
}