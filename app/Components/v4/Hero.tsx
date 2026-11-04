"use client";
import Link from "next/link";
import { useState } from "react";
import { highlights, profile } from "../../data/portfolio";

const orbitTags = [
  { t: "Java · Spring", a: 0, r: 0 },
  { t: "PostgreSQL", a: 72, r: 0 },
  { t: "Next.js · React", a: 144, r: 0 },
  { t: "FastAPI", a: 216, r: 0 },
  { t: "AI Evaluation", a: 288, r: 0 },
];

export default function Hero() {
  const [p, setP] = useState(0);
  const portrait = profile.portraits[p];

  return (
    <section id="top" className="v4-section !pt-10 lg:!pt-16" aria-labelledby="hero-title">
      <div className="v4-wrap grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="v4-kicker">{profile.location}</p>
          <h1 id="hero-title" className="mt-5 text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            Engineering reliable software.
            <span className="block font-serif font-medium italic tracking-[-0.02em] text-[var(--gold-2)]">Evaluating intelligent systems.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-8 text-[var(--muted)]">
            I&apos;m <strong className="font-semibold text-[var(--text)]">{profile.name}</strong>, a software engineer, technical AI evaluator and full-stack / backend developer. I&apos;ve built state-government financial systems in Java, healthcare software in Next.js and FastAPI, and I evaluate AI-generated code and technical answers on contract platforms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="v4-btn v4-btn-primary">View projects <span aria-hidden="true">→</span></a>
            <Link href="/resume/" className="v4-btn v4-btn-ghost">Résumé</Link>
            <a href="#contact" className="v4-btn v4-btn-ghost">Contact</a>
          </div>
          <div className="mt-6 flex items-center gap-5 text-sm text-[var(--muted)]">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
              GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          <svg className="v4-orbit" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e8bc73" stopOpacity=".18" />
                <stop offset="100%" stopColor="#e8bc73" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ringGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#e8bc73" stopOpacity=".7" />
                <stop offset=".5" stopColor="#7cb9ff" stopOpacity=".15" />
                <stop offset="1" stopColor="#ba9aff" stopOpacity=".6" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#orbGlow)" />
            <g className="ring">
              <circle cx="200" cy="200" r="188" fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="2 6" />
              <circle cx="388" cy="200" r="4" fill="#e8bc73" className="pulse" />
            </g>
            <g className="ring r2">
              <ellipse cx="200" cy="200" rx="170" ry="120" fill="none" stroke="rgba(124,185,255,.25)" strokeWidth="1" />
              <circle cx="30" cy="200" r="3.5" fill="#7cb9ff" className="pulse" />
              <circle cx="370" cy="200" r="3" fill="#69d9e9" />
            </g>
            <g className="ring r3">
              <ellipse cx="200" cy="200" rx="120" ry="175" fill="none" stroke="rgba(186,154,255,.22)" strokeWidth="1" />
              <circle cx="200" cy="25" r="3.5" fill="#ba9aff" className="pulse" />
            </g>
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              return <line key={i} x1={200 + Math.cos(a) * 196} y1={200 + Math.sin(a) * 196} x2={200 + Math.cos(a) * (i % 6 ? 192 : 186)} y2={200 + Math.sin(a) * (i % 6 ? 192 : 186)} stroke="rgba(232,188,115,.4)" strokeWidth="1" />;
            })}
          </svg>

          {orbitTags.map((o) => {
            const rad = ((o.a - 90) * Math.PI) / 180;
            return (
              <span key={o.t} className="v4-mono absolute hidden whitespace-nowrap -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line)] bg-[#0a0f1a]/90 px-2.5 py-1 text-[10.5px] text-[var(--muted)] backdrop-blur sm:block"
                style={{ left: `${50 + Math.cos(rad) * 47}%`, top: `${50 + Math.sin(rad) * 47}%` }}>
                {o.t}
              </span>
            );
          })}

          <div className="absolute inset-[19%]">
            <div className="v4-portrait h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, small inline-WebP SVG */}
              <img src={portrait.src} alt={portrait.alt} width={180} height={235} />
            </div>
            <button type="button" onClick={() => setP((v) => (v + 1) % profile.portraits.length)}
              className="v4-btn v4-btn-ghost absolute -bottom-5 left-1/2 !min-h-[38px] -translate-x-1/2 !bg-[#0a0f1a] text-xs"
>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" aria-hidden="true" />
              Switch photo
            </button>
          </div>
        </div>
      </div>

      <div className="v4-wrap mt-14 lg:mt-20">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="v4-glass p-5">
              <dt className="text-[13px] text-[var(--muted)]">{h.label}</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight text-[var(--gold-2)]">{h.value}</dd>
              <dd className="mt-1 text-[12px] text-[var(--dim)]">{h.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
