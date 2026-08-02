import {
  Sparkles,
  ArrowRight,
  Target,
  Brain,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutMatchora() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">

      {/* Navbar */}

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-100">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-2xl bg-violet-600 flex items-center justify-center">

              <Sparkles className="text-white" size={20} />

            </div>

            <div>

              <h2 className="font-bold text-2xl">

                Match
                <span className="text-violet-600">
                  ora
                </span>

              </h2>

              <p className="text-xs text-neutral-500">

                AI Powered Tech Job Search

              </p>

            </div>

          </Link>

          <Link
            to="/"
            className="rounded-xl border border-neutral-200 px-5 py-2 hover:bg-neutral-50"
          >
            Back
          </Link>

        </div>

      </header>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-5 py-2 font-semibold">

            <Sparkles size={16} />

            Learn More About Matchora

          </span>

          <h1 className="text-6xl font-black mt-8 leading-tight">

            Built For Developers.

            <br />

            Designed To Simplify

            <span className="text-violet-600">
              {" "}Job Hunting.
            </span>

          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-neutral-500">

            Matchora is an AI-powered platform that helps software engineers
            discover relevant tech jobs, analyze resumes, improve ATS scores,
            and track every application from one modern dashboard.

          </p>

          <div className="flex justify-center gap-5 mt-10">

            <Link
              to="/"
              className="rounded-2xl bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 flex items-center gap-2 font-semibold"
            >
              Start Matching

              <ArrowRight size={18} />

            </Link>

            <a
              href="#story"
              className="rounded-2xl border border-neutral-200 px-8 py-4 hover:bg-neutral-50 font-semibold"
            >
              Our Story
            </a>

          </div>

        </div>

      </section>

      {/* Story */}

      <section
        id="story"
        className="max-w-6xl mx-auto px-8 py-24"
      >

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <span className="text-violet-600 font-semibold uppercase tracking-wide">

              Why Matchora Exists

            </span>

            <h2 className="text-5xl font-black mt-4">

              Job Searching
              Shouldn't Feel Like
              A Full-Time Job.

            </h2>

            <p className="text-neutral-500 mt-8 leading-8">

              Every software engineer has experienced spending hours searching
              across LinkedIn, Indeed, Wellfound, and company career pages,
              only to upload the same resume repeatedly and lose track of
              applications.

            </p>

            <p className="text-neutral-500 mt-6 leading-8">

              Matchora was created to eliminate this frustration by bringing
              AI resume analysis, personalized tech job recommendations,
              ATS insights, and application tracking into one intelligent
              platform.

            </p>

          </div>

          <div className="bg-white rounded-[40px] shadow-xl border border-neutral-100 p-10">

            <div className="flex gap-5">

              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">

                <Brain
                  className="text-violet-600"
                  size={30}
                />

              </div>

              <div>

                <h3 className="font-bold text-2xl">

                  Our Mission

                </h3>

                <p className="text-neutral-500 mt-4 leading-8">

                  Help developers spend less time searching for jobs
                  and more time preparing for interviews and building
                  great software.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Problem vs Solution */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <h2 className="text-5xl font-black">

            The Problem We Solve

          </h2>

          <p className="text-neutral-500 mt-5">

            Traditional job searching is repetitive and inefficient.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          <div className="rounded-[40px] border border-red-100 bg-red-50 p-10">

            <h3 className="text-3xl font-bold">

              Traditional Job Search

            </h3>

            <div className="space-y-6 mt-10">

              {[
                "Search multiple job websites",
                "Upload resume repeatedly",
                "Forget where you applied",
                "No ATS feedback",
                "Miss relevant opportunities",
                "Track everything manually",
              ].map((item) => (

                <div
                  key={item}
                  className="flex gap-4 items-center"
                >

                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">

                    ✕

                  </div>

                  <p>{item}</p>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-[40px] border border-emerald-100 bg-emerald-50 p-10">

            <h3 className="text-3xl font-bold">

              With Matchora

            </h3>

            <div className="space-y-6 mt-10">

              {[
                "One dashboard",
                "AI Resume Analysis",
                "ATS Score",
                "Personalized Tech Jobs",
                "Application Tracker",
                "Organized Job Search",
              ].map((item) => (

                <div
                  key={item}
                  className="flex gap-4 items-center"
                >

                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">

                    <CheckCircle2
                      className="text-emerald-600"
                      size={18}
                    />

                  </div>

                  <p>{item}</p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>      {/* CORE FEATURES */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="text-violet-600 font-semibold uppercase tracking-wider">
            Core Features
          </span>

          <h2 className="text-5xl font-black mt-4">
            Everything You Need
            <br />
            For Your Tech Career
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-20">

          <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-10 hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">

              <Brain
                className="text-violet-600"
                size={30}
              />

            </div>

            <h3 className="text-3xl font-bold mt-8">
              AI Resume Analysis
            </h3>

            <p className="text-neutral-500 mt-4 leading-8">

              Understand how your resume performs before
              applying.

            </p>

            <ul className="space-y-4 mt-8">

              {[
                "ATS Score",
                "Keyword Analysis",
                "Missing Skills",
                "Resume Suggestions",
                "Strengths & Weaknesses",
              ].map((item) => (

                <li
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CheckCircle2
                    className="text-emerald-600"
                    size={18}
                  />

                  {item}

                </li>

              ))}

            </ul>

          </div>

          <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-10 hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Briefcase
                className="text-blue-600"
                size={30}
              />

            </div>

            <h3 className="text-3xl font-bold mt-8">
              Smart Job Matching
            </h3>

            <p className="text-neutral-500 mt-4 leading-8">

              Find software engineering jobs matched to your
              resume and skills.

            </p>

            <div className="flex flex-wrap gap-3 mt-8">

              {[
                "Software Engineer",
                "SDE",
                "Frontend",
                "Backend",
                "Full Stack",
                "DevOps",
                "React",
                "Node.js",
              ].map((role) => (

                <span
                  key={role}
                  className="rounded-full bg-violet-100 text-violet-700 px-4 py-2"
                >

                  {role}

                </span>

              ))}

            </div>

          </div>

          <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-10 hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

              <Target
                className="text-orange-600"
                size={30}
              />

            </div>

            <h3 className="text-3xl font-bold mt-8">
              Application Tracker
            </h3>

            <p className="text-neutral-500 mt-4 leading-8">

              Never lose track of an application again.

            </p>

            <div className="flex items-center justify-between mt-10">

              {[
                "Applied",
                "OA",
                "Interview",
                "Offer",
              ].map((step) => (

                <div
                  key={step}
                  className="text-center"
                >

                  <div className="w-10 h-10 rounded-full bg-violet-100 mx-auto"></div>

                  <p className="mt-3 text-sm">
                    {step}
                  </p>

                </div>

              ))}

            </div>

          </div>

          <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-[32px] text-white p-10">

            <span className="inline-block rounded-full bg-white/20 px-4 py-2">

              Coming Soon

            </span>

            <h3 className="text-3xl font-bold mt-8">

              Auto Apply

            </h3>

            <p className="mt-6 leading-8 text-violet-100">

              Let Matchora automatically apply to matching
              software engineering jobs based on your
              preferences.

            </p>

          </div>

        </div>

      </section>

      {/* WHO IS IT FOR */}

      <section className="bg-neutral-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <h2 className="text-5xl font-black">

              Who Is Matchora For?

            </h2>

            <p className="text-neutral-500 mt-6">

              Built specifically for people looking for tech careers.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">

            {[
              "Students",
              "Fresh Graduates",
              "Software Engineers",
              "Frontend Developers",
              "Backend Developers",
              "Full Stack Developers",
              "Career Switchers",
              "Internship Seekers",
            ].map((item) => (

              <div
                key={item}
                className="bg-white rounded-3xl p-8 border border-neutral-100 text-center shadow-sm hover:shadow-lg transition"
              >

                <Briefcase
                  className="mx-auto text-violet-600"
                  size={32}
                />

                <h3 className="font-bold mt-6">

                  {item}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>      {/* SECURITY */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="text-violet-600 font-semibold uppercase tracking-widest">
            Security
          </span>

          <h2 className="text-5xl font-black mt-4">
            Your Data Stays Yours
          </h2>

          <p className="text-neutral-500 mt-6 max-w-3xl mx-auto">
            We built Matchora with privacy first. Your resume,
            applications and personal information are protected.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          <div className="bg-white rounded-[32px] border border-neutral-100 p-10 shadow-sm">

            <ShieldCheck
              className="text-violet-600"
              size={42}
            />

            <h3 className="font-bold text-2xl mt-8">
              Secure Google Login
            </h3>

            <p className="text-neutral-500 mt-4 leading-8">
              Authenticate securely using your Google account.
              No passwords are stored by Matchora.
            </p>

          </div>

          <div className="bg-white rounded-[32px] border border-neutral-100 p-10 shadow-sm">

            <ShieldCheck
              className="text-emerald-600"
              size={42}
            />

            <h3 className="font-bold text-2xl mt-8">
              Resume Privacy
            </h3>

            <p className="text-neutral-500 mt-4 leading-8">
              Your uploaded resumes remain private and are only
              used to provide personalized recommendations.
            </p>

          </div>

          <div className="bg-white rounded-[32px] border border-neutral-100 p-10 shadow-sm">

            <ShieldCheck
              className="text-blue-600"
              size={42}
            />

            <h3 className="font-bold text-2xl mt-8">
              No Spam
            </h3>

            <p className="text-neutral-500 mt-4 leading-8">
              We never sell your information or send unwanted
              marketing emails.
            </p>

          </div>

        </div>

      </section>

      {/* ROADMAP */}

      <section className="bg-violet-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <h2 className="text-5xl font-black">
              Product Roadmap
            </h2>

            <p className="text-neutral-500 mt-5">
              What we've built and what's coming next.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-20">

            <div className="bg-white rounded-[32px] p-10 shadow-sm">

              <h3 className="text-2xl font-bold mb-8">
                Available Today
              </h3>

              {[
                "Google Authentication",
                "Resume Upload",
                "AI Resume Analysis",
                "ATS Score",
                "Tech Job Recommendations",
                "Application Tracking",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4 mb-5"
                >

                  <CheckCircle2
                    className="text-emerald-600"
                    size={20}
                  />

                  {item}

                </div>

              ))}

            </div>

            <div className="bg-white rounded-[32px] p-10 shadow-sm">

              <h3 className="text-2xl font-bold mb-8">
                Coming Soon
              </h3>

              {[
                "Browser Extension",
                "Resume Builder",
                "AI Auto Apply",
                "Interview Preparation",
                "Email Alerts",
                "Company Insights",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4 mb-5"
                >

                  <Sparkles
                    className="text-violet-600"
                    size={18}
                  />

                  {item}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-6xl mx-auto px-8 py-24">

        <div className="rounded-[40px] bg-gradient-to-r from-violet-600 to-purple-600 text-white p-16 text-center">

          <h2 className="text-5xl font-black">

            Ready To Land
            <br />
            Your Next Tech Job?

          </h2>

          <p className="mt-8 text-violet-100 text-lg max-w-2xl mx-auto">

            Join Matchora today and let AI help you
            discover opportunities, improve your resume,
            and organize your job search.

          </p>

          <div className="mt-10">

            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-white text-violet-700 font-semibold rounded-2xl px-8 py-4 hover:scale-105 transition"
            >

              Start Matching

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-neutral-200">

        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>

            <h3 className="font-bold text-2xl">

              Match
              <span className="text-violet-600">
                ora
              </span>

            </h3>

            <p className="text-neutral-500 mt-2">

              AI Powered Platform For Tech Careers.

            </p>

          </div>

          <div className="flex gap-8 text-sm">

            <Link to="/">Home</Link>

            <Link to="/privacy">
              Privacy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>

          <p className="text-neutral-400 text-sm">

            © {new Date().getFullYear()} Matchora.
            All rights reserved.

          </p>

        </div>

      </footer>

    </div>

  );

}