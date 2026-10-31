"use client";

import React, { useMemo, useState } from "react";

type Track = "All" | "Industry" | "Academic" | "AI & Evaluation" | "Engineering";
type CaseStudy = {
  id: string;
  title: string;
  organization: string;
  era: string;
  track: Exclude<Track, "All">;
  summary: string;
  contributions: string[];
  stack: string[];
  evidence?: { label: string; href: string };
  status?: string;
};

const filters: Track[] = ["All", "Industry", "Academic", "AI & Evaluation", "Engineering"];

const caseStudies: CaseStudy[] = [
  {
    id: "ibrace",
    title: "IBrace — Scoliosis Care Software Ecosystem",
    organization: "Innovision LLC",
    era: "2026",
    track: "Industry",
    summary: "Healthcare software work spanning clinician and patient portals, orthotic case management, design review and integration planning. Details are intentionally limited to a public-safe overview.",
    contributions: ["React/Next.js interface work and Python/FastAPI service development", "Architecture for user roles, case workflows and 3D design-file review", "Testing and cross-functional implementation considerations"],
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "3D visualization"],
    status: "Professional work · public overview"
  },
  {
    id: "cfms",
    title: "CFMS 2.0 — Enterprise Financial Systems",
    organization: "Tata Consultancy Services",
    era: "2020–2024",
    track: "Industry",
    summary: "Enterprise development on financial operations workflows, including Payee, Treasury and E-billing modules.",
    contributions: ["Java/Spring APIs and enterprise application maintenance", "Batch processing, database and JasperReports reporting workflows", "Functional/performance testing and delivery automation"],
    stack: ["Java", "Spring", "SQL", "JasperReports", "JMeter", "Jenkins"],
    status: "Professional work · non-confidential summary"
  },
  {
    id: "ai-evaluation",
    title: "AI Response & Code Evaluation",
    organization: "Handshake AI · Mercor · Appen CrowdGen · Outlier",
    era: "Contract work",
    track: "AI & Evaluation",
    summary: "Professional AI evaluation experience across four platforms. Specific assignments, client instructions and proprietary evaluation material are not reproduced here.",
    contributions: ["Reviewing technical responses against task requirements and quality criteria", "Assessing accuracy, instruction-following and reasoning when relevant to the assignment", "Documenting findings with clear evidence and consistent judgments"],
    stack: ["AI evaluation", "Code review", "Reasoning", "Quality assurance"],
    status: "Professional experience · task details private"
  },
  {
    id: "eval-lab",
    title: "Public AI Evaluation Workbench",
    organization: "Independent demonstration",
    era: "2026",
    track: "AI & Evaluation",
    summary: "A public, original rubric-scoring demonstration built to illustrate how technical response quality can be evaluated. It is not a reproduction of a platform assignment.",
    contributions: ["Adjust weighted scores for technical correctness and requirements", "Inspect a synthetic code-response scenario", "Compare the outcome against a transparent acceptance threshold"],
    stack: ["TypeScript", "React", "Evaluation rubrics", "Testing"],
    status: "Live demonstration"
  },
  {
    id: "careerconnect",
    title: "CareerConnect — Student Career Experience",
    organization: "University of Cincinnati · HCI",
    era: "Master's coursework",
    track: "Academic",
    summary: "Human-computer interaction concept for simplifying internship and job discovery, career support and mentorship.",
    contributions: ["User personas and task-analysis scenarios", "Job search and application user journeys", "Usability goals and proposed evaluation plan"],
    stack: ["HCI", "User research", "UX design", "Usability testing"],
    status: "Academic concept · design/evaluation"
  },
  {
    id: "hospital",
    title: "Hospital Check-in System",
    organization: "Independent / academic software",
    era: "Repository project",
    track: "Academic",
    summary: "A Java-based hospital check-in software repository. Public case-study details will be expanded as features and implementation evidence are verified.",
    contributions: ["Version-controlled application source", "Opportunity for documented user flows and automated tests"],
    stack: ["Java", "Software architecture", "Testing"],
    evidence: { label: "Explore source", href: "https://github.com/M16616678/Hospital-Check-in-System" },
    status: "Repository available · details being documented"
  },
  {
    id: "automation",
    title: "AI Automation & Orchestration Stack",
    organization: "Open-source adaptation / exploration",
    era: "Recent work",
    track: "AI & Evaluation",
    summary: "Exploration of an automation stack with n8n, Docker-based orchestration, and AI tooling. The public repository contains upstream open-source material; original contributions must be credited separately.",
    contributions: ["Workflow orchestration and integration exploration", "Documentation and containerized deployment configurations", "Clear distinction between upstream work and personal additions"],
    stack: ["n8n", "Docker", "Python", "APIs"],
    evidence: { label: "Review repository", href: "https://github.com/M16616678/n8n-workflows" },
    status: "Open-source-based work"
  },
  {
    id: "home",
    title: "Advanced Home Automation Control System",
    organization: "Vignan University · Bachelor's project",
    era: "2019–2020",
    track: "Engineering",
    summary: "Final-year electrical and electronics engineering project exploring device control and home energy management with microcontrollers and wireless communication.",
    contributions: ["Arduino-based device-control concept and implementation", "Bluetooth-based control interface", "Python-supported automation logic"],
    stack: ["Arduino", "Python", "Bluetooth", "Embedded systems"],
    status: "Bachelor's project"
  },
  {
    id: "arcade",
    title: "16-Game Interactive Arcade & Level Designer",
    organization: "Independent software engineering",
    era: "2024–2026",
    track: "Engineering",
    summary: "Interactive browser-playable game collection adapted from original game-engine concepts, with reusable canvas runners, sound synthesis and level-editing controls.",
    contributions: ["TypeScript canvas game engine implementations", "Touch/mouse input and interactive game states", "Web Audio effects, a level painter and double-buffered rendering"],
    stack: ["TypeScript", "React", "Canvas 2D", "Web Audio", "PWA"],
    evidence: { label: "Play the arcade", href: "#library" },
    status: "Live on this site"
  }
];

