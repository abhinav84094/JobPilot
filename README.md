# JobPilot

JobPilot is an AI-powered career assistant that helps job seekers analyze resumes, discover relevant jobs, identify missing skills, track applications, and receive personalized job recommendations using Google Gemini AI and intelligent matching algorithms.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Core Services](#core-services)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

JobPilot is a full-stack application designed to streamline the job search process through intelligent automation and AI-powered analysis. The platform consists of three primary components:

1. **Authentication System** - Secure user onboarding via Google OAuth 2.0 with JWT-based session management
2. **Resume Intelligence Engine** - PDF resume parsing and analysis using Google Gemini AI to extract structured professional data
3. **Job Recommendation System** - Multi-source job aggregation with semantic skill matching and experience eligibility validation

The platform currently supports job aggregation from LinkedIn with planned expansion to additional job boards including Naukri, Indeed, Internshala, and Foundit.

## Features

### User Authentication
- Google OAuth 2.0 integration for secure, passwordless authentication
- JWT token-based session management with HTTP-only secure cookies
- Automatic session persistence across browser sessions
- Logout functionality with complete session cleanup

### Resume Analysis
- PDF resume upload and processing
- Intelligent text extraction from resume documents
- AI-powered analysis using Google Gemini API to extract:
  - Technical skills and competencies
  - Educational background and qualifications
  - Work experience and tenure information
  - Personal and professional projects
  - Application Tracking System (ATS) compatibility score
  - Career strengths and professional gaps
  - Recommended job roles based on experience
- Skill normalization and canonicalization for consistent matching
- Storage of parsed resume data for subsequent job matching

### Job Aggregation
- Automated job scraping from multiple platforms using Puppeteer
- LinkedIn job listings with complete job descriptions
- Full job details extraction including requirements and qualifications
- Duplicate job detection and prevention
- Real-time job availability updates

### Intelligent Matching Engine
- Semantic skill matching against job requirements
- Multi-dimensional job scoring:
  - Skill compatibility percentage (0-100)
  - Experience level eligibility assessment
  - Overall job fit score
- Smart result ranking prioritizing eligible opportunities
- Detailed match breakdown showing matched and missing skills
- Experience requirement validation based on job descriptions

### User Experience Features
- Dashboard providing overview of job opportunities
- Personalized job recommendations ranked by fit score
- Role-based filtering and search capabilities
- User preference management for job search refinement

## Tech Stack

### Backend
- **Runtime Environment**: Node.js with Express.js 5.x framework
- **Database**: MongoDB with Mongoose ODM for data persistence
- **Authentication**: Google OAuth 2.0 with JWT token handling
- **AI Integration**: Google Gemini 2.5 Flash API for resume analysis
- **Web Scraping**: Puppeteer headless browser automation
- **File Processing**: pdf-parse for PDF text extraction and Multer for file uploads
- **Utilities**: jsonwebtoken for token generation, dotenv for environment management

### Frontend
- **Framework**: React 19 with React Router for navigation
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for utility-first responsive design
- **State Management**: React Context API for global state
- **UI Components**: Lucide React for consistent iconography

### Development Tools
- **Package Manager**: npm 10+
- **Code Quality**: ESLint for code linting
- **Workflow Automation**: Nodemon for automatic server restarts during development

## Quick Start

### Prerequisites
- Node.js version 18.x or later
- npm version 10.x or later
- MongoDB instance (local or cloud-based such as MongoDB Atlas)
- Google OAuth 2.0 credentials
- Google Gemini API key

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/abhinav84094/JobPilot.git
cd JobPilot
```

2. Backend configuration:
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/jobpilot
JWT_SECRET=your_secure_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

3. Frontend configuration:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The application will be accessible at `http://127.0.0.1:5173`

## Project Structure

### Backend Architecture

```
backend/
├── config/
│   ├── gemini.js                 # Google Gemini AI client configuration
│   └── mongodb.js                # Database connection configuration
│
├── db/
│   └── mongodb.js                # MongoDB initialization and connection
│
├── models/
│   ├── User.js                   # User profile and preferences schema
│   ├── Resume.js                 # Parsed resume data and analysis results
│   ├── Application.js            # Job application tracking document
│   └── PlatformAccount.js        # Job platform authentication credentials
│
├── controllers/
│   ├── authController.js         # OAuth and session management
│   ├── userController.js         # Resume upload and processing
│   └── jobController.js          # Job search and retrieval
│
├── services/
│   ├── geminiService.js          # Resume analysis implementation
│   ├── jobService.js             # Job search and aggregation logic
│   ├── recommendationService.js  # Matching and scoring algorithms
│   └── scrapers/
│       ├── linkedinScraper.js    # LinkedIn job scraping
│       └── naukriScraper.js      # Naukri scraper (in development)
│
├── routes/
│   ├── authRoutes.js             # Authentication endpoints
│   ├── userRoutes.js             # User and resume endpoints
│   └── jobRoutes.js              # Job search endpoints
│
├── middleware/
│   ├── authMiddleware.js         # JWT verification and user lookup
│   └── multerConfig.js           # File upload configuration
│
├── utils/
│   ├── generateToken.js          # JWT token creation utility
│   ├── skillAliases.js           # Skill normalization mapping
│   └── dateParser.js             # Date format parsing utilities
│
├── server.js                      # Express application entry point
└── package.json                   # Dependencies and NPM scripts
```

### Frontend Architecture

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx             # Google OAuth authentication interface
│   │   ├── Dashboard.jsx         # Job overview and statistics
│   │   ├── Resume.jsx            # Resume upload and analysis display
│   │   └── Recommendations.jsx   # Detailed job listings and filtering
│   │
│   ├── components/
│   │   ├── Layout.jsx            # Main application layout wrapper
│   │   ├── Sidebar.jsx           # Navigation sidebar component
│   │   ├── ProtectedRoute.jsx    # Route protection HOC
│   │   ├── ScoreRing.jsx         # Circular progress indicator
│   │   └── JobCard.jsx           # Individual job listing component
│   │
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication state provider
│   │   └── ResumeContext.jsx     # Resume data state provider
│   │
│   ├── hooks/
│   │   ├── useAuth.js            # Authentication context hook
│   │   └── useResume.js          # Resume context hook
│   │
│   ├── assets/                   # Static images and media files
│   ├── App.jsx                   # Route configuration
│   ├── main.jsx                  # React DOM entry point
│   ├── index.css                 # Tailwind CSS directives
│   └── App.css                   # Global styles
│
├── public/                       # Static assets served directly
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

## Architecture

### Request Flow - Authentication

```
User Login Request
    ↓
Frontend: Google OAuth Callback
    ↓
Backend: POST /api/auth/google
    ↓
Verify Google ID Token with Google API
    ↓
Create or Update User in MongoDB
    ↓
Generate JWT Token
    ↓
Set HTTP-only Cookie (7-day expiry)
    ↓
Return User Profile to Frontend
```

### Request Flow - Resume Analysis

```
User Uploads Resume (PDF)
    ↓
Frontend: POST /api/user/upload-resume (multipart/form-data)
    ↓
Backend: Receive File via Multer
    ↓
Extract Text from PDF using pdf-parse
    ↓
Send to Google Gemini API with Structured Prompt
    ↓
Gemini Returns Parsed JSON
    (Skills, Education, Experience, Projects, ATS Score)
    ↓
Validate and Clean Extracted Data
    ↓
Store in MongoDB Resume Document
    ↓
Delete Temporary File from Disk
    ↓
Return Parsed Resume to Frontend
```

### Request Flow - Job Recommendation

```
User Searches for Jobs
    ↓
Frontend: GET /api/jobs/search?query=...
    ↓
Backend: Retrieve User's Resume from MongoDB
    ↓
Scrape Jobs from LinkedIn using Puppeteer
    ↓
For Each Job:
  - Extract Required Skills
  - Normalize Skills (using skill aliases)
  - Calculate Skill Match Score
  - Extract Experience Requirements
  - Calculate Experience Eligibility
  - Generate Overall Fit Score
    ↓
Sort Results by:
  1. Experience Eligibility (eligible first)
  2. Skill Match Score (highest first)
    ↓
Return Ranked Jobs with Detailed Matching Info
```

## Configuration

### Environment Variables Reference

#### Backend Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Express server listening port | `5000` | Yes |
| `MONGO_URL` | MongoDB connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/jobpilot` | Yes |
| `JWT_SECRET` | Secret key for JWT signing and verification | `your_secure_random_string` | Yes |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID from Google Cloud | `xxxxx.apps.googleusercontent.com` | Yes |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret from Google Cloud | `GOCSPX_...` | Yes |
| `GEMINI_API_KEY` | API key for Google Gemini AI | `AIzaSy...` | Yes |
| `NODE_ENV` | Execution environment | `development` or `production` | No |

#### Frontend Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` | Yes |

### Google OAuth Setup

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web Application type)
5. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-domain.com/api/auth/google/callback`
6. Copy Client ID and Client Secret to backend `.env`

### Google Gemini API Setup

1. Navigate to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key for Gemini
3. Add key to backend `.env` as `GEMINI_API_KEY`

## API Documentation

### Authentication Endpoints

#### Google OAuth Sign-In
```
POST /api/auth/google
```

Authenticates user via Google ID token and initiates session.

**Request Body:**
```json
{
  "tokenId": "google_id_token_string"
}
```

**Response (200 OK):**
```json
{
  "_id": "user_id",
  "googleId": "google_id",
  "name": "User Name",
  "email": "user@example.com",
  "picture": "https://...",
  "preferences": {}
}
```

**Cookies Set:**
- `token` - JWT authentication token (HTTP-only, 7-day expiry)

---

#### Get Current User
```
GET /api/auth/me
```

Retrieves authenticated user profile from JWT token in cookie.

**Authentication:** Required (JWT cookie)

**Response (200 OK):**
```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "picture": "https://..."
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid or expired token"
}
```

---

#### Logout
```
POST /api/auth/logout
```

Clears JWT token cookie and ends user session.

**Authentication:** Required (JWT cookie)

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

### User Endpoints

#### Upload and Analyze Resume
```
POST /api/user/upload-resume
```

Uploads PDF resume file and processes it using Gemini AI for analysis.

**Authentication:** Required (JWT cookie)

**Content-Type:** `multipart/form-data`

**Request Body:**
- `resume` - PDF file (max 10MB)

**Response (200 OK):**
```json
{
  "_id": "resume_id",
  "fileName": "MyResume.pdf",
  "atsScore": 78,
  "skills": ["React", "Node.js", "MongoDB", "JavaScript"],
  "education": [
    {
      "_id": "edu_id",
      "degree": "Bachelor of Engineering",
      "institution": "University Name",
      "location": "City, Country",
      "startDate": "2018",
      "endDate": "2022"
    }
  ],
  "experience": [
    {
      "_id": "exp_id",
      "title": "Senior Developer",
      "company": "Company Name",
      "location": "City, Country",
      "startDate": "January 2022",
      "endDate": "Present",
      "description": ["Responsibility 1", "Responsibility 2"]
    }
  ],
  "projects": [
    {
      "_id": "proj_id",
      "title": "Project Name",
      "technologies": ["React", "Node.js"],
      "description": ["Project details"]
    }
  ],
  "strengths": ["Leadership", "Problem solving"],
  "missingSkills": ["Python", "Docker"],
  "suggestions": ["Learn Docker for containerization"],
  "preferredRoles": ["Full Stack Developer", "Backend Engineer"],
  "uploadedAt": "2024-01-15T10:30:00Z"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "No file uploaded"
}
```

---

#### Get Stored Resume
```
GET /api/user/resume
```

Retrieves previously uploaded and analyzed resume for authenticated user.

**Authentication:** Required (JWT cookie)

**Response (200 OK):**
```json
{
  "_id": "resume_id",
  "fileName": "MyResume.pdf",
  "atsScore": 78,
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": [...],
  "education": [...],
  "projects": [...],
  "strengths": [...],
  "missingSkills": [...],
  "suggestions": [...],
  "preferredRoles": [...]
}
```

---

### Job Endpoints

#### Search and Get Job Recommendations
```
GET /api/jobs/search?query=<search_keyword>
```

Searches for jobs based on query and returns AI-powered recommendations ranked by relevance to user's resume.

**Authentication:** Required (JWT cookie)

**Query Parameters:**
- `query` - Search keyword (e.g., "React Developer", "Full Stack Engineer")

**Prerequisites:**
- User must have uploaded a resume

**Response (200 OK):**
```json
{
  "jobs": [
    {
      "id": "job_id",
      "title": "Senior React Developer",
      "company": "Tech Company",
      "location": "Remote",
      "description": "We are looking for...",
      "jobUrl": "https://linkedin.com/jobs/...",
      "platform": "linkedin",
      "skillMatch": 85,
      "matchedSkills": ["React", "JavaScript", "Node.js"],
      "missingSkills": ["TypeScript"],
      "experienceRequired": "3-5 years",
      "experienceEligible": true,
      "fitScore": 87
    }
  ],
  "total": 42,
  "filtered": 12
}
```

**Error (400 Bad Request - No Resume):**
```json
{
  "error": "Please upload a resume first"
}
```

**Error (400 Bad Request - Missing Query):**
```json
{
  "error": "Query parameter is required"
}
```

---

## Database Schema

### User Model

Stores user profile information and authentication data.

```javascript
{
  _id: ObjectId,
  googleId: String,                // Unique identifier from Google
  name: String,                    // User full name
  email: String,                   // Email address (unique)
  picture: String,                 // Profile picture URL
  resume: ObjectId,                // Reference to Resume document
  preferences: {
    jobRoles: [String],           // Preferred job titles
    locations: [String],          // Preferred work locations
    workMode: String,             // "Remote" | "On-site" | "Hybrid"
    salaryRange: {
      min: Number,
      max: Number,
      currency: String
    },
    industries: [String]          // Preferred industries
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

### Resume Model

Stores parsed resume data and Gemini AI analysis results.

```javascript
{
  _id: ObjectId,
  user: ObjectId,                 // Reference to User (unique)
  fileName: String,               // Original uploaded file name
  rawText: String,                // Full extracted text from PDF
  skills: [String],               // Extracted technical skills
  education: [{
    _id: ObjectId,
    degree: String,               // e.g., "Bachelor of Science"
    institution: String,          // University or school name
    location: String,             // City, Country
    startDate: String,            // Start year/date
    endDate: String,              // End year/date or "Present"
    gpa: Number,                  // Grade Point Average (optional)
    description: [String]         // Additional notes
  }],
  experience: [{
    _id: ObjectId,
    title: String,                // Job title
    company: String,              // Company name
    location: String,             // Work location
    startDate: String,            // Start month/year
    endDate: String,              // End month/year or "Present"
    duration: String,             // Calculated duration
    description: [String]         // Responsibilities and achievements
  }],
  projects: [{
    _id: ObjectId,
    title: String,                // Project name
    technologies: [String],       // Tech stack used
    description: [String],        // Project overview
    link: String,                 // Project URL/portfolio link
    dates: {
      start: String,
      end: String
    }
  }],
  strengths: [String],            // AI-identified professional strengths
  weaknesses: [String],           // Areas for improvement
  missingSkills: [String],        // Skills for target roles
  suggestions: [String],          // AI recommendations
  preferredRoles: [String],       // Recommended job roles
  atsScore: Number,               // ATS compatibility (0-100)
  rawAnalysis: Object,            // Full Gemini API response
  uploadedAt: Date,
  updatedAt: Date
}
```

---

### Application Model

Tracks job applications and user interactions.

```javascript
{
  _id: ObjectId,
  user: ObjectId,                 // Reference to User
  resume: ObjectId,               // Reference to Resume used
  jobId: String,                  // Job identifier (platform-specific)
  company: String,                // Company name
  jobTitle: String,               // Job position title
  location: String,               // Work location
  platform: String,               // "linkedin" | "naukri" | "indeed"
  jobUrl: String,                 // Link to job posting
  fitScore: Number,               // Job fit score (0-100)
  skillMatch: Number,             // Skill match percentage
  matchedSkills: [String],        // Matched skill list
  missingSkills: [String],        // Missing skill list
  recruiterContacted: Boolean,    // Recruiter reach out status
  appliedAutomatically: Boolean,  // Auto-application flag
  aiReason: String,               // AI recommendation reason
  status: String,                 // "Saved" | "Applied" | "Viewed" | "Interview" | "Offer" | "Rejected"
  notes: String,                  // User notes
  appliedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Unique Index: (user, platform, jobId)
```

---

### PlatformAccount Model

Stores credentials for job platform authentication (for auto-application feature).

```javascript
{
  _id: ObjectId,
  user: ObjectId,                 // Reference to User
  platform: String,               // Job platform name
  email: String,                  // Platform account email
  encryptedPassword: String,      // Encrypted password
  cookies: Object,                // Session authentication cookies
  connected: Boolean,             // Connection status
  lastLogin: Date,                // Last successful login
  lastSynced: Date,               // Last data sync timestamp
  syncedData: {
    applications: Number,         // Number of applications
    lastUpdate: Date
  }
}

// Unique Index: (user, platform)
```

---

## Core Services

### Gemini Service

Provides AI-powered resume analysis using Google Gemini API.

**Key Functions:**
- `analyzeResume(text)` - Sends extracted resume text to Gemini with structured prompt
- Returns parsed JSON containing:
  - Technical skills
  - Education details
  - Work experience
  - Projects
  - ATS score
  - Strengths and weaknesses
  - Recommendations

**Integration Points:**
- Used when uploading resume via `/api/user/upload-resume`
- Processes raw text extracted by pdf-parse
- Returns structured data for MongoDB storage

---

### Job Service

Aggregates job listings from multiple platforms.

**Responsibilities:**
- Orchestrate scraper execution
- Deduplicate jobs across platforms
- Format job data for consistency
- Manage scraper error handling

**Scrapers Implemented:**
- LinkedIn (via Puppeteer)
- Naukri (in development)

**Scrapers Planned:**
- Indeed
- Internshala
- Foundit

---

### Recommendation Service

Implements matching algorithms and job ranking logic.

**Core Functions:**
- `normalizeText(text)` - Standardize text for consistent comparison
- `getCanonicalSkillName(skill)` - Resolve skill aliases to canonical names
- `extractSkillsFromJob(description)` - Parse job description for required skills
- `calculateSkillMatch(resumeSkills, jobSkills)` - Compute skill compatibility score
- `calculateExperience(experienceArray)` - Extract total years of experience
- `checkExperienceEligibility(userExperience, jobRequirement)` - Validate experience level
- `rankAndRecommendJobs(jobs, userResume)` - Sort jobs by eligibility and fit

**Skill Aliasing:**
The service uses a mapping of skill variations to canonical names:
- "JavaScript" / "JS" / "JS" → "JavaScript"
- "TypeScript" / "TS" → "TypeScript"
- "React.js" / "ReactJS" / "React" → "React"
- Similar mappings for other technologies

---

### LinkedIn Scraper

Automates LinkedIn job listing extraction using Puppeteer.

**Process Flow:**
1. Launch headless browser instance
2. Navigate to LinkedIn jobs search endpoint
3. Extract job card listings (title, company, location)
4. For each job:
   - Open in new tab
   - Wait for description to load
   - Handle login popups if encountered
   - Extract full job description
5. Clean and format extracted data
6. Return complete job objects

**Data Extracted:**
- Job title and company
- Location
- Job description and requirements
- Application URL
- Salary information (if available)
- Company information

---

## Development Guide

### Local Development Setup

1. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Start MongoDB locally or connect to remote instance

3. Create `.env` files with required credentials

4. Start backend (from `backend` directory):
```bash
npm start
```

5. In separate terminal, start frontend (from `frontend` directory):
```bash
npm run dev
```

### Development Commands

**Backend:**
```bash
npm start          # Start server with nodemon
npm test           # Run test suite
npm run lint       # Check code quality
```

**Frontend:**
```bash
npm run dev        # Start Vite dev server
npm run build      # Create production build
npm run preview    # Preview production build
npm run lint       # Check code quality
```

### Debugging

**Backend Debugging:**
- Add `debugger` statement in code
- Run with: `node --inspect backend/server.js`
- Connect Chrome DevTools to `chrome://inspect`

**Frontend Debugging:**
- Use React DevTools browser extension
- Check browser console for errors
- Use Vite dev server HMR feedback

### Testing

*Note: Test suite configuration is pending implementation*

```bash
# Once test framework is integrated
npm test
```

### Code Style

- ESLint configuration present in both backend and frontend
- Run `npm run lint` before committing changes
- Fix automatically: `npm run lint -- --fix`

---

## Deployment

### Backend Deployment (Heroku Example)

1. Create Heroku account and install CLI
2. Login: `heroku login`
3. Create app: `heroku create jobpilot-app`
4. Set environment variables:
```bash
heroku config:set PORT=5000
heroku config:set MONGO_URL=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set GEMINI_API_KEY=your_api_key
```
5. Deploy: `git push heroku main`

### Frontend Deployment (Vercel Example)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
```
VITE_API_URL=https://your-backend-domain.com
```
4. Deploy automatically on push to main branch

### Environment-Specific Configuration

**Development:**
- Relaxed CORS policies
- Verbose logging
- Local file uploads
- Hot module reloading

**Production:**
- Strict CORS configuration
- Minimal logging
- Cloud storage for files
- Optimized builds

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make changes and commit: `git commit -m "Add feature description"`
4. Push to branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

**Code Standards:**
- Follow existing code style
- Add comments for complex logic
- Test changes before submitting
- Update documentation as needed

---

## Roadmap

### Completed
- Phase 1: Google OAuth authentication and JWT session management
- Phase 2: Resume upload and Gemini AI analysis
- Phase 3: LinkedIn job scraping and aggregation
- Phase 4: Skill-based matching and job ranking

### In Development
- Naukri job platform integration
- Application tracking dashboard
- User preference refinement

### Planned Features
- Indeed, Internshala, and Foundit job scrapers
- Automated job applications
- Email notification system
- Resume optimization recommendations
- Salary insights and market analysis
- Interview preparation assistance
- User settings and preferences page
- Saved jobs collection
- Application follow-up tracking

---

## Support

For issues and questions, please open an issue on the GitHub repository.

---

## License

This project is licensed under the ISC License. See the LICENSE file for details.

---

**Last Updated:** July 2026
