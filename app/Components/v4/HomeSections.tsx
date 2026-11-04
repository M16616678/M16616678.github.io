"use client";
import Link from "next/link";
import { useState } from "react";
import { games, getProject, profile, projects, roleViews, skillGroups, type RoleView } from "../../data/portfolio";

export function ArcadeShowcase() {
  return (
    <section id="arcade" className="v4-section" aria-labelledby="arcade-title">
      <div className="v4-wrap">
        <div className="v4-glass relative overflow-hidden p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,188,115,.25),transparent_65%)]" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="v4-kicker">Independent engineering</p>
              <h2 id="arcade-title" className="v4-h2">Sixteen games, <em>one engine</em></h2>
              <p className="v4-lead">Browser-playable TypeScript and Canvas 2D games adapted from Solar2D / Lua game concepts. A shared canvas runner, Web Audio synthesis, touch and mouse input, and a level editor.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/arcade/" className="v4-btn v4-btn-primary">Play the arcade <span aria-hidden="true">→</span></Link>
                <Link href="/case-studies/arcade/" className="v4-btn v4-btn-ghost">How it&apos;s built</Link>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Games in the arcade">
              {games.map((g, i) => (
                <li key={g}>
                  <Link href="/arcade/#library" className="group flex h-full min-h-[64px] flex-col justify-between rounded-xl border border-[var(--line)] bg-[#060a13]/70 p-3 transition-colors hover:border-[var(--line-strong)]">
                    <span className="v4-mono text-[10px] text-[var(--dim)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] font-medium group-hover:text-[var(--gold-2)]">{g}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecruiterPanel() {
  const [role, setRole] = useState<RoleView>("backend");
  const view = roleViews.find((r) => r.id === role)!;
  const matches = projects.filter((p) => p.roles.includes(role));
  return (
    <section id="recruiters" className="v4-section" aria-labelledby="rec-title">
      <div className="v4-wrap">
        <p className="v4-kicker">For recruiters & hiring teams</p>
        <h2 id="rec-title" className="v4-h2">The short <em>version</em></h2>
        <p className="v4-lead">{profile.summary}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="v4-glass self-start p-5 sm:p-7 lg:sticky lg:top-24">
            <p className="text-sm text-[var(--muted)]">Pick the role you&apos;re hiring for:</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Role view">
              {roleViews.map((r) => <button key={r.id} type="button" className="v4-chip" aria-pressed={role === r.id} onClick={() => setRole(r.id)}>{r.label}</button>)}
            </div>
            <p className="mt-6 text-lg leading-8" aria-live="polite">{view.pitch}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Evidence ({matches.length})</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {matches.map((p) => (
                <li key={p.slug}>
                  <Link href={`/case-studies/${p.slug}/`} className="flex min-h-[56px] items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[#060a13]/60 px-4 py-3 hover:border-[var(--line-strong)]">
                    <span><span className="block text-sm font-medium">{p.name}</span><span className="block text-[12px] text-[var(--dim)]">{p.evidence}</span></span>
                    <span aria-hidden="true" className="text-[var(--gold)]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="v4-glass p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Skills, grouped by where they were used</p>
            <div className="mt-4 grid gap-5">
              {skillGroups.map((g) => (
                <div key={g.name}>
                  <p className="text-sm font-semibold">{g.name}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{g.skills.map((s) => <span key={s} className="v4-tag">{s}</span>)}</div>
                  <p className="mt-1.5 text-[12px] text-[var(--dim)]">Used in: {g.evidence.map((e) => getProject(e)?.name).filter(Boolean).join(", ")}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[var(--line)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Education</p>
              <ul className="mt-2 grid gap-1.5 text-sm">
                <li><strong>M.S. Information Technology</strong>, University of Cincinnati, 2024 to 2025 · GPA 3.97 / 4.0</li>
                <li><strong>B.Tech, Electrical & Electronics Engineering</strong>, Vignan University, 2017 to 2020</li>
                <li><strong>Diploma, Electrical & Electronics Engineering</strong>, 2014 to 2017</li>
              </ul>
              <Link href="/resume/" className="v4-btn v4-btn-primary mt-5 w-full sm:w-auto">Open printable résumé</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <section id="contact" className="v4-section !pb-16" aria-labelledby="contact-title">
      <div className="v4-wrap">
        <div className="v4-glass relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[min(700px,90%)] rounded-full bg-[radial-gradient(ellipse,rgba(232,188,115,.22),transparent_65%)]" />
          <p className="v4-kicker justify-center">Contact</p>
          <h2 id="contact-title" className="v4-h2 mx-auto max-w-2xl">Let&apos;s build something <em>reliable</em>.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">Open to software engineering, backend, full-stack and technical AI evaluation roles. Based in {profile.location}.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="v4-btn v4-btn-primary">Email me</a>
            <button type="button" onClick={copy} className="v4-btn v4-btn-ghost" aria-live="polite">{copied ? "Copied ✓" : profile.email}</button>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="v4-btn v4-btn-ghost">LinkedIn</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="v4-btn v4-btn-ghost">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-[var(--line)]">
      <div className="v4-wrap flex flex-col gap-4 py-8 text-[13px] text-[var(--dim)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. Public-safe content only: no employer source, patient data or client AI material.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          <Link href="/case-studies/" className="hover:text-white">Case studies</Link>
          <Link href="/arcade/" className="hover:text-white">Arcade</Link>
          <Link href="/resume/" className="hover:text-white">Résumé</Link>
          <a href="https://github.com/M16616678/M16616678.github.io" target="_blank" rel="noreferrer" className="hover:text-white">Source</a>
        </nav>
      </div>
    </footer>
  );
}
