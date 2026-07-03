import fs from "fs";
import { createRequire } from "module";
import Resume from "../models/Resume.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse/lib/pdf-parse");

export const uploadResume = async (req, res) => {
    try {
        const buffer = fs.readFileSync(req.file.path);

        const data = await pdf(buffer);

        const skills = await extractSkills(data.text);

        const resume = await Resume.findOneAndUpdate(
            { user: req.user._id },
            {
                user: req.user._id,
                fileName: req.file.originalname,
                rawText: data.text,
                skills,
                uploadedAt: new Date(),
            },
            {
                upsert: true,
                new: true,
            }
            );

        req.user.resume = resume._id;
        await req.user.save();

        fs.unlinkSync(req.file.path);


        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume,
        });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Resume upload failed." });
    }
};




const extractSkills = (text) => {
  const skillKeywords = [
    // Languages
    "JavaScript", "Java", "Python", "TypeScript", "C++", "C#", "Rust", "PHP", "Ruby",

    // Frontend
    "React", "Vue", "Angular", "HTML", "CSS", "Tailwind", "Bootstrap", "Next.js", "Redux",

    // Backend
    "Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Django", "FastAPI", "Spring Boot",

    // Tools & DevOps
    "Git", "Docker", "Postman", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "Jenkins", "CI/CD",

    // AI & Others
    "REST API", "GraphQL", "Gemini API", "OpenAI", "Puppeteer", "Selenium", "Redis", "Prisma"
  ];

  return skillKeywords.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
};