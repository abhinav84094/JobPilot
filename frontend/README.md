# JobPilot Frontend

An AI-powered job matching platform frontend built with **React 19**, **Vite**, and **Tailwind CSS**. This application analyzes user resumes and recommends jobs that match their skills, experience, and career goals.

---

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Route-specific page components
│   │   ├── Login.jsx       # Google OAuth authentication page
│   │   ├── Dashboard.jsx   # Job recommendations overview with stats
│   │   ├── Resume.jsx      # Resume upload & analysis
│   │   └── Recommendations.jsx # Full job listings with filtering
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx      # Main layout wrapper with sidebar outlet
│   │   ├── Sidebar.jsx     # Navigation sidebar with user profile
│   │   └── ProtectedRoute.jsx # Auth guard HOC for protected pages
│   ├── context/            # React Context API for state management
│   │   ├── AuthContext.jsx # User authentication & session state
│   │   └── ResumeContext.jsx # Resume data fetching & caching
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Hook to access AuthContext
│   │   └── useResume.js    # Hook to access ResumeContext
│   ├── data/               # Static data files
│   │   └── jobs.js         # Sample job listings
│   ├── assets/             # Images, icons, static files
│   ├── App.jsx             # Route configuration and setup
│   ├── main.jsx            # React DOM entry point
│   ├── App.css             # Global styles (legacy, mostly moved to Tailwind)
│   └── index.css           # Tailwind directives
├── public/                 # Static assets served as-is
├── index.html              # HTML template
├── vite.config.js          # Vite bundler configuration
├── tailwind.config.js      # Tailwind CSS theme & content paths
├── eslint.config.js        # ESLint rules
├── postcss.config.js       # PostCSS plugins (Tailwind)
└── package.json            # Dependencies & scripts
```

---

## Key Features

### 1. Authentication (Login Page)
- Google OAuth sign-in via backend
- Automatic redirect to Dashboard on login
- Session persistence via cookies
- Trust badges highlighting security & privacy

**File:** `src/pages/Login.jsx`

### 2. Dashboard
- Overview of job recommendations
- Key stats: matching jobs, eligible jobs, high-match jobs (90%+)
- Top 3 job cards with skill match breakdown
- Resume strength indicator (ATS score)
- Quick navigation to detailed views

**File:** `src/pages/Dashboard.jsx`

### 3. Resume Management
- Drag-and-drop resume upload (PDF/DOCX)
- ATS score calculation with color-coded feedback
- Skill detection and suggested skill gaps
- Strengths and improvement suggestions
- Parsed resume sections:
  - Experience (with descriptions)
  - Projects (with tech stacks)
  - Education
  - Preferred roles

**File:** `src/pages/Resume.jsx`

### 4. Job Recommendations
- AI-powered job search based on resume analysis
- Role-based filtering (pulled from resume preferred roles)
- Skill match scoring with color-coded eligibility
- Experience requirement validation
- Skills breakdown (matched vs. missing)
- Direct links to job postings

**File:** `src/pages/Recommendations.jsx`

### 5. Navigation Sidebar
- Always-visible navigation menu
- User profile display (avatar + name + email)
- Navigation links to all main features
- "Upgrade to Pro" CTA
- Sticky positioning with vertical scroll

**File:** `src/components/Sidebar.jsx`

---

## State Management

### AuthContext
**Location:** `src/context/AuthContext.jsx`

**State:**
- `user` - Current logged-in user object (or null)
- `loading` - Auth check in progress

**Methods:**
- `loginWithGoogle()` - Redirects to backend Google OAuth endpoint
- `logout()` - Clears user session and redirects to login
- `refetch()` - Manually refresh current user data

**Usage:**
```jsx
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  // ...
}
```

### ResumeContext
**Location:** `src/context/ResumeContext.jsx`

**State:**
- `resume` - Parsed resume object with analysis
- `loading` - Resume fetch in progress

**Methods:**
- `setResume(data)` - Update resume state (called after upload)
- `refetch()` - Re-fetch resume from backend

**Data Structure:**
```javascript
{
  fileName: string,
  atsScore: number,        // 0-100
  skills: string[],
  missingSkills: string[],
  strengths: string[],
  suggestions: string[],
  experience: [{
    _id: string,
    title: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    description: string[]
  }],
  projects: [{
    _id: string,
    title: string,
    technologies: string[],
    description: string[]
  }],
  education: [{
    _id: string,
    degree: string,
    institution: string,
    location: string,
    startDate: string,
    endDate: string
  }],
  preferredRoles: string[]
}
```

**Usage:**
```jsx
import { useResume } from "../hooks/useResume";

