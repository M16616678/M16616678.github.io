"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, projects, roleViews, type Category, type Project, type RoleView } from "../../data/portfolio";
import ProjectVisual from "./ProjectVisual";
import TiltCard from "./TiltCard";

export default function ProjectGallery() {
  const [cat, setCat] = useState<"All" | Category>("All");
  const [role, setRole] = useState<RoleView | "all">("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return projects.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (role === "all" || p.roles.includes(role)) &&
        (!needle || [p.name, p.org, p.summary, p.category, ...p.stack].join(" ").toLowerCase().includes(needle)),
    );
  }, [cat, role, q]);

  const reset = () => { setCat("All"); setRole("all"); setQ(""); };

  return (
    <section id="projects" className="v4-section" aria-labelledby="projects-title">
      <div className="v4-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="v4-kicker">Selected work</p>
            <h2 id="projects-title" className="v4-h2">Projects with <em>substance</em></h2>
            <p className="v4-lead">Every card says what kind of evidence backs it: professional, contract, academic or independent. Click a technology tag to filter by it.</p>
          </div>
          <Link href="/case-studies/" className="v4-btn v4-btn-ghost">All case studies <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="v4-glass mt-8 grid gap-4 p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search projects</span>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--dim)]"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, org or technology" className="h-11 w-full rounded-xl border border-[var(--line)] bg-[#060a13] pl-10 pr-3 text-[15px] outline-none placeholder:text-[var(--dim)] focus:border-[var(--line-strong)]" />
            </label>
            <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <span className="whitespace-nowrap">Hiring for</span>
              <select value={role} onChange={(e) => setRole(e.target.value as RoleView | "all")} className="h-11 rounded-xl border border-[var(--line)] bg-[#060a13] px-3 text-[15px] text-[var(--text)] outline-none focus:border-[var(--line-strong)]">
                <option value="all">Any role</option>
                {roleViews.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            </label>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} type="button" className="v4-chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-[var(--dim)]" data-testid="project-count">
          {shown.length} {shown.length === 1 ? "project" : "projects"}
          {(cat !== "All" || role !== "all" || q) && <button type="button" onClick={reset} className="ml-3 text-[var(--gold)] underline-offset-4 hover:underline">Clear filters</button>}
        </p>

        <div className="mt-4 grid grid-flow-dense gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => <ProjectCard key={p.slug} p={p} onTag={(t) => setQ(t)} />)}
        </div>
        {shown.length === 0 && (
          <div className="v4-glass mt-4 p-10 text-center text-[var(--muted)]">No projects match. <button type="button" onClick={reset} className="text-[var(--gold)] underline">Reset filters</button></div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ p, onTag }: { p: Project; onTag: (t: string) => void }) {
  const [open, setOpen] = useState(false);
  const wide = p.featured;
  return (
    <TiltCard accent={p.accent} wrapperClassName={wide ? "md:col-span-2 xl:col-span-2" : ""} className="flex min-w-0 flex-col p-4 sm:p-5">
      <article className="layer flex flex-1 flex-col" aria-labelledby={`card-${p.slug}`}>
        <ProjectVisual project={p} tall={wide} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[12px]">
          <span className="font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>{p.category}</span>
          <span className="v4-mono text-[var(--dim)]">{p.period}</span>
        </div>
        <h3 id={`card-${p.slug}`} className="mt-2 text-xl font-semibold tracking-tight">{p.name}</h3>
        <p className="text-sm text-[var(--muted)]">{p.org}</p>
        <p className="mt-3 text-[14.5px] leading-7 text-[#c9d2df]">{p.summary}</p>
        <p className="mt-3 inline-flex items-center gap-2 self-start rounded-lg border border-[var(--line)] px-2.5 py-1 text-[11.5px] text-[var(--muted)]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          {p.evidence}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.stack.slice(0, wide ? 8 : 5).map((t) => (
            <li key={t}><button type="button" onClick={() => onTag(t)} className="v4-tag hover:border-[color-mix(in_srgb,var(--accent)_60%,transparent)] hover:text-white" title={`Filter projects by ${t}`}>{t}</button></li>
          ))}
        </ul>

        {open && (
          <div id={`details-${p.slug}`} className="mt-4 rounded-xl border border-[var(--line)] bg-[#060a13]/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">What I did</p>
            <ul className="mt-2 grid gap-2">
              {p.responsibilities.map((r) => (
                <li key={r} className="flex gap-2.5 text-[13.5px] leading-6 text-[#cdd6e3]"><span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />{r}</li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-[var(--dim)]">Status: {p.status}</p>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={`details-${p.slug}`} className="v4-btn v4-btn-ghost flex-1 !min-h-[44px] text-[13px]">
            {open ? "Hide details" : "Technical details"}
          </button>
          <Link href={`/case-studies/${p.slug}/`} className="v4-btn flex-1 !min-h-[44px] border text-[13px]" style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, transparent)", color: "var(--accent)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}>
            Case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </TiltCard>
  );
}
