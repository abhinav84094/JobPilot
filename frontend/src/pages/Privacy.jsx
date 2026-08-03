import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Privacy() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">

//       {/* ================= NAVBAR ================= */}

//       <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-100">

//         <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

//           <Link
//             to="/"
//             className="flex items-center gap-3"
//           >

//             <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg">

//               <Sparkles className="text-white" size={22} />

//             </div>

//             <div>

//               <h2 className="font-black text-2xl">

//                 Match
//                 <span className="text-violet-600">

//                   ora

//                 </span>

//               </h2>

//               <p className="text-xs text-neutral-500">

//                 AI Powered Tech Job Search

//               </p>

//             </div>

//           </Link>

//           <Link
//             to="/"
//             className="rounded-2xl border border-neutral-200 px-6 py-3 font-semibold hover:bg-neutral-50 transition"
//           >

//             Back To Home

//           </Link>

//         </div>

//       </header>

//       {/* ================= HERO ================= */}

//       <section className="max-w-7xl mx-auto px-8 py-24">

//         <div className="text-center">

//           <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-700 px-5 py-2 font-semibold">

//             <ShieldCheck size={16} />

//             Privacy Policy

//           </span>

//           <h1 className="text-6xl font-black mt-8">

//             Your Privacy
//             Matters.

//           </h1>

//           <p className="max-w-3xl mx-auto text-lg text-neutral-500 leading-8 mt-8">

//             Matchora is committed to protecting your personal
//             information. This Privacy Policy explains what data
//             we collect, why we collect it, and how we keep it secure.

//           </p>

//           <div className="mt-8 inline-flex rounded-full bg-violet-50 px-6 py-3 text-sm text-violet-700 font-medium">

//             Last Updated: August 2026

//           </div>

//         </div>

//       </section>

//       {/* ================= QUICK SUMMARY ================= */}

//       <section className="max-w-7xl mx-auto px-8 pb-24">

//         <div className="grid lg:grid-cols-4 gap-6">

//           <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">

//             <Lock
//               className="text-violet-600"
//               size={34}
//             />

//             <h3 className="font-bold mt-6">

//               Secure Login

//             </h3>

//             <p className="text-neutral-500 mt-3">

//               Authentication is handled securely
//               using Google OAuth.

//             </p>

//           </div>

//           <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">

//             <Database
//               className="text-blue-600"
//               size={34}
//             />

//             <h3 className="font-bold mt-6">

//               Protected Data

//             </h3>

//             <p className="text-neutral-500 mt-3">

//               Your resume and profile
//               are securely stored.

//             </p>

//           </div>

//           <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">

//             <Eye
//               className="text-emerald-600"
//               size={34}
//             />

//             <h3 className="font-bold mt-6">

//               Never Sold

//             </h3>

//             <p className="text-neutral-500 mt-3">

//               We never sell your
//               personal information.

//             </p>

//           </div>

//           <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8">

//             <ShieldCheck
//               className="text-orange-500"
//               size={34}
//             />

//             <h3 className="font-bold mt-6">

//               Your Control

//             </h3>

//             <p className="text-neutral-500 mt-3">

//               You can request deletion
//               of your account and data.

//             </p>

//           </div>

//         </div>

//       </section>

//       {/* ================= WHAT WE COLLECT ================= */}

//       <section className="max-w-7xl mx-auto px-8 py-20">

//         <div className="flex items-center gap-4">

//           <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

//             <FileText
//               className="text-violet-600"
//             />

//           </div>

//           <div>

//             <h2 className="text-4xl font-black">

//               Information We Collect

//             </h2>

//             <p className="text-neutral-500 mt-2">

//               We only collect information required to provide
//               Matchora's services.

//             </p>

//           </div>

//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 mt-16">

//           <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-10">

//             <h3 className="font-bold text-2xl">

//               Google Account

//             </h3>

//             <ul className="space-y-4 mt-8">

//               <li>• Name</li>

//               <li>• Email Address</li>

//               <li>• Profile Picture</li>

//               <li>• Google Account ID</li>

//             </ul>

//           </div>

//           <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-10">

//             <h3 className="font-bold text-2xl">

//               Resume Information

//             </h3>

//             <ul className="space-y-4 mt-8">

//               <li>• Uploaded Resume</li>

//               <li>• Skills</li>

//               <li>• Experience</li>

//               <li>• Education</li>

//               <li>• ATS Analysis Results</li>

//             </ul>

//           </div>

//         </div>

