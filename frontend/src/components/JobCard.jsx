import ScoreRing from "./ScoreRing";
import { useState } from "react";
import { MapPin, ChevronDown, ExternalLink } from "lucide-react";


/* ---------------- Company avatar color ---------------- */
const palette = ["#171717", "#7c3aed", "#0ea5e9", "#f97316", "#e11d48", "#059669", "#4f46e5", "#d97706"];
function companyColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}


/* ---------------- Job card ---------------- */

export default function JobCard({
    job,
    onApplicationCreated,
}){

  
  const [open, setOpen] = useState(false);
  const eligible = job.eligibility?.experience?.eligible;
  const requiredYears = job.eligibility?.experience?.requiredYears ?? 0;

  const handleApply = () => {
    window.open(job.jobUrl, "_blank");

    onApplicationCreated?.({
        job,
    });
};

  return (
    <div className="card card-hover p-4 sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white font-medium text-sm"
          style={{ background: companyColor(job.company) }}
        >
          {job.company?.[0]?.toUpperCase() || "?"}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium">{job.title}</h3>
          <p className="text-sm text-neutral-500 mt-0.5">{job.company}</p>
          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
            <MapPin size={12} />
            <span className="truncate">{job.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <ScoreRing score={job.skillScore} />
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
            eligible ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}>
            {eligible ? "Eligible" : `Needs ${requiredYears}+ yrs`}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-neutral-100">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 focus-ring rounded whitespace-nowrap">
          Skills match ({job.matchedSkills?.length || 0}/{job.requiredSkills?.length || 0})
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <button
          onClick={handleApply}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 transition-colors focus-ring whitespace-nowrap"
        >
          Apply job <ExternalLink size={13} />
        </button>
      </div>

      {open && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {job.matchedSkills?.map((s) => <span key={s} className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700">{s}</span>)}
          {job.missingSkills?.map((s) => <span key={s} className="px-2 py-1 rounded-md bg-red-50 text-red-600">{s}</span>)}
        </div>
      )}
    </div>
  );
}