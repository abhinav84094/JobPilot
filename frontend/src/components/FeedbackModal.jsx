import { useState } from "react";
import { Star, X } from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ISSUE_OPTIONS = [
  "No issues",
  "Resume upload",
  "Resume analysis",
  "Job recommendations",
  "Dashboard/UI",
  "Performance",
  "Other",
];

const PLATFORM_OPTIONS = [
  "LinkedIn",
  "Naukri",
  "Foundit",
  "Indeed",
  "Internshala",
  "Unstop",
  "Other",
];

const initialData = {
  rating: 0,
  likedMost: "",
  improvements: "",
  issues: [],
  solvesRealProblem: "",
  missingFeature: "",
  weeklyUseReason: "",
  recommendationImprovement: "",
  useAgain: "",
  npsScore: null,
  mostUsedPlatform: "",
  wouldPayPremium: "",
  additionalFeedback: "",
};

// Each step: { key, required }. key is used to read/validate `data[key]`.
const STEPS = [
  { key: "rating", required: true },
  { key: "likedMost", required: false },
  { key: "improvements", required: false },
  { key: "issues", required: true },
  { key: "solvesRealProblem", required: true },
  { key: "missingFeature", required: false },
  { key: "weeklyUseReason", required: false },
  { key: "recommendationImprovement", required: false },
  { key: "useAgain", required: true },
  { key: "npsScore", required: true },
  { key: "mostUsedPlatform", required: true },
  { key: "wouldPayPremium", required: true },
  { key: "additionalFeedback", required: true },
];

