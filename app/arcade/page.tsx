import type { Metadata } from "next";
import Link from "next/link";
import "../v4.css";
import SiteHeader from "../Components/v4/SiteHeader";
import { SiteFooter } from "../Components/v4/HomeSections";
import HeroCabinet from "../Components/HeroCabinet";
import DashboardPortfolio from "../Components/DashboardPortfolio";
import EditBay from "../Components/EditBay";

export const metadata: Metadata = {
  title: "Arcade · 16 browser games | Adi Narayana Manga",
  description: "Sixteen browser-playable TypeScript and Canvas 2D games with Web Audio synthesis, touch input and a level editor.",
};

export default function ArcadePage() {
  return (
    <div className="v4">
      <div className="v4-ambient" aria-hidden="true"><div className="v4-grid-bg" /></div>
      <SiteHeader />
      <main id="main" className="relative z-[1]">
        <section className="v4-wrap pb-6 pt-10 sm:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--dim)]"><Link href="/" className="hover:text-white">Home</Link> <span aria-hidden="true">/</span> Arcade</nav>
          <p className="v4-kicker mt-6">Independent engineering</p>
          <h1 className="v4-h2">The <em>Arcade</em></h1>
          <p className="v4-lead">
            Sixteen games running on one shared TypeScript / Canvas 2D engine, adapted from Solar2D / Lua game concepts. These browser builds are not a native Solar2D runtime. Sound is synthesized live with the Web Audio API, and every game supports mouse and touch.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <a href="#cabinet" className="v4-chip">Featured cabinet</a>
            <a href="#library" className="v4-chip">Game library (16)</a>
            <a href="#editbay" className="v4-chip">Edit bay</a>
            <Link href="/case-studies/arcade/" className="v4-chip">How it&apos;s built ↗</Link>
          </div>
          <div className="v4-glass mt-6 grid gap-3 p-4 text-[13.5px] text-[var(--muted)] sm:grid-cols-3">
            <p><strong className="text-[var(--text)]">Controls:</strong> move the pointer or drag on touch screens. Tap or click to act.</p>
            <p><strong className="text-[var(--text)]">Audio:</strong> starts after your first interaction, as browsers require.</p>
            <p><strong className="text-[var(--text)]">Level editor:</strong> open any game in the library, then use the editor tools in the modal.</p>
          </div>
        </section>

        <div className="v4-wrap flex flex-col gap-16 py-8">
          <section id="cabinet" className="flex scroll-mt-24 flex-col gap-4" aria-labelledby="cabinet-title">
            <h2 id="cabinet-title" className="text-xl font-semibold tracking-tight sm:text-2xl">Star Catcher cabinet</h2>
            <p className="text-sm text-[var(--muted)]">Press start to collect falling stars and dodge meteors, or watch the autopilot run in attract mode.</p>
            <HeroCabinet />
          </section>

          <section id="library" className="flex scroll-mt-24 flex-col gap-4 border-t border-white/10 pt-12" aria-labelledby="library-title">
            <h2 id="library-title" className="text-xl font-semibold tracking-tight sm:text-2xl">Game library</h2>
            <p className="text-sm text-[var(--muted)]">All 16 builds with live canvas runners, tunable parameters and development notes.</p>
            <DashboardPortfolio />
          </section>

          <section id="editbay" className="flex scroll-mt-24 flex-col gap-4 border-t border-white/10 pt-12">
            <EditBay />
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
