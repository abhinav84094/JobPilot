import ScoreRing from "./ScoreRing";
import { useState } from "react";
import {
  MapPin,
  ExternalLink,
  Sparkles,
  X,
  Check,
  AlertCircle,
} from "lucide-react";

/* ---------------- Company avatar color ---------------- */
const palette = [
  "#171717",
  "#7c3aed",
  "#0ea5e9",
  "#f97316",
  "#e11d48",
  "#059669",
  "#4f46e5",
  "#d97706",
];

function companyColor(name = "") {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return palette[Math.abs(hash) % palette.length];
}

/* ---------------- Job card ---------------- */

export default function JobCard({
  job,
  onApplicationCreated,
}) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const eligible = job.eligibility?.experience?.eligible;
  const requiredYears =
    job.eligibility?.experience?.requiredYears ?? 0;

  const userYears =
    job.eligibility?.experience?.userYears ??
    job.eligibility?.experience?.candidateYears ??
    0;

  const matchedSkills = job.matchedSkills || [];
  const missingSkills = job.missingSkills || [];
  const requiredSkills = job.requiredSkills || [];

  const matchScore = Math.round(job.skillScore || 0);

  const handleApply = () => {
    window.open(job.jobUrl, "_blank");

    onApplicationCreated?.({
      job,
    });
  };

  return (
    <>
      {/* ================= JOB CARD ================= */}

      <div
        className="rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors p-5 cursor-pointer"
        onClick={() => setShowAnalysis(true)}
      >
        <div className="flex items-start gap-4">
          {/* Company Avatar */}
          <div
            className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white font-medium text-sm"
            style={{
              background: companyColor(job.company),
            }}
          >
            {job.company?.[0]?.toUpperCase() || "?"}
          </div>

          {/* Job Information */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium">
              {job.title}
            </h3>

            <p className="text-sm text-neutral-500 mt-0.5">
              {job.company}
            </p>

            <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
              <MapPin size={12} />
              <span>{job.location}</span>
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <ScoreRing score={job.skillScore} />

            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                eligible
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {eligible
                ? "Eligible"
                : `Needs ${requiredYears}+ yrs`}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowAnalysis(true)}
            className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700 font-medium"
          >
            <Sparkles size={14} />

            Match Analysis
          </button>

          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 transition-colors"
          >
            Apply On Linkedin

            <ExternalLink size={13} />
          </button>
        </div>
      </div>

      {/* ================= MATCH ANALYSIS MODAL ================= */}

      {showAnalysis && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowAnalysis(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={18}
                    className="text-violet-600"
                  />

                  <h2 className="text-lg font-semibold text-neutral-900">
                    Matchora Match Analysis
                  </h2>
                </div>

                <p className="text-sm text-neutral-500 mt-1">
                  Here's why this job matches your profile.
                </p>
              </div>

              <button
                onClick={() => setShowAnalysis(false)}
                className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Match Score */}
            <div className="px-6 pt-6">
              <div className="rounded-xl bg-violet-50 border border-violet-100 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-violet-700 font-medium">
                      Overall Match
                    </p>

                    <h3 className="text-4xl font-bold text-violet-700 mt-1">
                      {matchScore}%
                    </h3>

                    <p className="text-sm text-violet-600 mt-1">
                      {matchScore >= 80
                        ? "Excellent match for your profile"
                        : matchScore >= 60
                        ? "Good match for your profile"
                        : "Partial match for your profile"}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <ScoreRing score={matchScore} />
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Job Matches */}
            <div className="px-6 pt-6">
              <h3 className="text-base font-semibold text-neutral-900">
                Why this job matches
              </h3>

              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check
                      size={13}
                      className="text-emerald-600"
                    />
                  </div>

                  <p className="text-sm text-neutral-700">
                    <span className="font-medium">
                      {matchedSkills.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {requiredSkills.length}
                    </span>{" "}
                    required skills match
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      eligible
                        ? "bg-emerald-100"
                        : "bg-red-100"
                    }`}
                  >
                    {eligible ? (
                      <Check
                        size={13}
                        className="text-emerald-600"
                      />
                    ) : (
                      <AlertCircle
                        size={13}
                        className="text-red-600"
                      />
                    )}
                  </div>

                  <p className="text-sm text-neutral-700">
                    {eligible
                      ? "Experience requirement satisfied"
                      : "Experience requirement not satisfied"}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check
                      size={13}
                      className="text-emerald-600"
                    />
                  </div>

                  <p className="text-sm text-neutral-700">
                    Relevant role for your profile
                  </p>
                </div>
              </div>
            </div>

            {/* Matched Skills */}
            <div className="px-6 pt-6">
              <h3 className="text-base font-semibold text-neutral-900">
                Matched Skills
              </h3>

              {matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100"
                    >
                      <Check size={12} />

                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400 mt-3">
                  No matching skills found.
                </p>
              )}
            </div>

            {/* Missing Skills */}
            <div className="px-6 pt-6">
              <h3 className="text-base font-semibold text-neutral-900">
                Missing Skills
              </h3>

              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-600 mt-3 font-medium">
                  Great! No missing required skills.
                </p>
              )}
            </div>

            {/* Experience */}
            <div className="px-6 pt-6">
              <h3 className="text-base font-semibold text-neutral-900">
                Experience
              </h3>

              <div className="mt-3 rounded-xl bg-neutral-50 border border-neutral-100 p-4">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-neutral-500">
                    Required
                  </span>

                  <span className="text-sm font-medium text-neutral-900">
                    {requiredYears === 0
                      ? "0 years"
                      : `${requiredYears}+ years`}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 mt-2">
                  <span className="text-sm text-neutral-500">
                    Your profile
                  </span>

                  <span className="text-sm font-medium text-neutral-900">
                    {userYears}{" "}
                    {userYears === 1 ? "year" : "years"}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        eligible
                          ? "bg-emerald-100"
                          : "bg-red-100"
                      }`}
                    >
                      {eligible ? (
                        <Check
                          size={13}
                          className="text-emerald-600"
                        />
                      ) : (
                        <X
                          size={13}
                          className="text-red-600"
                        />
                      )}
                    </div>

                    <span
                      className={`text-sm font-medium ${
                        eligible
                          ? "text-emerald-700"
                          : "text-red-600"
                      }`}
                    >
                      {eligible
                        ? "Eligible"
                        : "Experience requirement not met"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="px-6 py-6">
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-5 py-3 transition-colors"
              >
                Apply Now

                <ExternalLink size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}