const milestones = [
  { date: "2019–2020", name: "B.E./B.Tech · Electrical & Electronics Engineering", description: "Vignan University · home automation final-year project" },
  { date: "2020–2024", name: "Software Engineer · Tata Consultancy Services", description: "Enterprise financial services, backend development, reporting and delivery" },
  { date: "2024 onward", name: "M.S. Information Technology · University of Cincinnati", description: "Advanced computing, web development, HCI and academic projects" },
  { date: "2026 onward", name: "Software Engineering · Innovision LLC", description: "Healthcare applications, backend systems and 3D-related workflows" },
  { date: "Recent contract work", name: "Professional AI Evaluation", description: "Handshake AI · Mercor · Appen CrowdGen · Outlier" },
  { date: "Continuing", name: "Independent Software & AI Projects", description: "Game engines, open-source exploration, automation and public demonstrations" }
];

const evaluationCriteria = [
  { name: "Correctness", hint: "Does the solution compute the right outcome?", weight: 40 },
  { name: "Requirements", hint: "Does it meet the stated input/output contract?", weight: 25 },
  { name: "Edge cases", hint: "Does it handle empty or invalid input?", weight: 20 },
  { name: "Clarity", hint: "Can another developer understand and maintain it?", weight: 15 }
] as const;

export default function CareerAtlas() {
  const [track, setTrack] = useState<Track>("All");
  const [expanded, setExpanded] = useState<string | null>("ibrace");
  const [scores, setScores] = useState<number[]>([4, 4, 2, 5]);
  const [showLab, setShowLab] = useState(false);

  const filtered = useMemo(() => caseStudies.filter(item => track === "All" || item.track === track), [track]);
  const weightedScore = evaluationCriteria.reduce((sum, criterion, index) => sum + (scores[index] / 5) * criterion.weight, 0);
  const pass = weightedScore >= 80 && scores[0] >= 4;
  const changeScore = (index: number, nextValue: number) => {
    setScores(previous => previous.map((value, position) => position === index ? nextValue : value));
  };

  return (
    <div className="flex flex-col gap-12">
      <section id="career" aria-labelledby="career-title" className="scroll-mt-24 flex flex-col gap-6 border-t border-white/10 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#E5A93B]">The full story · from engineering to AI</p>
            <h2 id="career-title" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">Career & Education Timeline</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">A chronological view of my education, enterprise engineering, healthcare software, AI evaluation and independent builds.</p>
          </div>
          <a href="#projects" className="rounded-lg border border-[#E5A93B]/40 px-4 py-2 text-xs font-bold text-[#E5A93B] hover:bg-[#E5A93B]/10">Explore case studies ↓</a>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {milestones.map((item, index) => (
            <div key={item.name} className="relative flex gap-4 rounded-xl border border-white/10 bg-[#0c1020]/80 p-5">
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5A93B]/30 bg-[#E5A93B]/10 font-mono text-xs font-black text-[#E5A93B]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#E5A93B]">{item.date}</p>
                <h3 className="mt-1 text-sm font-bold text-white">{item.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Project timelines, exact contract dates and graduation details are documented conservatively where source records differ.</p>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 flex flex-col gap-6 border-t border-white/10 pt-12">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#E5A93B]">Portfolio archive · verifiable contributions</p>
          <h2 id="projects-title" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">Projects & Case Studies</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">Select a discipline to explore what I built, contributed to or studied. Professional work is summarized without proprietary source code or client information.</p>
        </div>
        <div role="group" aria-label="Filter case studies by discipline" className="flex flex-wrap gap-2">
          {filters.map(option => (
            <button key={option} type="button" onClick={() => setTrack(option)}
              aria-pressed={track === option}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5A93B] ${track === option ? "border-[#E5A93B] bg-[#E5A93B] text-[#050507]" : "border-white/15 bg-white/[.03] text-slate-300 hover:border-[#E5A93B]/50"}`}>{option}</button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(item => (
            <article key={item.id} className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[#111525] to-[#090c15] p-5 transition-colors hover:border-[#E5A93B]/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#E5A93B]">{item.track}</span>
                <span className="font-mono text-[10px] text-slate-500">{item.era}</span>
              </div>
              <h3 className="mt-3 text-base font-bold leading-snug text-white">{item.title}</h3>
              <p className="mt-1 text-xs font-medium text-slate-400">{item.organization}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{item.stack.map(tag => <span key={tag} className="rounded-md border border-white/10 bg-white/[.04] px-2 py-1 text-[10px] text-slate-300">{tag}</span>)}</div>
              <div className="mt-4 border-t border-white/10 pt-3">
                <button type="button" aria-expanded={expanded === item.id} aria-controls={`case-${item.id}`}
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between gap-2 py-1 text-left text-xs font-bold text-[#E5A93B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E5A93B]">
                  <span>{expanded === item.id ? "Hide" : "View"} contributions</span><span aria-hidden="true">{expanded === item.id ? "−" : "+"}</span>
                </button>
                {expanded === item.id && <div id={`case-${item.id}`} className="mt-3">
                  <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-slate-300">{item.contributions.map(entry => <li key={entry}>{entry}</li>)}</ul>
                  <p className="mt-3 text-[11px] italic text-slate-500">{item.status}</p>
                  {item.evidence && <a className="mt-3 inline-flex text-xs font-bold text-[#E5A93B] underline underline-offset-4 hover:text-[#ffcf80]" href={item.evidence.href} target={item.evidence.href.startsWith("#") ? undefined : "_blank"} rel={item.evidence.href.startsWith("#") ? undefined : "noopener noreferrer"}>{item.evidence.label} ↗</a>}
                  {item.id === "eval-lab" && <button type="button" onClick={() => {setShowLab(true); document.getElementById("evaluation-lab")?.scrollIntoView({behavior:"smooth"});}} className="mt-3 block text-xs font-bold text-[#E5A93B] underline underline-offset-4">Open evaluation workbench ↓</button>}
                </div>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="evaluation-lab" aria-labelledby="evaluation-title" className="scroll-mt-24 rounded-2xl border border-[#E5A93B]/25 bg-[#0d111d] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#E5A93B]">Public AI evaluation lab</p>
            <h2 id="evaluation-title" className="mt-2 text-2xl font-black text-white">Explore a Scoring Rubric</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">An original example of structured technical-response evaluation. This is a demonstration, not a confidential task or official rubric from any contract platform.</p>
          </div>
          <button type="button" onClick={() => setShowLab(!showLab)} aria-expanded={showLab} aria-controls="lab-panel" className="rounded-lg bg-[#E5A93B] px-4 py-2 text-xs font-black text-[#08090b] hover:bg-[#ffc266]">{showLab ? "Close example" : "Try interactive demo"}</button>
        </div>
        {showLab && <div id="lab-panel" className="mt-6 grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#E5A93B]">Synthetic code-review task</p>
            <p className="mt-2 text-sm text-slate-300">Write a TypeScript function that returns the arithmetic mean of an array. For an empty array, return <code className="text-white">null</code>.</p>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#05080f] p-4 font-mono text-xs leading-6 text-slate-200"><code>{`function mean(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0)
    / nums.length;
}`}</code></pre>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">Review note: works for non-empty arrays but returns <code>NaN</code> for an empty array. The evaluator should flag the missed requirement rather than judging style alone.</p>
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white">Adjust the evaluation scores</h3>
              <span aria-live="polite" className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${pass ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>{Math.round(weightedScore)} / 100 · {pass ? "Pass" : "Needs revision"}</span>
            </div>
            <div className="mt-4 space-y-5">
              {evaluationCriteria.map((criterion, index) => (
                <label key={criterion.name} className="block">
                  <span className="flex items-center justify-between gap-3 text-xs font-bold text-white"><span>{criterion.name} <span className="font-normal text-slate-500">({criterion.weight}%)</span></span><span className="font-mono text-[#E5A93B]">{scores[index]}/5</span></span>
                  <span className="mt-1 block text-xs text-slate-500">{criterion.hint}</span>
                  <input className="mt-2 w-full accent-[#E5A93B]" type="range" min="0" max="5" step="1" value={scores[index]} onChange={event => changeScore(index, Number(event.target.value))} />
                </label>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-white/10 bg-white/[.03] p-3 text-xs leading-relaxed text-slate-400">Illustrative policy: weighted score ≥80 and correctness ≥4/5 for a pass. The sample intentionally starts below threshold to highlight the missing empty-array case.</div>
            <button type="button" className="mt-3 text-xs font-bold text-[#E5A93B] underline underline-offset-4" onClick={() => setScores([4,4,2,5])}>Reset example scores</button>
          </div>
        </div>}
      </section>
    </div>
  );
}
