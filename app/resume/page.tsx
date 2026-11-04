import type { Metadata } from "next";
import Link from "next/link";
import "../v4.css";
import PrintButton from "../Components/v4/PrintButton";
import { profile, projects, skillGroups, timeline } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Résumé | Adi Narayana Manga",
  description: "Printable résumé generated from the same verified data as the portfolio.",
};

export default function ResumePage() {
  const jobs = timeline.filter((t) => t.kind === "Employment" || t.kind === "Contract").reverse();
  const edu = timeline.filter((t) => t.kind === "Education").reverse();
  const picks = ["ibrace", "cfms", "ai-evaluation", "comfit", "arcade", "careerconnect"].map((s) => projects.find((p) => p.slug === s)!);
  return (
    <div className="v4 resume-page">
      <style>{`
        .resume-sheet{background:#fbfaf7;color:#16181d;border-radius:18px;box-shadow:0 40px 80px -40px rgba(0,0,0,.8)}
        .resume-sheet h2{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#8a6420;font-weight:700;border-bottom:1px solid #e3ddd0;padding-bottom:6px;margin-top:22px}
        .resume-sheet a{color:#16181d;text-decoration:underline;text-underline-offset:2px}
        @media print{@page{margin:14mm}.resume-page{background:#fff!important}.resume-sheet{box-shadow:none;border-radius:0;padding:0!important}.resume-wrap{padding:0!important;max-width:none!important}}
      `}</style>
      <div className="no-print v4-wrap flex flex-wrap items-center justify-between gap-3 py-6">
        <Link href="/" className="v4-btn v4-btn-ghost">← Back to portfolio</Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-[var(--dim)] sm:inline">Uses your browser&apos;s Save as PDF</span>
          <PrintButton />
        </div>
      </div>
      <main className="resume-wrap mx-auto max-w-[860px] px-4 pb-16">
        <article className="resume-sheet p-7 text-[13.5px] leading-6 sm:p-12">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
            <p className="mt-1 text-[15px] text-[#4a4f5a]">{profile.title}</p>
            <p className="mt-2 text-[12.5px] text-[#4a4f5a]">
              {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href={profile.phoneHref}>{profile.phone}</a> · <a href={profile.links.linkedin}>LinkedIn</a> · <a href={profile.links.github}>GitHub</a> · <a href={profile.links.site}>m16616678.github.io</a>
            </p>
          </header>
          <h2>Summary</h2>
          <p className="mt-2">{profile.summary}</p>
          <h2>Experience</h2>
          {jobs.map((j) => (
            <section key={j.id} className="mt-3 break-inside-avoid">
              <div className="flex flex-wrap justify-between gap-x-4"><strong>{j.title} · {j.org}</strong><span className="text-[#4a4f5a]">{j.period}</span></div>
              {j.place && <p className="text-[12px] text-[#6b7180]">{j.place}</p>}
              <ul className="mt-1 list-disc pl-5">{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </section>
          ))}
          <h2>Selected projects</h2>
          {picks.map((p) => (
            <p key={p.slug} className="mt-2 break-inside-avoid"><strong>{p.name}</strong> <span className="text-[#6b7180]">({p.org}, {p.period})</span>: {p.summary}</p>
          ))}
          <h2>Education</h2>
          {edu.map((e) => (
            <div key={e.id} className="mt-2 flex flex-wrap justify-between gap-x-4">
              <span><strong>{e.title}</strong>, {e.org}{e.id === "uc" ? " · GPA 3.97 / 4.0" : ""}</span>
              <span className="text-[#4a4f5a]">{e.period}</span>
            </div>
          ))}
          <h2>Skills</h2>
          <dl className="mt-2 grid gap-1">
            {skillGroups.map((g) => <div key={g.name} className="flex gap-2"><dt className="w-36 shrink-0 font-semibold">{g.name}</dt><dd>{g.skills.join(", ")}</dd></div>)}
          </dl>
        </article>
      </main>
    </div>
  );
}