function isStepValid(step, data) {
  if (!step.required) return true;

  const value = data[step.key];

  if (step.key === "issues") return value.length > 0;
  if (step.key === "npsScore") return value !== null;
  if (step.key === "rating") return value > 0;

  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

export default function FeedbackModal({ onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const canAdvance = isStepValid(step, data);

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  const toggleIssue = (option) => {
    setData((prev) => {
      if (option === "No issues") {
        // "No issues" is exclusive of every other option
        return { ...prev, issues: prev.issues.includes("No issues") ? [] : ["No issues"] };
      }

      const withoutNoIssues = prev.issues.filter((i) => i !== "No issues");
      const alreadySelected = withoutNoIssues.includes(option);

      return {
        ...prev,
        issues: alreadySelected
          ? withoutNoIssues.filter((i) => i !== option)
          : [...withoutNoIssues, option],
      };
    });
  };

  const goNext = () => {
    if (!canAdvance) return;
    if (isLastStep) {
      handleSubmit();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((i) => i - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-[460px] max-w-full max-h-[90vh] flex flex-col shadow-xl">
        {submitted ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Thank you! 🙌</h2>
            <p className="text-neutral-500 text-sm mt-2">
              Your feedback has been submitted. It genuinely helps us build a
              better Matchora.
            </p>

            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="bg-violet-600 text-white rounded-lg px-4 py-2 hover:bg-violet-700"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 pt-5 pb-4 border-b border-neutral-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Help Us Improve Matchora</h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    We're building Matchora to make job searching smarter. Your
                    feedback helps us improve.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 shrink-0 ml-3"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                  <span>Question {stepIndex + 1} of {STEPS.length}</span>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-600 rounded-full transition-all"
                    style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-6 overflow-y-auto flex-1">
              <StepContent step={step} data={data} update={update} toggleIssue={toggleIssue} />

              {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
            </div>

            <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={stepIndex === 0}
                className="text-sm font-medium text-neutral-500 hover:text-neutral-700 disabled:opacity-0 disabled:pointer-events-none"
              >
                Back
              </button>

              <button
                onClick={goNext}
                disabled={!canAdvance || submitting}
                className="bg-violet-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- Per-step question UI ---------------- */

function StepContent({ step, data, update, toggleIssue }) {
  switch (step.key) {
    case "rating":
      return (
        <Question title="How would you rate your overall experience with Matchora?">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => update("rating", n)}
                className="p-1"
              >
                <Star
                  size={32}
                  className={n <= data.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
                />
              </button>
            ))}
          </div>
        </Question>
      );

    case "likedMost":
      return (
        <Question title="What did you like the most?" hint="Tell us what you enjoyed about Matchora." optional>
          <TextArea value={data.likedMost} onChange={(v) => update("likedMost", v)} />
        </Question>
      );

    case "improvements":
      return (
        <Question title="What can we improve?" hint="We'd love to hear your suggestions." optional>
          <TextArea value={data.improvements} onChange={(v) => update("improvements", v)} />
        </Question>
      );

    case "issues":
      return (
        <Question title="Did you face any issues?">
          <div className="flex flex-col gap-2">
            {ISSUE_OPTIONS.map((option) => (
              <Checkbox
                key={option}
                label={option}
                checked={data.issues.includes(option)}
                onChange={() => toggleIssue(option)}
              />
            ))}
          </div>
        </Question>
      );

    case "solvesRealProblem":
      return (
        <Question title="Does Matchora solve a real problem for you?">
          <RadioGroup
            options={["Yes", "Partially", "No"]}
            value={data.solvesRealProblem}
            onChange={(v) => update("solvesRealProblem", v)}
          />
        </Question>
      );

    case "missingFeature":
      return (
        <Question title="Which feature is missing that you'd like to see?" hint="What feature would make Matchora more useful?" optional>
          <TextArea value={data.missingFeature} onChange={(v) => update("missingFeature", v)} />
        </Question>
      );

    case "weeklyUseReason":
      return (
        <Question title="What would make you use Matchora every week?" hint="Tell us what would make Matchora part of your regular job search." optional>
          <TextArea value={data.weeklyUseReason} onChange={(v) => update("weeklyUseReason", v)} />
        </Question>
      );

    case "recommendationImprovement":
      return (
        <Question title="How can we improve our job recommendations?" hint="Help us recommend more relevant jobs." optional>
          <TextArea value={data.recommendationImprovement} onChange={(v) => update("recommendationImprovement", v)} />
        </Question>
      );

    case "useAgain":
      return (
        <Question title="Would you use Matchora again?">
          <RadioGroup
            options={["Definitely", "Probably", "Maybe", "No"]}
            value={data.useAgain}
            onChange={(v) => update("useAgain", v)}
          />
        </Question>
      );

    case "npsScore":
      return (
        <Question title="Would you recommend Matchora to a friend or colleague?" hint="0 = Not at all likely, 10 = Extremely likely">
          <div className="flex items-center gap-1">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => update("npsScore", n)}
                className={`w-8 h-8 rounded-md text-xs font-medium border transition ${
                  data.npsScore === n
                    ? "bg-violet-600 text-white border-violet-600"
                    : "border-neutral-200 hover:border-violet-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Question>
      );

    case "mostUsedPlatform":
      return (
        <Question title="Which platform do you currently use the most for job searching?">
          <RadioGroup
            options={PLATFORM_OPTIONS}
            value={data.mostUsedPlatform}
            onChange={(v) => update("mostUsedPlatform", v)}
          />
        </Question>
      );

    case "wouldPayPremium":
      return (
        <Question title="Would you consider paying for premium features in the future?">
          <RadioGroup
            options={["Yes", "Maybe", "No"]}
            value={data.wouldPayPremium}
            onChange={(v) => update("wouldPayPremium", v)}
          />
        </Question>
      );

    case "additionalFeedback":
      return (
        <Question title="Any additional feedback?">
          <TextArea value={data.additionalFeedback} onChange={(v) => update("additionalFeedback", v)} />
        </Question>
      );

    default:
      return null;
  }
}

/* ---------------- Small shared inputs ---------------- */

function Question({ title, hint, optional, children }) {
  return (
    <div>
      <h3 className="font-medium text-neutral-900">
        {title}
        {optional && <span className="text-neutral-400 font-normal text-sm ml-1.5">(optional)</span>}
      </h3>
      {hint && <p className="text-xs text-neutral-400 mt-1 mb-3">{hint}</p>}
      {!hint && <div className="mt-3" />}
      {children}
    </div>
  );
}

function TextArea({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      maxLength={1000}
      className="w-full border border-neutral-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-violet-400"
    />
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center gap-2.5 border rounded-lg px-3 py-2.5 text-sm cursor-pointer transition ${
            value === option ? "border-violet-500 bg-violet-50" : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <input
            type="radio"
            checked={value === option}
            onChange={() => onChange(option)}
            className="accent-violet-600"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2.5 border rounded-lg px-3 py-2.5 text-sm cursor-pointer transition ${
        checked ? "border-violet-500 bg-violet-50" : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-violet-600" />
      {label}
    </label>
  );
}
