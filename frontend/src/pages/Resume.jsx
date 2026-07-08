import { useState } from "react";
import { useResume } from "../hooks/useResume";
import {
  FileText, CheckCircle2, AlertTriangle, Lightbulb, Briefcase,
  GraduationCap, FolderGit2, Upload,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function ScoreRing({ score, size = 72 }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 85 ? "#059669" : score >= 65 ? "#d97706" : "#dc2626";
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f0ee" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-lg font-semibold">{score}</span>
    </div>
  );
}

function UploadZone({ onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(file) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const res = await fetch(`${API_URL}/api/user/upload-resume`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onUploaded(data.resume);
      } else {
        setError(data.message || "Upload failed. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="border-2 border-dashed border-neutral-200 rounded-2xl p-10 text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
      }}
    >
      <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-4">
        <Upload size={20} />
      </div>
      <p className="text-sm font-medium">
        {uploading ? "Analyzing your resume..." : "Drag and drop your resume here"}
      </p>
      <p className="text-xs text-neutral-400 mt-1">PDF or DOCX, up to 5MB</p>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      <label className="inline-block mt-4 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-5 py-2.5 cursor-pointer transition-colors">
        Browse files
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          disabled={uploading}
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
        />
      </label>
    </div>
  );
}

export default function Resume() {
  const { resume, loading, setResume } = useResume();

  if (loading) {
    return <main className="flex-1 px-10 py-8 text-sm text-neutral-400">Loading...</main>;
  }

  if (!resume) {
    return (
      <main className="flex-1 px-10 py-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">Resume</h1>
        <p className="text-sm text-neutral-500 mb-8">Upload your resume to get an ATS score and personalized recommendations.</p>
        <UploadZone onUploaded={setResume} />
      </main>
    );
  }

  const scoreLabel = resume.atsScore >= 85 ? "Excellent" : resume.atsScore >= 65 ? "Good" : "Needs work";
  const scoreColor = resume.atsScore >= 85 ? "text-emerald-600" : resume.atsScore >= 65 ? "text-amber-600" : "text-red-600";

  return (
    <main className="flex-1 px-10 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Resume</h1>
          <p className="text-sm text-neutral-500 mt-1">{resume.fileName}</p>
        </div>
      </div>

      {/* Score card */}
      <div className="rounded-xl border border-neutral-100 p-6 flex items-center gap-6 mb-6">
        <ScoreRing score={resume.atsScore} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${scoreColor}`}>{scoreLabel}</p>
          <p className="text-xs text-neutral-500 mt-1">ATS compatibility score</p>
        </div>
        <label className="text-xs font-medium border border-neutral-200 hover:border-neutral-300 rounded-lg px-4 py-2 cursor-pointer transition-colors">
          Re-upload
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("resume", file);
              const res = await fetch(`${API_URL}/api/user/upload-resume`, {
                method: "POST",
                credentials: "include",
                body: formData,
              });
              const data = await res.json();
              if (data.success) setResume(data.resume);
            }}
          />
        </label>
      </div>

      {/* Skills / missing skills */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-neutral-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <p className="text-sm font-medium">Skills found ({resume.skills.length})</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">{s}</span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-neutral-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <p className="text-sm font-medium">Suggested to add ({resume.missingSkills.length})</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.missingSkills.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-700">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths */}
      {resume.strengths?.length > 0 && (
        <div className="rounded-xl border border-neutral-100 p-5 mb-6">
          <p className="text-sm font-medium mb-3">Strengths</p>
          <ul className="flex flex-col gap-2">
            {resume.strengths.map((s, i) => (
              <li key={i} className="text-xs text-neutral-600 flex gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {resume.suggestions?.length > 0 && (
        <div className="rounded-xl border border-neutral-100 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-violet-600" />
            <p className="text-sm font-medium">Suggestions to improve</p>
          </div>
          <ul className="flex flex-col gap-2">
            {resume.suggestions.map((s, i) => (
              <li key={i} className="text-xs text-neutral-600 leading-relaxed">
                {s.replace(/\*\*/g, "")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <div className="rounded-xl border border-neutral-100 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase size={16} className="text-neutral-700" />
            <p className="text-sm font-medium">Experience</p>
          </div>
          {resume.experience.map((exp) => (
            <div key={exp._id} className="mb-4 last:mb-0">
              <p className="text-sm font-medium">{exp.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{exp.company} · {exp.location}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{exp.startDate} – {exp.endDate}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {exp.description.map((d, i) => (
                  <li key={i} className="text-xs text-neutral-600">• {d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="rounded-xl border border-neutral-100 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FolderGit2 size={16} className="text-neutral-700" />
            <p className="text-sm font-medium">Projects</p>
          </div>
          {resume.projects.map((p) => (
            <div key={p._id} className="mb-4 last:mb-0">
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{p.technologies?.join(", ")}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {p.description.map((d, i) => (
                  <li key={i} className="text-xs text-neutral-600">• {d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="rounded-xl border border-neutral-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-neutral-700" />
            <p className="text-sm font-medium">Education</p>
          </div>
          {resume.education.map((ed) => (
            <div key={ed._id}>
              <p className="text-sm font-medium">{ed.degree}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{ed.institution} · {ed.location}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{ed.startDate} – {ed.endDate}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}