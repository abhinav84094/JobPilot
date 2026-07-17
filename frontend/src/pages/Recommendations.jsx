import { useState, useEffect, useRef } from "react";
import { useResume } from "../hooks/useResume";
import { MapPin, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import JobCard from "../components/JobCard.jsx"



const API_URL = import.meta.env.VITE_API_URL;

/* ---------------- Skeleton card (shown while loading) ---------------- */
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-neutral-200 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-neutral-100 shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-neutral-100 rounded w-2/5" />
          <div className="h-3 bg-neutral-100 rounded w-1/4" />
          <div className="h-3 bg-neutral-100 rounded w-1/3" />
        </div>
        <div className="w-11 h-11 rounded-full bg-neutral-100 shrink-0" />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
        <div className="h-3 bg-neutral-100 rounded w-20" />
        <div className="h-8 bg-neutral-100 rounded-lg w-24" />
      </div>
    </div>
  );
}

/* ---------------- Engaging loading state ---------------- */
const loadingMessages = [
  "Reading your resume...",
  "Pulling out your top skills...",
  "Matching you against live job postings...",
  "Scoring each role against your profile...",
  "Checking experience requirements...",
  "Almost there, ranking your best matches...",
];

function LoadingState({ role }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 rounded-xl border border-violet-100 bg-violet-50 px-5 py-4">
        <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center shrink-0 animate-pulse">
          <Sparkles size={16} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-violet-700 transition-opacity duration-300">
            {loadingMessages[msgIndex]}
          </p>
          {role && (
            <p className="text-xs text-violet-500 mt-0.5">
              Finding roles like "{role}" that fit your resume
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

/* ---------------- Main page ---------------- */
// Key used to match a recommended job against an existing application
const jobKeyOf = (job) => `${job.platform}:${job.jobKey}`;

export default function Recommendations() {
  const { resume, loading: resumeLoading } = useResume();
  const [activeRole, setActiveRole] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appliedKeys, setAppliedKeys] = useState(new Set());
  const hasFetched = useRef(false);

  // Load existing applications once so we can mark already-applied jobs
  // as "Applied" even after a refresh, instead of re-fetching per card.
  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch(`${API_URL}/api/jobs/applications`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setAppliedKeys(
            new Set(data.applications.map((a) => `${a.platform}:${a.jobId}`))
          );
        }
      } catch {
        // Non-fatal — cards will just default to "not applied" until clicked
      }
    }
    fetchApplications();
  }, []);

  const markApplied = (job) => {
    setAppliedKeys((prev) => new Set(prev).add(jobKeyOf(job)));
  };

  // Automatically drive the search from the resume — no manual query entry
  useEffect(() => {
    if (resume?.preferredRoles?.length > 0 && !hasFetched.current) {
      hasFetched.current = true;
      setActiveRole(resume.preferredRoles[0]);
    }
  }, [resume]);

  useEffect(() => {
    if (!activeRole) return;
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/jobs/recommendations`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setJobs(data.jobs);
        } else {
          setError("Couldn't load jobs right now.");
          setJobs([]);
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [activeRole]);

  return (
    <main className="flex-1 px-10 py-8 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-1">Recommendations</h1>
      <p className="text-sm text-neutral-500 mb-6">
        {loading
          ? "Finding jobs that match your resume..."
          : `${jobs.length} jobs matched to your resume`}
      </p>

      {/* Role chips — purely derived from the resume, not a free-text search */}
      {resume?.preferredRoles?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {resume.preferredRoles.map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              disabled={loading}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-50 ${
                activeRole === role
                  ? "bg-violet-600 text-white border-violet-600"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      )}

      {resumeLoading && (
        <p className="text-sm text-neutral-400 py-8 text-center">Loading your resume...</p>
      )}

      {!resumeLoading && !resume && (
        <p className="text-sm text-neutral-400 py-8 text-center">
          Upload your resume first to get job recommendations.
        </p>
      )}

      {loading && <LoadingState role={activeRole} />}

      {!loading && error && <p className="text-sm text-red-500 py-8 text-center">{error}</p>}

      {!loading && !error && resume && jobs.length === 0 && (
        <p className="text-sm text-neutral-400 py-8 text-center">No jobs found for this role right now.</p>
      )}

      {!loading && (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <JobCard
              key={jobKeyOf(job)}
              job={job}
              resumeId={resume?._id}
              applied={appliedKeys.has(jobKeyOf(job))}
              onApplied={markApplied}
            />
          ))}
        </div>
      )}
    </main>
  );
}