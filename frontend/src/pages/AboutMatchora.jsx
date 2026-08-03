import {
  Sparkles,
  ArrowRight,
  Brain,
  FileText,
  Search,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Building2
} from "lucide-react";

import { Link } from "react-router-dom";

export default function AboutMatchora() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-100">

        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg">

              <Sparkles className="text-white" size={22} />

            </div>

            <div>

              <h2 className="font-black text-2xl">

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
            className="rounded-2xl border border-neutral-200 px-6 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Back To Home
          </Link>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2 text-violet-700 font-semibold">

            <Sparkles size={16} />

            About Matchora

          </span>

          <h1 className="text-6xl font-black leading-tight mt-8">

            Built For

            <span className="text-violet-600">
              {" "}Software Engineers
            </span>

            <br />

            Looking For Their

            <br />

            Next LinkedIn Job.

          </h1>

          <p className="text-neutral-500 text-lg leading-8 mt-8 max-w-xl">

            Matchora is an AI-powered platform built specifically
            for software engineers. We help you analyze your
            resume, discover matching LinkedIn opportunities,
            improve your ATS score, and keep every application
            organized from one dashboard.

          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/"
              className="rounded-2xl bg-violet-600 text-white px-8 py-4 flex items-center gap-2 font-semibold hover:bg-violet-700 transition"
            >

              Start Matching

              <ArrowRight size={18} />

            </Link>

            <a
              href="#story"
              className="rounded-2xl border border-neutral-200 px-8 py-4 font-semibold hover:bg-neutral-50 transition"
            >

              Our Story

            </a>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="bg-white rounded-[40px] border border-neutral-200 shadow-2xl p-10">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-neutral-500">

                  Resume ATS Score

                </p>

                <h2 className="text-5xl font-black mt-2">

                  92%

                </h2>

                <p className="text-emerald-600 font-semibold mt-2">

                  Excellent

                </p>

              </div>

              <div className="w-24 h-24 rounded-full border-[10px] border-violet-600 border-r-violet-200 border-b-violet-200"></div>

            </div>

            <div className="mt-10">

              <h3 className="font-bold">

                Skills Detected

              </h3>

              <div className="flex flex-wrap gap-3 mt-5">

                {[
                  "React",
                  "Node.js",
                  "MongoDB",
                  "Express",
                  "JavaScript",
                  "REST APIs",
                ].map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-violet-100 text-violet-700 px-4 py-2 text-sm"
                  >

                    {skill}

                  </span>

                ))}

              </div>

            </div>

            <div className="mt-10 rounded-3xl bg-neutral-50 p-6">

              <div className="flex items-center justify-between">

                <div className="flex gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

                    <Briefcase
                      className="text-violet-600"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold">

                      Software Engineer

                    </h3>

                    <p className="text-sm text-neutral-500">

                      Google • Bengaluru

                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-semibold">

                  95% Match

                </span>

              </div>

            </div>

          </div>

          {/* Floating Card */}

          <div className="absolute -left-10 top-20 bg-white border border-neutral-100 shadow-xl rounded-3xl p-5 w-60">

            <div className="flex gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                <Building2
                  className="text-blue-700"
                />

              </div>

              <div>

                <h4 className="font-semibold">

                  LinkedIn Jobs

                </h4>

                <p className="text-xs text-neutral-500 mt-1">

                  Personalized opportunities
                  updated daily.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>      {/* ================= OUR STORY ================= */}

      <section
        id="story"
        className="max-w-7xl mx-auto px-8 py-24"
      >

        <div className="text-center">

          <span className="text-violet-600 font-semibold uppercase tracking-widest">

            Our Story

          </span>

          <h2 className="text-5xl font-black mt-5">

            Why Matchora Exists

          </h2>

          <p className="max-w-3xl mx-auto text-neutral-500 leading-8 mt-8 text-lg">

            Job searching has become unnecessarily repetitive.
            Developers spend hours searching LinkedIn, opening
            hundreds of listings, uploading resumes repeatedly,
            and manually tracking applications.

            <br /><br />

            Matchora was built to simplify that entire workflow.
            Instead of managing multiple tabs and spreadsheets,
            everything is organized in one intelligent platform.

          </p>

        </div>

      </section>

      {/* ================= THE PROBLEM ================= */}

      <section className="bg-neutral-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <span className="text-red-500 font-semibold uppercase">

              The Problem

            </span>

            <h2 className="text-5xl font-black mt-5">

              Traditional Job Search
              Is Time Consuming

            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-20">

            <div className="bg-white rounded-[36px] border border-red-100 shadow-sm p-10">

              <h3 className="text-3xl font-bold">

                Current Workflow

              </h3>

              <div className="mt-10 space-y-6">

                {[
                  "Open LinkedIn",
                  "Search Jobs",
                  "Open Hundreds of Listings",
                  "Upload Resume Again",
                  "Forget Applications",
                  "Repeat Tomorrow",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex gap-4 items-center"
                  >

                    <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">

                      ✕

                    </div>

                    <p className="text-lg">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-white rounded-[36px] border border-emerald-100 shadow-sm p-10">

              <h3 className="text-3xl font-bold">

                With Matchora

              </h3>

              <div className="mt-10 space-y-6">

                {[
                  "Upload Resume Once",
                  "AI Resume Analysis",
                  "ATS Score",
                  "Matching LinkedIn Jobs",
                  "Track Applications",
                  "Everything In One Dashboard",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex gap-4 items-center"
                  >

                    <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center">

                      <CheckCircle2
                        className="text-emerald-600"
                        size={20}
                      />

                    </div>

                    <p className="text-lg">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY LINKEDIN ================= */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">

              <Building2
                className="text-blue-700"
                size={42}
              />

            </div>

            <h2 className="text-5xl font-black mt-8">

              Why We Started
              With LinkedIn

            </h2>

            <p className="text-neutral-500 text-lg leading-8 mt-8">

              Matchora currently focuses on LinkedIn because
              it is one of the world's largest professional
              networking platforms and a primary destination
              for software engineering opportunities.

            </p>

            <p className="text-neutral-500 text-lg leading-8 mt-6">

              Rather than trying to support every job platform
              from day one, we're focused on delivering the
              best experience possible for LinkedIn users first.

            </p>

          </div>

          <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-[40px] text-white p-12">

            <h3 className="text-3xl font-bold">

              Today Matchora Helps You

            </h3>

            <div className="space-y-6 mt-10">

              {[
                "Discover LinkedIn Tech Jobs",
                "Analyze Your Resume",
                "Improve ATS Score",
                "Track Applications",
                "Stay Organized",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <CheckCircle2 size={22} />

                  <span className="text-lg">

                    {item}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>      {/* ================= CORE FEATURES ================= */}

      <section className="bg-neutral-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <span className="text-violet-600 font-semibold uppercase tracking-widest">

              Core Features

            </span>

            <h2 className="text-5xl font-black mt-5">

              Everything You Need
              <br />
              For Your Job Search

            </h2>

            <p className="text-neutral-500 text-lg mt-6 max-w-3xl mx-auto">

              Matchora focuses on helping software engineers
              discover better opportunities and organize their
              job search from one dashboard.

            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-20">

            {/* Resume */}

            <div className="bg-white rounded-[36px] border border-neutral-100 shadow-sm p-10 hover:-translate-y-2 transition">

              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">

                <Brain
                  className="text-violet-600"
                  size={32}
                />

              </div>

              <h3 className="text-3xl font-bold mt-8">

                AI Resume Analysis

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Upload your resume and receive detailed
                AI-powered insights before applying.

              </p>

              <div className="space-y-4 mt-8">

                {[
                  "ATS Score",
                  "Resume Strengths",
                  "Missing Skills",
                  "Improvement Suggestions",
                  "Keyword Analysis",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
                      className="text-emerald-600"
                      size={18}
                    />

                    {item}

                  </div>

                ))}

              </div>

            </div>

            {/* Jobs */}

            <div className="bg-white rounded-[36px] border border-neutral-100 shadow-sm p-10 hover:-translate-y-2 transition">

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Search
                  className="text-blue-600"
                  size={32}
                />

              </div>

              <h3 className="text-3xl font-bold mt-8">

                LinkedIn Job Discovery

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Discover software engineering opportunities
                from LinkedIn based on your resume.

              </p>

              <div className="flex flex-wrap gap-3 mt-8">

                {[
                  "Software Engineer",
                  "Frontend",
                  "Backend",
                  "Full Stack",
                  "React",
                  "Node.js",
                  "Java",
                  "Python",
                ].map((role) => (

                  <span
                    key={role}
                    className="rounded-full bg-violet-100 text-violet-700 px-4 py-2 text-sm font-medium"
                  >

                    {role}

                  </span>

                ))}

              </div>

            </div>

            {/* ATS */}

            <div className="bg-white rounded-[36px] border border-neutral-100 shadow-sm p-10 hover:-translate-y-2 transition">

              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">

                <FileText
                  className="text-emerald-600"
                  size={32}
                />

              </div>

              <h3 className="text-3xl font-bold mt-8">

                ATS Optimization

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Improve your resume before applying
                and increase your chances of getting
                shortlisted.

              </p>

            </div>

            {/* Tracker */}

            <div className="bg-white rounded-[36px] border border-neutral-100 shadow-sm p-10 hover:-translate-y-2 transition">

              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                <Briefcase
                  className="text-orange-600"
                  size={32}
                />

              </div>

              <h3 className="text-3xl font-bold mt-8">

                Application Tracker

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Track every application from
                Applied to Offer without using
                spreadsheets.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CURRENT CAPABILITIES ================= */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <span className="text-violet-600 font-semibold uppercase tracking-widest">

              Available Today

            </span>

            <h2 className="text-5xl font-black mt-5">

              What You Can
              Do Today

            </h2>

            <div className="space-y-5 mt-12">

              {[
                "Google Authentication",
                "Resume Upload",
                "Resume Parsing",
                "AI Resume Analysis",
                "ATS Score",
                "LinkedIn Job Recommendations",
                "Application Tracking",
              ].map((item) => (

                <div
                  key={item}
                  className="flex gap-4 items-center"
                >

                  <CheckCircle2
                    className="text-emerald-600"
                    size={22}
                  />

                  <span className="text-lg">

                    {item}

                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[40px] text-white p-12">

            <h3 className="text-3xl font-bold">

              Our Goal

            </h3>

            <p className="text-violet-100 text-lg leading-8 mt-8">

              We want every software engineer to spend
              less time searching for jobs and more
              time preparing for interviews, learning
              new skills, and building amazing products.

            </p>

          </div>

        </div>

      </section>

      {/* ================= WHO IS IT FOR ================= */}

      <section className="bg-neutral-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <h2 className="text-5xl font-black">

              Built For

            </h2>

            <p className="text-neutral-500 text-lg mt-5">

              Matchora is designed specifically
              for people building careers in technology.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

            {[
              "Students",
              "Fresh Graduates",
              "Software Engineers",
              "Frontend Developers",
              "Backend Developers",
              "Full Stack Developers",
              "Internship Seekers",
              "Career Switchers",
            ].map((item) => (

              <div
                key={item}
                className="bg-white rounded-[28px] border border-neutral-100 p-8 shadow-sm text-center hover:shadow-lg transition"
              >

                <Briefcase
                  className="mx-auto text-violet-600"
                  size={34}
                />

                <h3 className="font-bold mt-6">

                  {item}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>      {/* ================= TECHNOLOGY ================= */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="text-violet-600 font-semibold uppercase tracking-widest">

            Technology

          </span>

          <h2 className="text-5xl font-black mt-5">

            Built With Modern Technologies

          </h2>

          <p className="text-neutral-500 text-lg mt-6 max-w-3xl mx-auto">

            Matchora is built using a modern full-stack
            JavaScript architecture to deliver a fast,
            secure and reliable experience.

          </p>

        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-20">

          {[
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Google OAuth",
            "Tailwind CSS",
          ].map((tech) => (

            <div
              key={tech}
              className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition text-center"
            >

              <h3 className="font-bold text-lg">

                {tech}

              </h3>

            </div>

          ))}

        </div>

      </section>

      {/* ================= SECURITY ================= */}

      <section className="bg-neutral-50 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center">

            <span className="text-violet-600 font-semibold uppercase tracking-widest">

              Privacy & Security

            </span>

            <h2 className="text-5xl font-black mt-5">

              Your Data Comes First

            </h2>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-20">

            <div className="bg-white rounded-[32px] border border-neutral-100 p-10 shadow-sm">

              <ShieldCheck
                className="text-violet-600"
                size={40}
              />

              <h3 className="text-2xl font-bold mt-8">

                Secure Google Login

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Authentication is handled securely
                through Google OAuth.

              </p>

            </div>

            <div className="bg-white rounded-[32px] border border-neutral-100 p-10 shadow-sm">

              <ShieldCheck
                className="text-emerald-600"
                size={40}
              />

              <h3 className="text-2xl font-bold mt-8">

                Resume Privacy

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Your resume is private and used only
                to provide personalized analysis
                and recommendations.

              </p>

            </div>

            <div className="bg-white rounded-[32px] border border-neutral-100 p-10 shadow-sm">

              <ShieldCheck
                className="text-blue-600"
                size={40}
              />

              <h3 className="text-2xl font-bold mt-8">

                No Password Storage

              </h3>

              <p className="text-neutral-500 mt-5 leading-8">

                Since we use Google authentication,
                Matchora never stores your passwords.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="max-w-6xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="text-violet-600 font-semibold uppercase tracking-widest">

            FAQ

          </span>

          <h2 className="text-5xl font-black mt-5">

            Frequently Asked Questions

          </h2>

        </div>

        <div className="space-y-6 mt-20">

          {[
            {
              q: "Is Matchora free to use?",
              a: "Yes. Matchora is currently free for all users.",
            },
            {
              q: "Which job platform is currently supported?",
              a: "At the moment Matchora focuses on LinkedIn job opportunities.",
            },
            {
              q: "Is my resume secure?",
              a: "Yes. Your resume is stored securely and is only used for resume analysis and recommendations.",
            },
            {
              q: "Who is Matchora built for?",
              a: "Students, fresh graduates and software engineers looking for tech opportunities.",
            },
          ].map((faq) => (

            <div
              key={faq.q}
              className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8"
            >

              <h3 className="font-bold text-xl">

                {faq.q}

              </h3>

              <p className="text-neutral-500 mt-4 leading-8">

                {faq.a}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="max-w-6xl mx-auto px-8 pb-24">

        <div className="rounded-[40px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-16 text-center">

          <h2 className="text-5xl font-black leading-tight">

            Ready To Discover
            <br />
            Your Next Tech Job?

          </h2>

          <p className="text-violet-100 text-lg mt-8 max-w-2xl mx-auto leading-8">

            Join Matchora today and start discovering
            LinkedIn software engineering opportunities,
            improve your resume and organize your
            complete job search.

          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-white text-violet-700 font-semibold rounded-2xl px-8 py-4 mt-10 hover:scale-105 transition"
          >

            Start Matching

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-neutral-200">

        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>

            <h2 className="text-2xl font-black">

              Match
              <span className="text-violet-600">
                ora
              </span>

            </h2>

            <p className="text-neutral-500 mt-2">

              AI Powered Career Platform
              For Software Engineers.

            </p>

          </div>

          <div className="flex gap-8 text-sm">

            <Link
              to="/"
              className="hover:text-violet-600"
            >
              Home
            </Link>

            <Link
              to="/privacy"
              className="hover:text-violet-600"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="hover:text-violet-600"
            >
              Terms
            </Link>

          </div>

          <p className="text-sm text-neutral-400">

            © {new Date().getFullYear()} Matchora.
            All rights reserved.

          </p>

        </div>

      </footer>

    </div>
  );
}