function MyComponent() {
  const { resume, loading, setResume, refetch } = useResume();
  // ...
}
```

---

## Protected Routes

**Component:** `src/components/ProtectedRoute.jsx`

Wraps authenticated routes to redirect unauthenticated users to the login page.

**How it works:**
1. Checks if user is authenticated via `useAuth()`
2. Shows loading state while auth status is being verified
3. Redirects to `/` (login) if not authenticated
4. Renders children if authenticated

**Usage in App.jsx:**
```jsx
<Route
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/resume" element={<Resume />} />
  <Route path="/recommendations" element={<Recommendations />} />
</Route>
```

---

## Styling

### Tailwind CSS
- **Config:** `tailwind.config.js`
- **Custom colors:** Extended violet theme (50, 100, 600, 700)
- **Utilities-first approach** for responsive, accessible UI

### Design System
- **Color Palette:**
  - Primary: `violet-600` (buttons, active states)
  - Success: `emerald-600` (eligible, matched skills)
  - Warning: `amber-600` (suggestions, improvements)
  - Danger: `red-600` (errors, missing skills)
  - Neutral: Gray scale for backgrounds and text

- **Components:**
  - Score rings (circular progress indicators)
  - Job cards (consistent layout with skill badges)
  - Stat cards (dashboard overview)
  - Upload zones (drag-and-drop areas)

---

## API Integration

All API calls go through the backend at `VITE_API_URL` (configurable via `.env`).

### Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/google` | GET | Google OAuth login redirect |
| `/api/auth/me` | GET | Fetch current user |
| `/api/auth/logout` | POST | Clear session |
| `/api/user/upload-resume` | POST | Upload & analyze resume (multipart) |
| `/api/user/resume` | GET | Fetch parsed resume data |
| `/api/jobs/search` | GET | Search jobs by role query |

**Example:**
```javascript
const res = await fetch(`${API_URL}/api/jobs/search?query=React+Developer`, {
  credentials: "include", // Include auth cookies
});
const data = await res.json();
```

---

## Component Breakdown

### ScoreRing
**Used in:** Dashboard, Resume, Recommendations

A circular progress indicator showing match/ATS scores.

**Props:**
- `score` (number): 0-100
- `size` (number, optional): Diameter in pixels (default: 44)

**Colors:**
- Green (≥90): Excellent
- Blue (80-89): Good
- Orange (60-79): Fair
- Red (<60): Needs improvement

### JobCard
**Used in:** Dashboard, Recommendations

Displays a job listing with company, role, location, skills, and match score.

**Props:**
- `job` (object): Job data from API or mock data

**Features:**
- Collapsible skills breakdown
- Eligibility badge based on experience
- External link to job posting
- Company avatar with auto-colored background

### LoadingState
**Used in:** Recommendations

Engaging loading UI with animated messages and skeleton cards.

**Features:**
- Rotating loading messages
- 3 skeleton cards for visual continuity
- Shows active role being searched

---

## Authentication Flow

```
1. User lands on / (Login page)
2. Clicks "Continue with Google"
3. Redirected to backend: GET /api/auth/google
4. Backend handles OAuth, redirects to frontend with session cookie
5. App checks current user: GET /api/auth/me
6. If authenticated, user object stored in AuthContext
7. ProtectedRoute allows navigation to /dashboard, /resume, /recommendations
8. On logout, session cleared and redirected to login
```

---

## Environment Variables

```bash
VITE_API_URL=http://localhost:3000  # Backend API URL
```

For production, set `VITE_API_URL` to your live backend domain.

---

## Debugging

### Development Tools
- **React DevTools:** Browser extension for inspecting components and state
- **Vite DevTools:** Built-in HMR (Hot Module Replacement) for instant feedback
- **ESLint:** Catches code quality issues (`npm run lint`)

### Common Issues

**Issue:** "Cannot GET /api/auth/me"
- **Cause:** Backend not running or `VITE_API_URL` is incorrect
- **Fix:** Check `.env` and ensure backend is running on the correct port

**Issue:** Resume upload fails silently
- **Cause:** Cookies not sent or session expired
- **Fix:** Ensure `credentials: "include"` in fetch calls; re-login if needed

**Issue:** Recommendations page shows "No jobs found"
- **Cause:** No `preferredRoles` in resume or API returned empty results
- **Fix:** Upload a resume with parsed preferred roles; check backend logs

---

## Useful Links

- **React Documentation:** https://react.dev
- **Vite Guide:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com
- **React Router:** https://reactrouter.com
- **Lucide Icons:** https://lucide.dev

---

## License

ISC

---

## Future Enhancements

- Applications Page - Track applied jobs and follow-ups
- Saved Jobs - Bookmark jobs for later review
- AI Coach - Real-time coaching for resume improvement
- Settings Page - User preferences, notifications, theme
- Profile Page - Edit user info and preferences
- Smart Auto-Apply - AI-powered automatic job applications
- Job Alerts - Real-time notifications for matching jobs
- Interview Prep - AI-driven interview practice

---

**Last Updated:** July 8, 2026
