import ai from "../config/gemini.js";
import { calculateATSScore } from "../utils/calculateATSScore.js";

export const analyzeResume = async (resumeText) => {
const prompt = `
You are an expert ATS Resume Parser and Resume Reviewer.

Your job is to accurately extract structured information from the resume and evaluate its ATS friendliness.

STRICT RULES:

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the response inside \`\`\`.
- Do NOT explain anything.
- Every field must exist.
- If information is unavailable, return [] or false.
- Never invent information.
- Preserve dates exactly as written.
- Extract every technical skill.
- Extract every education entry.
- Extract every work experience.
- Extract every project.
- Extract all certifications if present.
- Detect contact information.
- Identify missing industry-standard skills.
- Suggest practical improvements only.

Formatting Evaluation Rules:

Evaluate formatting based on ATS compatibility.

Consider:

- Section headings
- Consistent formatting
- Bullet points
- Readable spacing
- Date consistency
- Contact information placement
- ATS-friendly structure
- No tables or graphics
- No excessive colors
- Easy parsing

Formatting Score:

10 = Excellent ATS formatting
8 = Very good formatting
6 = Good but needs small improvements
4 = Poor formatting
2 = Very poor formatting
0 = Resume is difficult for ATS to parse

Return EXACTLY this JSON:

{
  "skills": [],
  "education": [],
  "experience": [],
  "projects": [],
  "strengths": [],
  "missingSkills": [],
  "preferredRoles": [],

  "contact": {
    "email": false,
    "phone": false,
    "linkedin": false,
    "github": false,
    "portfolio": false
  },

  "formatting": {
    "score": 0,
    "issues": []
  },

  "suggestions": []
}

Resume:

${resumeText}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const cleaned = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let analysis = {};

    try {
      analysis = JSON.parse(cleaned);
    } catch (err) {
      console.error("Invalid Gemini JSON:", cleaned);
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

      suggestions: analysis.suggestions || [],
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze resume.");
  }
};