import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  BadgeCheck,
  FileText,
  Target,
  TrendingUp,
  Send,
  Search,
  CheckCircle2,
  Briefcase,

} from "lucide-react";

import { GoogleLogin } from "@react-oauth/google";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

const features = [
  {
    icon: Target,
    title: "Find Jobs That Fit You",
    desc: "AI recommends jobs based on your resume and skills.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "ATS score, missing keywords and improvement suggestions.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Track Applications",
    desc: "Monitor every application from one dashboard.",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function Login() {

  const { user, loading } = useAuth();


  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">

      {/* NAVBAR */}

      <header className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg">

            <Sparkles className="text-white" size={22} />

          </div>

          <div>

            <h2 className="font-bold text-2xl">

              Match
              <span className="text-violet-600">
                ora
              </span>

            </h2>

            <p className="text-xs text-neutral-500">
              AI Powered Job Search
            </p>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-5 py-2 text-sm font-semibold">

            <Sparkles size={16} />

            Hello Buddy

          </span>

          <h1 className="text-6xl font-black mt-8 leading-tight text-neutral-900">

            Stop Searching.

            <br />

            Start

            <span className="text-violet-600">
              {" "}Matching.
            </span>

          </h1>

          <p className="text-neutral-500 text-lg mt-8 leading-8 max-w-xl">

            Matchora analyzes your resume, recommends
            personalized jobs, tracks applications,
            and helps you get hired faster.

          </p>

          <div className="flex gap-4 mt-10">

            <button
            onClick={() => {
              document
                .getElementById("login-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="rounded-2xl bg-violet-600 hover:bg-violet-700 transition px-8 py-4 text-white font-semibold flex items-center gap-2">

              Get Started

              <ArrowRight size={18} />

            </button>

            <Link
              to="/aboutMatchora"
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                border
                border-neutral-200
                bg-white
                px-8
                py-4
                font-semibold
                text-neutral-900
                shadow-sm
                hover:bg-violet-50
                hover:border-violet-600
                hover:text-violet-600
                transition-all
                duration-300
              "
            >
              About Matchora
            </Link>

          </div>

          <div className="grid gap-5 mt-14">

            {features.map((item) => (

              <div
                key={item.title}
                className="bg-white rounded-3xl shadow-sm border border-neutral-100 p-6 flex gap-5 hover:shadow-lg transition"
              >

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color}`}>

                  <item.icon size={28} />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    {item.title}

                  </h3>

                  <p className="text-neutral-500 mt-2">

                    {item.desc}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="bg-white rounded-[40px] border border-neutral-200 shadow-2xl p-10">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-neutral-500">

                  Resume Score

                </p>

                <h2 className="text-5xl font-black mt-2">

                  92%

                </h2>

              </div>

              <div className="w-24 h-24 rounded-full border-[10px] border-violet-600 border-r-violet-200 border-b-violet-200" />

            </div>

            <div className="mt-10">

              <h4 className="font-semibold">

                Top Skills

              </h4>

              <div className="flex flex-wrap gap-3 mt-5">

                {[
                  "React",
                  "Node.js",
                  "MongoDB",
                  "Express",
                  "JavaScript",
                ].map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-violet-100 text-violet-700 px-4 py-2 text-sm font-medium"
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

                    <Briefcase className="text-violet-600" />

                  </div>

                  <div>

                    <h4 className="font-bold">

                      MERN Developer

                    </h4>

                    <p className="text-sm text-neutral-500">

                      Google • Bengaluru

                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-semibold">

                  95% Match

                </span>

              </div>

            </div>            {/* Google Login Card */}

            <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

              <div className="text-center">

                <div className="w-16 h-16 rounded-2xl bg-violet-600 mx-auto flex items-center justify-center">

                  <Sparkles className="text-white" size={28} />

                </div>

                <h3 className="text-2xl font-bold mt-5">
                  Welcome to Matchora
                </h3>

                <p className="text-neutral-500 mt-2">
                  Continue with your Google account
                </p>

              </div>

              <div className="mt-8 flex justify-center">

                <GoogleLogin
                  onSuccess={async (credentialResponse) => {

                    const res = await fetch(
                      `${API_URL}/api/auth/google`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                          token: credentialResponse.credential,
                        }),
                      }
                    );

                    if (res.ok) {
                      window.location.href = "/dashboard";
                    }
                  }}
                  onError={() => console.log("Google Login Failed")}
                />

              </div>

              <p className="text-center text-xs text-neutral-400 mt-6">
                Secure Google Sign-In
              </p>

            </div>

          </div>

          {/* Floating Cards */}

          <div className="absolute -top-8 -left-10 bg-white rounded-2xl shadow-xl border border-neutral-100 p-5 w-60">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

                <CheckCircle2
                  className="text-emerald-600"
                  size={24}
                />

              </div>

              <div>

                <h4 className="font-semibold">
                  Resume Approved
                </h4>

                <p className="text-xs text-neutral-500">
                  ATS Friendly
                </p>

              </div>

            </div>

          </div>

          <div className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-xl border border-neutral-100 p-5 w-60">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                <Search
                  className="text-blue-600"
                  size={22}
                />

              </div>

              <div>

                <h4 className="font-semibold">
                  2,340 Jobs Found
                </h4>

                <p className="text-xs text-neutral-500">
                  Based on your resume
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <span className="text-violet-600 font-semibold">
            HOW IT WORKS
          </span>

          <h2 className="text-4xl font-black mt-4">
            Your Journey To The Perfect Job
          </h2>

          <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
            Matchora automates your job search from resume
            analysis to application tracking.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">

            <FileText
              className="text-violet-600"
              size={40}
            />

            <h3 className="font-bold text-xl mt-6">
              Upload Resume
            </h3>

            <p className="text-neutral-500 mt-3">
              Upload your latest resume securely.
            </p>

          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">

            <TrendingUp
              className="text-emerald-600"
              size={40}
            />

            <h3 className="font-bold text-xl mt-6">
              AI Analysis
            </h3>

            <p className="text-neutral-500 mt-3">
              Get ATS score and improvement suggestions.
            </p>

          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">

            <Target
              className="text-orange-500"
              size={40}
            />

            <h3 className="font-bold text-xl mt-6">
              Find Jobs
            </h3>

            <p className="text-neutral-500 mt-3">
              Personalized recommendations updated daily.
            </p>

          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">

            <Send
              className="text-blue-600"
              size={40}
            />

            <h3 className="font-bold text-xl mt-6">
              Apply Faster
            </h3>

            <p className="text-neutral-500 mt-3">
              Track applications from one dashboard.
            </p>

          </div>

        </div>

      </section>      {/* TRUST SECTION */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="rounded-[40px] bg-violet-600 text-white p-12">

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="flex gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                <ShieldCheck size={28} />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Secure Google Sign In
                </h3>

                <p className="text-violet-100 mt-2 leading-7">
                  We use Google's secure authentication.
                  Your password is never stored.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                <Lock size={28} />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Privacy First
                </h3>

                <p className="text-violet-100 mt-2 leading-7">
                  Your resume and personal information
                  always remain private.
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                <BadgeCheck size={28} />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Trusted Platform
                </h3>

                <p className="text-violet-100 mt-2 leading-7">
                  Built for students, freshers and
                  experienced professionals.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-8 pb-24">

        <div className="rounded-[40px] bg-gradient-to-r from-violet-600 to-purple-500 text-white p-14 text-center shadow-xl">

          <h2 className="text-5xl font-black leading-tight">

            Ready To Find
            <br />
            Your Dream Job?

          </h2>

          <p className="mt-6 text-violet-100 text-lg">

            Upload your resume,
            discover personalized opportunities,
            and track every application in one place.

          </p>

          <div id="login-section" className="mt-10 flex justify-center">

            <GoogleLogin
              onSuccess={async (credentialResponse) => {

                const res = await fetch(
                  `${API_URL}/api/auth/google`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      token: credentialResponse.credential,
                    }),
                  }
                );

                if (res.ok) {
                  window.location.href = "/dashboard";
                }

              }}
              onError={() => console.log("Google Login Failed")}
            />

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-neutral-200">

        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-violet-600 flex items-center justify-center">

              <Sparkles
                className="text-white"
                size={20}
              />

            </div>

            <div>

              <h3 className="font-bold text-xl">

                Match
                <span className="text-violet-600">
                  ora
                </span>

              </h3>

              <p className="text-sm text-neutral-500">

                AI Powered Job Search

              </p>

            </div>

          </div>

          <div className="flex gap-8 text-sm text-neutral-500">

            <a
              href="/privacy"
              className="hover:text-violet-600 transition"
            >
              Terms
            </a>

            <a
              href="/privacy"
              className="hover:text-violet-600 transition"
            >
              Privacy
            </a>

            <a
              href="/aboutMatchora"
              className="hover:text-violet-600 transition"
            >
              About
            </a>

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