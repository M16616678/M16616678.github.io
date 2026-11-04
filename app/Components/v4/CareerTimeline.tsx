"use client";
import Link from "next/link";
import { useState } from "react";
import { getProject, timeline, type TimelineKind } from "../../data/portfolio";

const kindStyle: Record<TimelineKind, string> = {
  Education: "text-[var(--blue)] border-[color-mix(in_srgb,var(--blue)_40%,transparent)]",
  Employment: "text-[var(--gold)] border-[var(--line-strong)]",
  Contract: "text-[var(--violet)] border-[color-mix(in_srgb,var(--violet)_40%,transparent)]",
  Independent: "text-[var(--cyan)] border-[color-mix(in_srgb,var(--cyan)_40%,transparent)]",
};

export default function CareerTimeline() {
  const [active, setActive] = useState("tcs");
  const [filter, setFilter] = useState<"All" | TimelineKind>("All");
  const items = timeline.filter((t) => filter === "All" || t.kind === filter);
  const current = timeline.find((t) => t.id === active) ?? timeline[0];

  return (
    <section id="career" className="v4-section" aria-labelledby="career-title">
      <div className="v4-wrap">
        <p className="v4-kicker">Career & education</p>
        <h2 id="career-title" className="v4-h2">A verified <em>progression</em></h2>
        <p className="v4-lead">From electrical engineering in India to enterprise Java at TCS, a master&apos;s in Cincinnati and healthcare software today. Employment, education and contract work are labelled separately.</p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter timeline">
          {(["All", "Employment", "Education", "Contract", "Independent"] as const).map((k) => (
            <button key={k} type="button" className="v4-chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>{k}</button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <ol className="grid">
            {items.map((t) => (
              <li key={t.id} className="v4-tl-item" data-active={t.id === active}>
                <span className="v4-tl-dot" aria-hidden="true" />
                <button type="button" onClick={() => setActive(t.id)} aria-expanded={t.id === active} aria-controls="tl-detail"
                  className={`my-1 w-full rounded-2xl border px-4 py-3.5 text-left transition-colors ${t.id === active ? "border-[var(--line-strong)] bg-[rgba(232,188,115,.06)]" : "border-transparent hover:bg-white/[.03]"}`}>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${kindStyle[t.kind]}`}>{t.kind}</span>
                    <span className="v4-mono text-[12px] text-[var(--dim)]">{t.period}</span>
                  </span>
                  <span className="mt-1.5 block font-semibold">{t.title}</span>
                  <span className="block text-sm text-[var(--muted)]">{t.org}</span>
                </button>
                {t.id === active && (
                  <div className="mb-3 rounded-2xl border border-[var(--line)] bg-[#060a13]/60 p-4 lg:hidden">
                    <p className="text-[14px] leading-7 text-[var(--muted)]">{t.body}</p>
                    <ul className="mt-2 grid gap-1.5 text-[13.5px] text-[#cdd6e3]">{t.points.map((pt) => <li key={pt}>• {pt}</li>)}</ul>
                    {t.projects.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {t.projects.map((slug) => <Link key={slug} href={`/case-studies/${slug}/`} className="v4-chip">{getProject(slug)?.name} ↗</Link>)}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div id="tl-detail" className="v4-glass hidden self-start p-6 lg:block sm:p-8 lg:sticky lg:top-24" aria-live="polite">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${kindStyle[current.kind]}`}>{current.kind}</span>
              <span className="v4-mono text-[12px] text-[var(--dim)]">{current.period}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{current.title}</h3>
            <p className="mt-1 text-[var(--gold-2)]">{current.org}</p>
            {current.place && <p className="text-sm text-[var(--dim)]">{current.place}</p>}
            <p className="mt-5 leading-7 text-[var(--muted)]">{current.body}</p>
            <ul className="mt-5 grid gap-2.5">
              {current.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-sm text-[#cdd6e3]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  {pt}
                </li>
              ))}
            </ul>
            {current.projects.length > 0 && (
              <div className="mt-6 border-t border-[var(--line)] pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Related case studies</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {current.projects.map((slug) => {
                    const p = getProject(slug);
                    return p ? (
                      <Link key={slug} href={`/case-studies/${slug}/`} className="v4-chip">{p.name} <span aria-hidden="true">↗</span></Link>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
