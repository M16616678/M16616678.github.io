"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects, sections, profile } from "../../data/portfolio";

type Item = { label: string; hint: string; href: string };

export default function SiteHeader({ home = false }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);
  const base = home ? "" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator
  useEffect(() => {
    if (!home) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [home]);

  // Ctrl/Cmd + K opens project search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drawer: escape closes, body scroll locked while open
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const navSections = sections.filter((s) => s.id !== "top");

  return (
    <>
      <header className="v4-header" data-scrolled={scrolled}>
        <div className="v4-wrap flex h-16 items-center justify-between gap-4">
          <Link href={home ? "#top" : "/"} className="flex items-center gap-3" aria-label={`${profile.name}, home`}>
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--line-strong)] bg-[rgba(232,188,115,.08)] font-serif text-base font-semibold italic text-[var(--gold-2)]">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="block text-[11px] text-[var(--dim)]">{profile.shortTitle}</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {navSections.map((s) => (
              <a key={s.id} href={`${base}#${s.id}`} className="v4-navlink" aria-current={home && active === s.id ? "true" : undefined}>
                {s.label}
              </a>
            ))}
            <Link href="/case-studies/" className="v4-navlink">Case studies</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPalette(true)} className="v4-btn v4-btn-ghost !min-h-[40px] !px-3 text-[13px] text-[var(--muted)]" aria-label="Search" aria-keyshortcuts="Control+K Meta+K">
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <span className="hidden md:inline">Search</span>
              <kbd className="v4-mono hidden rounded border border-[var(--line)] px-1.5 text-[10px] md:inline">⌘K</kbd>
            </button>
            <Link href="/resume/" className="v4-btn v4-btn-primary hidden !min-h-[40px] sm:inline-flex">Résumé</Link>
            <button type="button" className="v4-btn v4-btn-ghost !min-h-[44px] !px-3 lg:hidden" aria-label="Open navigation menu" aria-expanded={drawer} aria-controls="v4-drawer" onClick={() => setDrawer(true)}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </header>

      {drawer && (
        <div className="v4-drawer" onClick={() => setDrawer(false)}>
          <nav id="v4-drawer" aria-label="Mobile" className="v4-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold">Navigate</span>
              <button type="button" className="v4-btn v4-btn-ghost !min-h-[44px] !px-3" onClick={() => setDrawer(false)} aria-label="Close navigation menu" autoFocus>✕</button>
            </div>
            <ul className="grid gap-1">
              {navSections.map((s) => (
                <li key={s.id}>
                  <a href={`${base}#${s.id}`} onClick={() => setDrawer(false)} className="flex min-h-[48px] items-center rounded-xl px-3 text-[15px] text-[var(--muted)] hover:bg-white/5 hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
              <li><Link href="/case-studies/" className="flex min-h-[48px] items-center rounded-xl px-3 text-[15px] text-[var(--muted)] hover:bg-white/5 hover:text-white">Case studies</Link></li>
              <li><Link href="/arcade/" className="flex min-h-[48px] items-center rounded-xl px-3 text-[15px] text-[var(--muted)] hover:bg-white/5 hover:text-white">Play the arcade</Link></li>
            </ul>
            <Link href="/resume/" className="v4-btn v4-btn-primary mt-6 w-full">Résumé</Link>
          </nav>
        </div>
      )}

      {palette && <CommandPalette onClose={() => setPalette(false)} base={base} />}
    </>
  );
}

function CommandPalette({ onClose, base }: { onClose: () => void; base: string }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const all: Item[] = useMemo(
    () => [
      ...projects.map((p) => ({ label: p.name, hint: `${p.category} · ${p.org}`, href: `/case-studies/${p.slug}/` })),
      ...sections.map((s) => ({ label: s.label, hint: "Section", href: `${base}#${s.id}` })),
      { label: "Play the arcade", hint: "16 games", href: "/arcade/" },
      { label: "Printable résumé", hint: "Page", href: "/resume/" },
    ],
    [base],
  );
  const results = all.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q.toLowerCase().trim())).slice(0, 10);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.activeElement as HTMLElement | null;
    return () => prev?.focus();
  }, []);

  const go = (href: string) => {
    onClose();
    window.location.href = href;
  };

  return (
    <div className="v4-dialog" role="dialog" aria-modal="true" aria-label="Search projects and sections" onClick={onClose}>
      <div className="v4-glass v4-dialog-panel !bg-[#0b111d]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--dim)]"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
              if (e.key === "Enter" && results[idx]) go(results[idx].href);
            }}
            placeholder="Search projects, sections…"
            aria-label="Search"
            aria-controls="v4-palette-results"
            aria-activedescendant={results[idx] ? `pal-${idx}` : undefined}
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--dim)]"
          />
          <kbd className="v4-mono rounded border border-[var(--line)] px-1.5 text-[10px] text-[var(--dim)]">ESC</kbd>
        </div>
        <ul id="v4-palette-results" role="listbox" className="overflow-y-auto p-2">
          {results.map((r, i) => (
            <li key={r.href} id={`pal-${i}`} role="option" aria-selected={i === idx}>
              <button
                type="button"
                onMouseEnter={() => setIdx(i)}
                onClick={() => go(r.href)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left ${i === idx ? "bg-[rgba(232,188,115,.1)]" : ""}`}
              >
                <span className="text-sm">{r.label}</span>
                <span className="truncate text-xs text-[var(--dim)]">{r.hint}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-[var(--dim)]">No matches</li>}
        </ul>
      </div>
    </div>
  );
}
