"use client";
import { useEffect, useState } from "react";
import { sections } from "../../data/portfolio";

/** Collapsible desktop sidebar (≥1440px) with scroll progress and active section. */
export default function SectionRail() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Read the saved preference after mount (deferred one frame to avoid a cascading render).
    const id = requestAnimationFrame(() => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("v4-rail"); } catch { /* storage unavailable */ }
      if (saved === "closed" || (!saved && window.innerWidth < 1600)) setOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
      let cur = "top";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    setOpen((v) => {
      try { localStorage.setItem("v4-rail", v ? "closed" : "open"); } catch { /* ignore */ }
      return !v;
    });
  };

  return (
    <aside aria-label="Section navigation" className="no-print fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1440px]:block">
      <div className="v4-glass flex flex-col items-start gap-1 !rounded-2xl p-2">
        <button type="button" onClick={toggle} aria-expanded={open} aria-label={open ? "Collapse section sidebar" : "Expand section sidebar"} className="grid h-9 w-9 place-items-center rounded-lg text-[var(--dim)] hover:bg-white/5 hover:text-white">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ transform: open ? "none" : "rotate(180deg)" }}><path d="M15 18 9 12l6-6" /></svg>
        </button>
        <div className="relative flex">
          <span aria-hidden="true" className="absolute left-[17px] top-2 bottom-2 w-px bg-[var(--line)]" />
          <span aria-hidden="true" className="absolute left-[17px] top-2 w-px bg-[var(--gold)]" style={{ height: `calc(${progress * 100}% - 16px)` }} />
          <ul className="relative grid">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} className="group flex h-9 items-center gap-3 rounded-lg pr-3 text-[12.5px] text-[var(--muted)] hover:text-white">
                  <span className="grid w-9 place-items-center"><span className={`h-2 w-2 rounded-full transition-all ${active === s.id ? "scale-125 bg-[var(--gold)] shadow-[0_0_10px_var(--gold)]" : "bg-[var(--dim)] group-hover:bg-white"}`} /></span>
                  {open ? <span className={active === s.id ? "text-white" : ""}>{s.label}</span> : <span className="sr-only">{s.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
