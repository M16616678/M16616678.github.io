import type { Metadata } from "next";
import Link from "next/link";
import "../v4.css";
import SiteHeader from "../Components/v4/SiteHeader";
import { SiteFooter } from "../Components/v4/HomeSections";
import ProjectVisual from "../Components/v4/ProjectVisual";
import TiltCard from "../Components/v4/TiltCard";
import { categories, projects } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Case studies | Adi Narayana Manga",
  description: "Engineering case studies: state-government finance, healthcare software, AI evaluation, academic and independent projects.",
};

export default function CaseStudiesIndex() {
  const groups = categories.filter((c) => c !== "All").map((c) => ({ c, items: projects.filter((p) => p.category === c) }));
  return (
    <div className="v4">
      <div className="v4-ambient" aria-hidden="true"><div className="v4-grid-bg" /></div>
      <SiteHeader />
      <main id="main" className="v4-wrap relative z-[1] pb-20 pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--dim)]"><Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span> Case studies</nav>
        <p className="v4-kicker mt-8">Evidence-driven</p>
        <h1 className="v4-h2">Engineering <em>case studies</em></h1>
        <p className="v4-lead">Each study covers the problem, my actual responsibilities, an illustrative architecture, the stack, testing and what can honestly be claimed as an outcome. Public-safe summaries only.</p>
        <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
          {groups.map((g) => <a key={g.c} href={`#${g.c.toLowerCase().replace(/\s+/g, "-")}`} className="v4-chip">{g.c} <span className="text-[var(--dim)]">{g.items.length}</span></a>)}
        </nav>
        {groups.map((g) => (
          <section key={g.c} id={g.c.toLowerCase().replace(/\s+/g, "-")} className="mt-14 scroll-mt-24" aria-labelledby={`g-${g.c}`}>
            <h2 id={`g-${g.c}`} className="text-xl font-semibold tracking-tight">{g.c}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {g.items.map((p) => (
                <TiltCard key={p.slug} accent={p.accent} className="p-4">
                  <Link href={`/case-studies/${p.slug}/`} className="layer block">
                    <ProjectVisual project={p} />
                    <span className="mt-4 block text-[12px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>{p.evidence} · {p.period}</span>
                    <span className="mt-1.5 block text-lg font-semibold">{p.name}</span>
                    <span className="block text-sm text-[var(--muted)]">{p.org}</span>
                    <span className="mt-3 block text-[14px] leading-6 text-[#c9d2df]">{p.summary}</span>
                    <span className="mt-4 inline-flex text-sm font-medium" style={{ color: "var(--accent)" }}>Read case study →</span>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
