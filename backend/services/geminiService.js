import ai from "../config/gemini.js";

export const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Rules:
1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT wrap the response inside \`\`\`.
4. Do NOT explain anything.
5. Every field must exist.
6. atsScore must be an integer between 0 and 100.

Return this exact structure:

{
  "skills": [],
  "education": [],
  "experience": [],
  "projects": [],
  "strengths": [],
  "missingSkills": [],
  "preferredRoles": [],
  "atsScore": 0,
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

        const analysis = JSON.parse(cleaned);

        return {
            skills: analysis.skills || [],
            education: analysis.education || [],
            experience: analysis.experience || [],
            projects: analysis.projects || [],
            strengths: analysis.strengths || [],
            missingSkills: analysis.missingSkills || [],
            preferredRoles: analysis.preferredRoles || [],
            atsScore: analysis.atsScore || 0,
            suggestions: analysis.suggestions || [],
        };

    } catch (error) {

        console.error("Gemini Analysis Error:", error);

        throw new Error("Failed to analyze resume.");

    }
};