import ai from "../config/gemini.js";
import { calculateATSScore } from "../utils/calculateATSScore.js";

// Matches backend/models/Resume.js EXACTLY — field names and nesting
// must line up 1:1 with the schema, or data silently gets dropped
// when the controller saves the analysis to Mongo.
const resumeAnalysisSchema = {
  type: "object",
  properties: {
    skills: { type: "array", items: { type: "string" } },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          degree: { type: "string" },
          institution: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          gpaOrPercentage: { type: "string" },
        },
        required: ["degree", "institution", "location", "startDate", "endDate", "gpaOrPercentage"],
      },
    },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          description: { type: "array", items: { type: "string" } },
        },
        required: ["title", "company", "location", "startDate", "endDate", "description"],
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          technologies: { type: "array", items: { type: "string" } },
          description: { type: "array", items: { type: "string" } },
          startDate: { type: "string" },
          endDate: { type: "string" },
          link: { type: "string" },
        },
        required: ["title", "technologies", "description", "startDate", "endDate", "link"],
      },
    },
    strengths: { type: "array", items: { type: "string" } },
    missingSkills: { type: "array", items: { type: "string" } },
    preferredRoles: { type: "array", items: { type: "string" } },
    suggestions: { type: "array", items: { type: "string" } },
    contact: {
      type: "object",
      properties: {
        email: { type: "boolean" },
        phone: { type: "boolean" },
        linkedin: { type: "boolean" },
        github: { type: "boolean" },
        portfolio: { type: "boolean" },
      },
      required: ["email", "phone", "linkedin", "github", "portfolio"],
    },
    formatting: {
      type: "object",
      properties: {
        score: { type: "number" },
        issues: { type: "array", items: { type: "string" } },
      },
      required: ["score", "issues"],
    },
  },
  required: [
    "skills",
    "education",
    "experience",
    "projects",
    "strengths",
    "missingSkills",
    "preferredRoles",
    "suggestions",
    "contact",
    "formatting",
  ],
};

export const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert ATS Resume Parser and Resume Reviewer.
Your job is to accurately extract structured information from the resume and evaluate its ATS friendliness.

STRICT RULES:
- Every field in the schema must be present, using the exact structure given.
- If a field is unavailable in the resume, use an empty array, empty string, or false — never omit a field.
- Never invent information that isn't in the resume.
- Preserve dates exactly as written, split into startDate and endDate (use "Present" for endDate if ongoing).
- For "experience" and "projects" descriptions: return each bullet point in the resume as a separate string in the array — do not merge bullets into one string, and do not summarize them.
- Extract every technical skill, education entry, work experience, and project — do not merge or drop entries.
- For "missingSkills": base this on the resume's inferred target role (see preferredRoles) — list specific, commonly-expected skills for that role that are absent from the resume. Do not list generic skills unrelated to the candidate's field.
- For "formatting.score": rate 0–10 based on ATS compatibility (section headings, consistent formatting, bullet points, spacing, date consistency, contact placement, absence of tables/graphics/excessive color). For "formatting.issues": list the specific, concrete problems found — not generic advice.

Resume:
${resumeText}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: resumeAnalysisSchema,
      },
    });

    let analysis = {};
    try {
      analysis = JSON.parse(response.text);
    } catch (err) {
      console.error("Invalid Gemini JSON:", response.text);
      throw new Error("Gemini returned invalid JSON.");
    }

    const atsScore = calculateATSScore(analysis);

    return {
      skills: analysis.skills || [],
      education: analysis.education || [],
      experience: analysis.experience || [],
      projects: analysis.projects || [],
      strengths: analysis.strengths || [],
      missingSkills: analysis.missingSkills || [],
      preferredRoles: analysis.preferredRoles || [],
      suggestions: analysis.suggestions || [],
      contact: analysis.contact || {
        email: false,
        phone: false,
        linkedin: false,
        github: false,
        portfolio: false,
      },
      formatting: analysis.formatting || {
        score: 0,
        issues: [],
      },
      atsScore,
      rawAnalysis: analysis,
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze resume.");
  }
};