//       </section>      {/* ================= HOW WE USE YOUR DATA ================= */}

//       <section className="bg-neutral-50 py-24">

//         <div className="max-w-7xl mx-auto px-8">

//           <div className="text-center">

//             <span className="text-violet-600 font-semibold uppercase tracking-widest">

//               Data Usage

//             </span>

//             <h2 className="text-5xl font-black mt-5">

//               How We Use Your Information

//             </h2>

//             <p className="text-neutral-500 text-lg mt-6 max-w-3xl mx-auto">

//               We only use your information to provide and improve
//               Matchora's services.

//             </p>

//           </div>

//           <div className="grid lg:grid-cols-2 gap-8 mt-20">

//             <div className="bg-white rounded-[32px] shadow-sm border border-neutral-100 p-10">

//               <h3 className="font-bold text-2xl">

//                 We Use Your Data To

//               </h3>

//               <div className="space-y-5 mt-8">

//                 {[
//                   "Authenticate your account securely",
//                   "Analyze your uploaded resume",
//                   "Generate ATS insights",
//                   "Recommend matching LinkedIn jobs",
//                   "Track job applications",
//                   "Improve Matchora features",
//                 ].map((item) => (

//                   <div
//                     key={item}
//                     className="flex gap-4 items-center"
//                   >

//                     <ShieldCheck
//                       className="text-emerald-600"
//                       size={18}
//                     />

//                     {item}

//                   </div>

//                 ))}

//               </div>

//             </div>

//             <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[32px] p-10 text-white">

//               <h3 className="text-3xl font-bold">

//                 We Never

//               </h3>

//               <div className="space-y-5 mt-8">

//                 {[
//                   "Sell your personal data",
//                   "Share resumes publicly",
//                   "Post anything to LinkedIn",
//                   "Access your Google password",
//                   "Use your data for advertising",
//                 ].map((item) => (

//                   <div
//                     key={item}
//                     className="flex gap-4 items-center"
//                   >

//                     <CheckCircle2 size={18} />

//                     {item}

//                   </div>

//                 ))}

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* ================= THIRD PARTY SERVICES ================= */}

//       <section className="max-w-7xl mx-auto px-8 py-24">

//         <div>

//           <h2 className="text-4xl font-black">

//             Third-Party Services

//           </h2>

//           <p className="text-neutral-500 mt-5 max-w-3xl leading-8">

//             Matchora relies on trusted third-party providers
//             to deliver authentication, hosting and other
//             essential services.

//           </p>

//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

//           {[
//             {
//               title: "Google OAuth",
//               desc: "Secure authentication.",
//             },
//             {
//               title: "MongoDB",
//               desc: "Database storage.",
//             },
//             {
//               title: "Render",
//               desc: "Backend hosting.",
//             },
//             {
//               title: "Netlify / Vercel",
//               desc: "Frontend hosting.",
//             },
//           ].map((service) => (

//             <div
//               key={service.title}
//               className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8"
//             >

//               <h3 className="font-bold">

//                 {service.title}

//               </h3>

//               <p className="text-neutral-500 mt-3">

//                 {service.desc}

//               </p>

//             </div>

//           ))}

//         </div>

//       </section>

//       {/* ================= COOKIES ================= */}

//       <section className="bg-neutral-50 py-24">

//         <div className="max-w-6xl mx-auto px-8">

//           <h2 className="text-4xl font-black">

//             Cookies

//           </h2>

//           <p className="text-neutral-500 leading-8 mt-8">

//             Matchora uses essential cookies to keep you signed in,
//             maintain secure sessions and improve your experience.
//             These cookies are not used for advertising or selling
//             your personal information.

//           </p>

//         </div>

//       </section>

//       {/* ================= DATA SECURITY ================= */}

//       <section className="max-w-7xl mx-auto px-8 py-24">

//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           <div>

//             <h2 className="text-5xl font-black">

//               Data Security

//             </h2>

//             <p className="text-neutral-500 leading-8 mt-8">

//               Protecting your information is one of our highest
//               priorities. We use secure authentication and
//               industry-standard practices to safeguard your data.

//             </p>

//           </div>

//           <div className="bg-violet-600 rounded-[40px] text-white p-10">

//             <div className="space-y-6">

//               {[
//                 "Encrypted authentication",
//                 "Secure server communication",
//                 "Protected resume storage",
//                 "Limited data access",
//               ].map((item) => (

//                 <div
//                   key={item}
//                   className="flex gap-4 items-center"
//                 >

//                   <CheckCircle2 size={20} />

