"use client";
import { useState, type CSSProperties } from "react";
import {
  agentTrace, codeTask, comparisonTask, failureTaxonomy, MIN_CORRECTNESS, PASS_SCORE, reasoningTask, rubric, verdict, weightedScore, type FailureId,
} from "../../data/evaluation";

const tabs = ["Code review", "Compare responses", "Reasoning", "Agent trace"] as const;
type Tab = (typeof tabs)[number];

function FailureTags({ ids }: { ids: FailureId[] }) {
  if (!ids.length) return <span className="v4-tag !border-[color-mix(in_srgb,var(--ok)_45%,transparent)] !text-[var(--ok)]">No failures found</span>;
  return (
    <>
      {ids.map((id) => {
        const f = failureTaxonomy.find((x) => x.id === id)!;
        return <span key={id} title={f.desc} className="v4-tag !border-[color-mix(in_srgb,var(--bad)_45%,transparent)] !text-[var(--bad)]">{f.label}</span>;
      })}
    </>
  );
}

export default function AIStudio() {
  const [tab, setTab] = useState<Tab>("Code review");
  return (
    <section id="ai-studio" className="v4-section" aria-labelledby="studio-title">
      <div className="v4-wrap">
        <p className="v4-kicker" style={{ color: "var(--violet)" }}>Interactive demonstration</p>
        <h2 id="studio-title" className="v4-h2">AI Evaluation <em style={{ color: "#d6c6ff" }}>Studio</em></h2>
        <p className="v4-lead">How I approach evaluating model output, shown on original synthetic examples. Nothing here is client data, a proprietary rubric, or a benchmark of any real model.</p>

        <div className="v4-glass mt-8 overflow-hidden">
          <div role="tablist" aria-label="Evaluation demos" className="flex gap-1 overflow-x-auto border-b border-[var(--line)] p-2">
            {tabs.map((t) => (
              <button key={t} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls="studio-panel" onClick={() => setTab(t)}
                className={`min-h-[44px] whitespace-nowrap rounded-xl px-4 text-sm font-medium transition-colors ${tab === t ? "bg-[rgba(186,154,255,.14)] text-[#e3d8ff]" : "text-[var(--muted)] hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>
          <div id="studio-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="p-4 sm:p-7">
            {tab === "Code review" && <CodeReview />}
            {tab === "Compare responses" && <Compare />}
            {tab === "Reasoning" && <Reasoning />}
            {tab === "Agent trace" && <Trace />}
          </div>
        </div>

        <details className="mt-5 text-sm text-[var(--muted)]">
          <summary className="cursor-pointer select-none text-[var(--text)]">Failure classification used in these demos</summary>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {failureTaxonomy.map((f) => <li key={f.id} className="v4-glass p-3"><strong className="text-[var(--text)]">{f.label}</strong><span className="block text-[13px]">{f.desc}</span></li>)}
          </ul>
        </details>
      </div>
    </section>
  );
}

function CodeReview() {
  const [ratings, setRatings] = useState<number[]>([4, 4, 3, 4]);
  const [showFix, setShowFix] = useState(false);
  const score = weightedScore(ratings);
  const v = verdict(ratings);
  const pass = v === "Pass";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Prompt</p>
        <p className="mt-1.5 text-[15px]">{codeTask.prompt}</p>
        <pre className="v4-code v4-mono mt-4"><code>{codeTask.code}</code></pre>
        <table className="mt-4 w-full text-left text-[13px]">
          <caption className="sr-only">Test results</caption>
          <thead className="text-[var(--dim)]"><tr><th className="py-2 font-medium">Input</th><th className="font-medium">Expected</th><th className="font-medium">Actual</th><th className="font-medium">Result</th></tr></thead>
          <tbody className="v4-mono">
            {codeTask.tests.map((t) => (
              <tr key={t.input} className="border-t border-[var(--line)]">
                <td className="py-2">{t.input}</td><td>{t.expected}</td><td className={t.pass ? "" : "text-[var(--bad)]"}>{t.actual}</td>
                <td className={t.pass ? "text-[var(--ok)]" : "text-[var(--bad)]"}>{t.pass ? "pass" : "fail"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 rounded-xl border border-[color-mix(in_srgb,var(--bad)_35%,transparent)] bg-[rgba(255,138,138,.06)] p-3 text-[13.5px] leading-6 text-[#f3caca]"><strong>Finding:</strong> {codeTask.finding}</p>
        <div className="mt-3 flex flex-wrap gap-1.5"><FailureTags ids={codeTask.failures} /></div>
        <button type="button" className="v4-btn v4-btn-ghost mt-4 text-[13px]" aria-expanded={showFix} onClick={() => setShowFix((s) => !s)}>{showFix ? "Hide" : "Show"} corrected version</button>
        {showFix && <pre className="v4-code v4-mono mt-3"><code>{codeTask.fix}</code></pre>}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Score it yourself (1 to 5)</p>
        <div className="mt-3 grid gap-5">
          {rubric.map((d, i) => (
            <label key={d.id} className="block">
              <span className="flex items-baseline justify-between gap-3 text-sm">
                <span>{d.name} <span className="text-[var(--dim)]">· {d.weight}%</span></span>
                <span className="v4-mono text-[var(--violet)]" data-testid={`rating-${d.id}`}>{ratings[i]} / 5</span>
              </span>
              <input type="range" min={1} max={5} step={1} value={ratings[i]} className="v4-range mt-2.5"
                style={{ "--fill": `${((ratings[i] - 1) / 4) * 100}%` } as CSSProperties}
                aria-describedby={`guide-${d.id}`}
                onChange={(e) => setRatings((r) => r.map((x, j) => (j === i ? Number(e.target.value) : x)))} />
              <span id={`guide-${d.id}`} className="mt-1.5 block text-[12px] text-[var(--dim)]">{d.guide}</span>
            </label>
          ))}
        </div>
        <div className={`mt-6 rounded-2xl border p-5 ${pass ? "border-[color-mix(in_srgb,var(--ok)_40%,transparent)] bg-[rgba(94,224,160,.06)]" : "border-[color-mix(in_srgb,var(--bad)_40%,transparent)] bg-[rgba(255,138,138,.06)]"}`} aria-live="polite">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--dim)]">Weighted score</p>
              <p className="text-4xl font-semibold tracking-tight" data-testid="weighted-score">{score}<span className="text-lg text-[var(--dim)]"> / 100</span></p>
            </div>
            <p className={`text-right text-sm font-semibold ${pass ? "text-[var(--ok)]" : "text-[var(--bad)]"}`} data-testid="verdict">{v}</p>
          </div>
          <p className="mt-3 text-[12.5px] leading-5 text-[var(--muted)]">Pass rule: score ≥ {PASS_SCORE} and correctness ≥ {MIN_CORRECTNESS}. Correctness is a hard gate because a polished answer that is wrong is still wrong.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="v4-btn v4-btn-ghost !min-h-[40px] text-[13px]" onClick={() => setRatings(codeTask.suggested)}>Apply my evaluation</button>
            <button type="button" className="v4-btn v4-btn-ghost !min-h-[40px] text-[13px]" onClick={() => setRatings([4, 4, 3, 4])}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Compare() {
  const [pick, setPick] = useState<"A" | "B" | null>(null);
  const [a, b] = comparisonTask.responses;
  const sa = weightedScore(a.ratings), sb = weightedScore(b.ratings);
  const better = sa >= sb ? "A" : "B";
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Prompt</p>
      <p className="mt-1.5 text-[15px]">{comparisonTask.prompt}</p>
      <p className="mt-4 text-sm text-[var(--muted)]">Which response would you prefer? Pick one, then see the scored breakdown.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {comparisonTask.responses.map((r) => (
          <div key={r.id} className={`rounded-2xl border p-5 transition-colors ${pick === r.id ? "border-[color-mix(in_srgb,var(--violet)_60%,transparent)] bg-[rgba(186,154,255,.06)]" : "border-[var(--line)] bg-[#060a13]/60"}`}>
            <div className="flex items-center justify-between">
              <strong>Response {r.id}</strong>
              <button type="button" className="v4-chip" aria-pressed={pick === r.id} onClick={() => setPick(r.id)}>Prefer {r.id}</button>
            </div>
            <p className="mt-3 text-[14.5px] leading-7 text-[#cdd6e3]">{r.text}</p>
            {pick && (
              <div className="mt-4 border-t border-[var(--line)] pt-4">
                <p className="text-sm">Score: <span className="v4-mono text-[var(--violet)]">{weightedScore(r.ratings)} / 100</span> · <span className={verdict(r.ratings) === "Pass" ? "text-[var(--ok)]" : "text-[var(--bad)]"}>{verdict(r.ratings)}</span></p>
                <ul className="mt-2 grid gap-1.5 text-[13px] text-[var(--muted)]">{r.notes.map((n) => <li key={n}>• {n}</li>)}</ul>
                <div className="mt-3 flex flex-wrap gap-1.5"><FailureTags ids={r.failures} /></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {pick && (
        <p className="mt-5 text-sm" aria-live="polite">
          {pick === better ? "Matches my evaluation." : "Different from my evaluation."} Response {better} is preferred: it explains the actual mechanism, while Response {better === "A" ? "B" : "A"} contains a factual error and unsupported advice, which outweighs any style points.
        </p>
      )}
    </div>
  );
}

function Reasoning() {
  const [revealed, setRevealed] = useState(0);
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Prompt</p>
      <p className="mt-1.5 text-[15px]">{reasoningTask.prompt}</p>
      <p className="mt-4 text-sm text-[var(--muted)]">Step through the model&apos;s chain of reasoning. A correct final answer is not enough; each step has to follow.</p>
      <ol className="mt-4 grid gap-3">
        {reasoningTask.steps.map((s, i) => {
          const shown = i < revealed;
          return (
            <li key={i} className={`rounded-xl border p-4 ${shown ? (s.ok ? "border-[color-mix(in_srgb,var(--ok)_35%,transparent)]" : "border-[color-mix(in_srgb,var(--bad)_45%,transparent)] bg-[rgba(255,138,138,.05)]") : "border-[var(--line)]"}`}>
              <div className="flex items-start gap-3">
                <span className="v4-mono mt-0.5 text-xs text-[var(--dim)]">{i + 1}</span>
                <div className="flex-1">
                  <p className="v4-mono text-[13.5px]">{s.text}</p>
                  {shown && <p className={`mt-2 text-[13px] ${s.ok ? "text-[var(--ok)]" : "text-[var(--bad)]"}`}>{s.ok ? "✓" : "✗"} {s.note}</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="v4-btn v4-btn-ghost text-[13px]" disabled={revealed >= reasoningTask.steps.length} onClick={() => setRevealed((r) => r + 1)}>
          {revealed === 0 ? "Check first step" : revealed >= reasoningTask.steps.length ? "All steps checked" : "Check next step"}
        </button>
        <button type="button" className="v4-btn v4-btn-ghost text-[13px]" onClick={() => setRevealed(0)}>Reset</button>
      </div>
      {revealed >= reasoningTask.steps.length && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm" aria-live="polite">
          <span>Correct: <span className="v4-mono text-[var(--ok)]">{reasoningTask.correct}</span></span>
          <FailureTags ids={reasoningTask.failures} />
        </div>
      )}
    </div>
  );
}

function Trace() {
  const [showDx, setShowDx] = useState(false);
  const color = { ok: "var(--ok)", warn: "var(--warn)", fail: "var(--bad)" } as const;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">Agent goal</p>
      <p className="mt-1.5 text-[15px]">{agentTrace.goal}</p>
      <ol className="relative mt-6 grid gap-0 border-l border-[var(--line)] pl-6">
        {agentTrace.steps.map((s, i) => (
          <li key={i} className="relative pb-5">
            <span aria-hidden="true" className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 bg-[var(--bg)]" style={{ borderColor: showDx ? color[s.status] : "var(--dim)" }} />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--dim)]">{s.kind}</p>
            <p className="v4-mono text-[13.5px]" style={{ color: s.kind === "tool" ? "var(--violet)" : undefined }}>{s.label}</p>
            <p className="mt-1 text-[13.5px] leading-6 text-[#cdd6e3]">{s.body}</p>
            {showDx && <span className="mt-1 inline-block text-[12px]" style={{ color: color[s.status] }}>{s.status === "ok" ? "✓ correct" : "✗ faulty"}</span>}
          </li>
        ))}
      </ol>
      <button type="button" className="v4-btn v4-btn-ghost text-[13px]" aria-expanded={showDx} onClick={() => setShowDx((v) => !v)}>{showDx ? "Hide diagnosis" : "Diagnose the trace"}</button>
      {showDx && (
        <div className="mt-4 rounded-xl border border-[color-mix(in_srgb,var(--bad)_35%,transparent)] bg-[rgba(255,138,138,.05)] p-4 text-[13.5px] leading-6" aria-live="polite">
          <p>{agentTrace.diagnosis}</p>
          <div className="mt-3 flex flex-wrap gap-1.5"><FailureTags ids={agentTrace.failures} /></div>
        </div>
      )}
    </div>
  );
}
