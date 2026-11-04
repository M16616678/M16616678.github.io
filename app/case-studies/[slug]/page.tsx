import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../v4.css";
import SiteHeader from "../../Components/v4/SiteHeader";
import { SiteFooter } from "../../Components/v4/HomeSections";
import ArchitectureDiagram from "../../Components/v4/ArchitectureDiagram";
import ProjectVisual from "../../Components/v4/ProjectVisual";
import { accentHex, getProject, projects } from "../../data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: `${p.name} · Case study | Adi Narayana Manga`, description: p.summary } : {};
}

const toc = [
  ["overview", "Overview"], ["problem", "Problem"], ["role", "My responsibilities"], ["architecture", "Architecture"],
  ["stack", "Technology"], ["method", "Methodology"], ["implementation", "Implementation"], ["challenges", "Challenges"],
  ["testing", "Testing"], ["outcomes", "Outcomes & evidence"], ["lessons", "Lessons"], ["related", "Related"],
] as const;

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--line)] py-9 first:border-t-0 first:pt-0" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      <div className="mt-4 text-[15.5px] leading-8 text-[#c9d2df]">{children}</div>
    </section>
  );
}

function List({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) return <p className="text-[var(--dim)]">{empty}</p>;
  return (
    <ul className="grid gap-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />{i}</li>
      ))}
    </ul>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const related = p.related.map(getProject).filter((x): x is NonNullable<typeof x> => !!x);
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="v4" style={{ "--accent": accentHex[p.accent] } as React.CSSProperties}>
      <div className="v4-ambient" aria-hidden="true"><div className="v4-grid-bg" /></div>
      <SiteHeader />
      <main id="main" className="v4-wrap relative z-[1] pb-20 pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--dim)]">
          <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span>{" "}
          <Link href="/case-studies/" className="hover:text-white">Case studies</Link> <span aria-hidden="true">/</span> {p.name}
        </nav>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="v4-kicker" style={{ color: "var(--accent)" }}>{p.category} · {p.period}</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.035em]">{p.name}</h1>
            <p className="mt-2 text-lg text-[var(--muted)]">{p.org}</p>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[#cdd6e3]">{p.summary}</p>
          </div>
          <div>
            <ProjectVisual project={p} tall />
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="v4-glass p-3.5"><dt className="text-[12px] text-[var(--dim)]">Evidence level</dt><dd className="mt-1 font-medium">{p.evidence}</dd></div>
              <div className="v4-glass p-3.5"><dt className="text-[12px] text-[var(--dim)]">Status</dt><dd className="mt-1 font-medium">{p.status}</dd></div>
            </dl>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--dim)]">On this page</p>
              <ul className="mt-3 grid gap-1 border-l border-[var(--line)]">
                {toc.map(([id, label]) => <li key={id}><a href={`#${id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13.5px] text-[var(--muted)] hover:border-[var(--accent)] hover:text-white">{label}</a></li>)}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0">
            <Block id="overview" title="Project overview">
              <p>{p.summary}</p>
              <p className="mt-4 rounded-xl border border-[var(--line)] bg-[#060a13]/60 p-4 text-[14px] text-[var(--muted)]"><strong className="text-[var(--text)]">Confidentiality:</strong> {p.confidentiality}</p>
            </Block>
            <Block id="problem" title="The problem"><p>{p.problem}</p></Block>
            <Block id="role" title="My actual responsibilities"><List items={p.responsibilities} empty="Not documented yet." /></Block>
            <Block id="architecture" title="System architecture">
              <p className="mb-5 text-[var(--muted)]">Hover, click or Tab through the components.</p>
              <ArchitectureDiagram diagram={p.diagram} accent={p.accent} />
            </Block>
            <Block id="stack" title="Technology stack">
              <ul className="flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="v4-tag !text-[13px]">{s}</li>)}</ul>
            </Block>
            <Block id="method" title="Development methodology"><p>{p.methodology}</p></Block>
            <Block id="implementation" title="Technical implementation"><List items={p.implementation} empty="Implementation notes pending." /></Block>
            <Block id="challenges" title="Challenges and solutions">
              {p.challenges.length ? (
                <div className="grid gap-3">
                  {p.challenges.map((c) => (
                    <div key={c.challenge} className="v4-glass grid gap-2 p-4 sm:grid-cols-2 sm:gap-6">
                      <p><span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--dim)]">Challenge</span>{c.challenge}</p>
                      <p><span className="block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>Response</span>{c.response}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-[var(--dim)]">Not documented yet.</p>}
            </Block>
            <Block id="testing" title="Testing strategy"><List items={p.testing} empty="Test evidence to be added." /></Block>
            <Block id="outcomes" title="Outcomes and evidence">
              <List items={p.outcomes} empty="No outcomes published." />
              <p className="mt-4 text-[13.5px] text-[var(--dim)]">Only verified facts are listed. Screenshots appear only when they are real and approved for publication. Diagrams on this page are illustrative.</p>
            </Block>
            <Block id="lessons" title="Lessons learned"><List items={p.lessons} empty="Reflection to be added." /></Block>
            <Block id="related" title="Links and related projects">
              {p.links.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {p.links.map((l) => l.external
                    ? <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="v4-btn v4-btn-ghost">{l.label} <span aria-hidden="true">↗</span></a>
                    : <Link key={l.href} href={l.href} className="v4-btn v4-btn-ghost">{l.label} <span aria-hidden="true">→</span></Link>)}
                </div>
              )}
              {p.links.length === 0 && <p className="mb-6 text-[var(--dim)]">Source is not public for this project.</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/case-studies/${r.slug}/`} className="v4-glass block p-4 hover:border-[var(--line-strong)]">
                    <span className="text-[12px] uppercase tracking-wider" style={{ color: accentHex[r.accent] }}>{r.category}</span>
                    <span className="mt-1 block font-semibold">{r.name}</span>
                    <span className="block text-[13px] text-[var(--muted)]">{r.org}</span>
                  </Link>
                ))}
              </div>
            </Block>

            <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-[var(--line)] pt-8">
              <Link href="/case-studies/" className="v4-btn v4-btn-ghost">← All case studies</Link>
              <Link href={`/case-studies/${next.slug}/`} className="v4-btn v4-btn-ghost">Next: {next.name} →</Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
