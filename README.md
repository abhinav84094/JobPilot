# JobPilot

**An AI-powered job discovery and application management platform** that helps users find, analyze, and apply to jobs that match their skills and experience.

JobPilot leverages Google's Gemini AI to intelligently analyze resumes, extract key information, and recommend jobs based on skill matching and experience eligibility. It aggregates job postings from multiple platforms (LinkedIn, Naukri) and provides intelligent job recommendations with fit scores.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [How It Works](#how-it-works)
- [Key Services](#key-services)
- [Roadmap](#roadmap)

---

## Features

### ✅ Phase 1: Authentication
- **Google OAuth Sign-In** — Seamless login using Google accounts
- **JWT Token Management** — Secure session handling with HTTP-only cookies
- **User Profile Management** — Store user preferences and settings

### ✅ Phase 2: Resume AI Analysis
- **PDF Resume Upload** — Upload and parse resumes in PDF format
- **Gemini AI Analysis** — Intelligent extraction of:
  - Technical skills
  - Education details
  - Work experience
  - Projects
  - ATS Score (Application Tracking System compatibility)
  - Strengths and weaknesses
  - Missing skills relative to job requirements
  - Preferred job roles

### ✅ Phase 3: Job Aggregation
- **Multi-Platform Scraping** — Aggregate jobs from:
  - LinkedIn (via Puppeteer)
  - Naukri (in progress)
- **Job Deduplication** — Prevent duplicate job listings
- **Full Job Descriptions** — Fetch complete job descriptions from source pages

### ✅ Phase 4: Recommendation Engine
- **Skill-Based Matching** — Match resume skills with job requirements
- **Experience Eligibility** — Validate experience level against job requirements
- **Fit Scoring** — Calculate compatibility scores (0-100)
- **Smart Sorting** — Rank jobs by eligibility and skill match

---

## Tech Stack

### Backend
- **Runtime:** Node.js with Express.js 5.x
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** Google OAuth 2.0, JWT (jsonwebtoken)
- **AI Integration:** Google Gemini API
- **Web Scraping:** Puppeteer
- **PDF Processing:** pdf-parse
- **File Upload:** Multer (disk storage)
- **Dev Tools:** Nodemon, dotenv

### Frontend (Implied)
- **Framework:** React/Vue.js (CORS configured for `http://127.0.0.1:5173`)

---

## Project Structure

```
backend/
├── config/                 # Configuration files
│   └── gemini.js          # Google Gemini AI client setup
│
├── db/                    # Database connection
│   └── mongodb.js         # MongoDB connection module
│
├── models/                # Mongoose schemas
│   ├── User.js            # User profile with preferences
│   ├── Resume.js          # Parsed resume data and AI analysis
│   ├── Application.js     # Job application tracking
│   └── PlatformAccount.js # Job platform credentials storage
│
├── controllers/           # Request handlers
│   ├── authController.js  # Google OAuth, JWT generation, logout
│   ├── userController.js  # Resume upload and parsing
│   └── jobController.js   # Job search and recommendations
│
├── services/              # Business logic
│   ├── geminiService.js   # Resume analysis using Gemini AI
│   ├── jobService.js      # Job search aggregation
│   ├── recommendationService.js  # Job matching and ranking
│   └── scrapers/
│       ├── linkedinScraper.js    # LinkedIn job scraping
│       └── naukriScraper.js      # Naukri job scraping (WIP)
│
├── routes/                # Express route definitions
│   ├── authRoutes.js      # Authentication endpoints
│   ├── userRoutes.js      # User profile endpoints
│   └── jobRoutes.js       # Job search endpoints
│
├── middleware/            # Express middleware
│   ├── authMiddleware.js  # JWT verification and user lookup
│   └── multer.js          # File upload configuration
│
├── utils/                 # Helper functions
│   ├── generateToken.js   # JWT token generation
│   └── skillAliases.js    # Skill normalization mapping
│
├── server.js              # Express app entry point
└── package.json           # Dependencies and scripts
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Express server port | `5000` |
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/jobpilot` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_xyz` |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID | `xxxxx.apps.googleusercontent.com` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |

---

## API Documentation

### Authentication Endpoints

#### 1. **Google Sign-In**
- **Endpoint:** `POST /api/auth/google`
- **Description:** Authenticate user with Google ID token
- **Authentication:** None required
- **Cookie:** Sets `token` (HTTP-only, 7 days expiry)
- **Response:** User object with profile details

#### 2. **Get Current User**
- **Endpoint:** `GET /api/auth/me`
- **Description:** Retrieve authenticated user's profile
- **Authentication:** Required (JWT in cookie)
- **Response:** Current user object

#### 3. **Logout**
- **Endpoint:** `POST /api/auth/logout`
- **Description:** Clear JWT token and end session
- **Authentication:** Required (JWT in cookie)
- **Response:** Success message

---

### User Endpoints

#### 1. **Upload & Analyze Resume**
- **Endpoint:** `POST /api/user/upload-resume`
- **Description:** Upload PDF resume and analyze with Gemini AI
- **Authentication:** Required (JWT in cookie)
- **Content-Type:** `multipart/form-data`
- **Body:** `resume` (PDF file)
- **Returns:** 
  - Extracted skills, education, experience, projects
  - ATS score (0-100)
  - Strengths, weaknesses, missing skills
  - AI-generated suggestions
  - Preferred job roles
- **Note:** Resume file is deleted from disk after processing

---

### Job Endpoints

#### 1. **Search & Get Job Recommendations**
- **Endpoint:** `GET /api/jobs/search?query=...`
- **Description:** Search for jobs and get AI-powered recommendations
- **Authentication:** Required (JWT in cookie)
- **Query Parameters:**
  - `query` - Search keyword (e.g., "React Developer", "Full Stack")
- **Prerequisites:** User must have uploaded resume
- **Returns:** Array of jobs ranked by:
  1. Experience eligibility (eligible jobs first)
  2. Skill match score (highest first)
- **Job Details Include:**
  - Title, company, location, URL
  - Skill match score
  - Matched and missing skills
  - Experience eligibility status

---

## Database Schema

### User Model
Stores user profile and authentication data with job preferences.

**Fields:**
- `googleId` — Unique Google identifier
- `name` — User's full name
- `email` — Email address (unique)
- `picture` — Profile picture URL
- `resume` — Reference to Resume document
- `preferences` — Job preferences (roles, locations, work mode, salary)
- `timestamps` — Creation and update timestamps

### Resume Model
Stores parsed resume data and Gemini AI analysis results.

**Fields:**
- `user` — Reference to User (unique per user)
- `fileName` — Original file name
- `rawText` — Full resume text extracted from PDF
- `skills` — Array of extracted technical skills
- `education` — Array of education entries (degree, institution, dates, GPA)
- `experience` — Array of work experience (title, company, duration, description)
- `projects` — Array of projects (title, technologies, description, link)
- `strengths` — AI-identified strengths
- `missingSkills` — Skills needed for target roles
- `preferredRoles` — Recommended job roles from resume
- `atsScore` — Application Tracking System compatibility score (0-100)
- `suggestions` — AI-generated improvement suggestions
- `rawAnalysis` — Full Gemini AI response (JSON object)
- `uploadedAt` — Resume upload timestamp

### Application Model
Tracks job applications and user interaction with jobs.

**Fields:**
- `user` — Reference to User
- `resume` — Reference to Resume used
- `jobId` — Job identifier
- `company` — Company name
- `jobTitle` — Job position title
- `location` — Job location
- `platform` — Source platform (LinkedIn, Naukri, etc.)
- `jobUrl` — Link to job posting
- `fitScore` — Calculated job fit score (0-100)
- `recruiterContacted` — Whether recruiter reached out
- `appliedAutomatically` — Auto-application flag
- `aiReason` — AI reason for recommendation
- `status` — Application status (Saved, Applied, Viewed, Interview, Offer, Rejected)
- `notes` — User notes
- **Unique Index:** (user, platform, jobId)

### PlatformAccount Model
Stores credentials for job platforms (for future auto-application feature).

**Fields:**
- `user` — Reference to User
- `platform` — Job platform name
- `email` — Platform account email
- `encryptedPassword` — Encrypted password
- `cookies` — Session cookies for authentication
- `connected` — Connection status
- `lastLogin` — Last login timestamp
- `lastSynced` — Last sync timestamp
- **Unique Index:** (user, platform)

---

## How It Works

### 1. **Authentication Flow**
User logs in via Google OAuth → Backend verifies token with Google → User created/updated in MongoDB → JWT generated and stored in HTTP-only cookie → Frontend authenticated for subsequent requests

### 2. **Resume Analysis Flow**
User uploads PDF → Backend extracts text → Sends to Gemini AI with structured prompt → AI returns parsed JSON (skills, education, experience, ATS score) → Data saved to MongoDB → Resume linked to user profile → PDF file deleted from disk

### 3. **Job Search & Recommendation Flow**
User searches for jobs → Backend retrieves user's resume → Scrapes jobs from LinkedIn (Puppeteer) and Naukri → For each job:
- Extracts required skills using skill alias mapping
- Matches with resume skills (normalized)
- Calculates skill match percentage
- Extracts experience requirement from description
- Compares with user's total experience
- Generates fit score

Results sorted by:
1. Experience eligibility (eligible candidates first)
2. Skill match score (highest first)

---

## Key Services

### **Gemini Service**
- **Purpose:** AI-powered resume analysis and parsing
- **Integration:** Google Gemini 2.5 Flash model
- **Returns:** Structured JSON with skills, education, experience, ATS score, suggestions

### **Recommendation Service**
- **Skill Matching:** Normalizes and canonicalizes skills, calculates match percentage
- **Experience Calculation:** Parses date formats, converts to months, compares with requirements
- **Job Ranking:** Sorts by eligibility and skill match
- **Functions:**
  - Normalize text for consistency
  - Get canonical skill names (handle variations)
  - Extract skills from job descriptions
  - Calculate skill match scores
  - Calculate total work experience
  - Check experience eligibility
  - Rank and recommend jobs

### **LinkedIn Scraper**
- **Method:** Puppeteer headless browser automation
- **Process:**
  1. Navigates to LinkedIn jobs search API
  2. Extracts job cards (title, company, location, URL)
  3. Opens each job in separate tab
  4. Waits for full description to load
  5. Closes login popups if encountered
  6. Extracts and cleans description
  7. Returns jobs with complete details

### **Naukri Scraper**
- **Status:** Work in progress
- **Placeholder:** Ready for implementation

---

## Roadmap

- ✅ Phase 1: Authentication (Google OAuth + JWT)
- ✅ Phase 2: Resume AI Analysis (Gemini integration)
- ✅ Phase 3: Job Aggregation (LinkedIn scraper implemented)
- ✅ Phase 4: Recommendation Engine (Skill + experience matching)
- 🔄 **Upcoming:**
  - Naukri, Indeed, Internshala, Foundit scrapers
  - Automated job applications
  - Application tracking dashboard
  - Email notifications
  - Resume optimization suggestions
  - Salary insights

---

## License

This project is licensed under the ISC License.

---

**Happy job hunting! 🚀**