//                   {item}

//                 </div>

//               ))}

//             </div>

//           </div>

//         </div>

//       </section>      {/* ================= YOUR RIGHTS ================= */}

//       <section className="bg-neutral-50 py-24">

//         <div className="max-w-7xl mx-auto px-8">

//           <div className="text-center">

//             <span className="text-violet-600 font-semibold uppercase tracking-widest">

//               Your Rights

//             </span>

//             <h2 className="text-5xl font-black mt-5">

//               You Are In Control

//             </h2>

//             <p className="text-neutral-500 text-lg mt-6 max-w-3xl mx-auto">

//               We believe you should always have control over your
//               personal information and account.

//             </p>

//           </div>

//           <div className="grid md:grid-cols-2 gap-8 mt-20">

//             {[
//               {
//                 title: "Access Your Data",
//                 desc: "You can access your profile information and resume stored in Matchora.",
//               },
//               {
//                 title: "Update Information",
//                 desc: "You can update your profile or upload a new resume at any time.",
//               },
//               {
//                 title: "Delete Your Account",
//                 desc: "You may request deletion of your account and associated personal data.",
//               },
//               {
//                 title: "Contact Us",
//                 desc: "If you have questions about your privacy, we're here to help.",
//               },
//             ].map((item) => (

//               <div
//                 key={item.title}
//                 className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-10"
//               >

//                 <ShieldCheck
//                   className="text-violet-600"
//                   size={34}
//                 />

//                 <h3 className="font-bold text-2xl mt-8">

//                   {item.title}

//                 </h3>

//                 <p className="text-neutral-500 leading-8 mt-5">

//                   {item.desc}

//                 </p>

//               </div>

//             ))}

//           </div>

//         </div>

//       </section>

//       {/* ================= POLICY UPDATES ================= */}

//       <section className="max-w-6xl mx-auto px-8 py-24">

//         <div className="bg-white rounded-[40px] border border-neutral-100 shadow-sm p-12">

//           <h2 className="text-4xl font-black">

//             Changes To This Privacy Policy

//           </h2>

//           <p className="text-neutral-500 leading-8 mt-8">

//             Matchora may update this Privacy Policy as our
//             platform evolves. Whenever significant changes are
//             made, we will update the "Last Updated" date on this
//             page. Continued use of Matchora after changes means
//             you accept the revised policy.

//           </p>

//         </div>

//       </section>

//       {/* ================= CONTACT ================= */}

//       <section className="max-w-6xl mx-auto px-8 pb-24">

//         <div className="rounded-[40px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-16 text-center">

//           <h2 className="text-5xl font-black">

//             Questions About Privacy?

//           </h2>

//           <p className="text-violet-100 text-lg leading-8 mt-8 max-w-2xl mx-auto">

//             If you have any questions, concerns or requests
//             regarding this Privacy Policy or your personal data,
//             please contact us.

//           </p>

//           <div className="mt-10">

//             <a
//               href="mailto:support@matchora.com"
//               className="inline-flex items-center gap-3 bg-white text-violet-700 rounded-2xl px-8 py-4 font-semibold hover:scale-105 transition"
//             >

//               Contact Support

//               <ArrowRight size={18} />

//             </a>

//           </div>

//         </div>

//       </section>

//       {/* ================= FOOTER ================= */}

//       <footer className="border-t border-neutral-200">

//         <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col lg:flex-row justify-between items-center gap-6">

//           <div>

//             <h2 className="text-2xl font-black">

//               Match
//               <span className="text-violet-600">
//                 ora
//               </span>

//             </h2>

//             <p className="text-neutral-500 mt-2">

//               AI Powered Career Platform
//               For Software Engineers.

//             </p>

//           </div>

//           <div className="flex gap-8 text-sm">

//             <Link
//               to="/"
//               className="hover:text-violet-600"
//             >
//               Home
//             </Link>

//             <Link
//               to="/aboutMatchora"
//               className="hover:text-violet-600"
//             >
//               About
//             </Link>

//             <Link
//               to="/terms"
//               className="hover:text-violet-600"
//             >
//               Terms
//             </Link>

//           </div>

//           <p className="text-sm text-neutral-400">

//             © {new Date().getFullYear()} Matchora.
//             All rights reserved.

//           </p>

//         </div>

//       </footer>

//     </div>
//   );



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
    <p className="text-xs text-neutral-400 text-center mt-8 leading-relaxed">
  By continuing, you agree to Matchora's terms of use and privacy practices.
</p>

</div>
)

}