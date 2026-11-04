"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { accentHex, type Accent } from "../../data/portfolio";

/**
 * Pointer-driven 3D tilt with a critically-damped spring (no animation library).
 * Active only for fine, hovering pointers with no reduced-motion preference.
 * Touch devices get a stable card with tap feedback from CSS.
 */
export default function TiltCard({
  accent = "gold",
  className = "",
  wrapperClassName = "",
  children,
  maxTilt = 7,
}: {
  accent?: Accent;
  className?: string;
  /** layout classes for the grid cell (e.g. column spans) */
  wrapperClassName?: string;
  children: ReactNode;
  maxTilt?: number;
}) {
  const hitRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pointer events are read from the untransformed wrapper so the tilting card
    // never "escapes" the cursor at its edges (which would cause jitter).
    const hit = hitRef.current;
    const el = ref.current;
    if (!el || !hit) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    // spring state: current value, velocity and target for rx, ry, lift and glow
    const keys = ["rx", "ry", "lift", "glow"] as const;
    const cur = { rx: 0, ry: 0, lift: 0, glow: 0 };
    const vel = { rx: 0, ry: 0, lift: 0, glow: 0 };
    const tgt = { rx: 0, ry: 0, lift: 0, glow: 0 };
    const stiffness = 170;
    const damping = 22;
    let raf = 0;
    let last = 0;

    const tick = (t: number) => {
      const dt = Math.min(0.032, last ? (t - last) / 1000 : 0.016);
      last = t;
      let moving = false;
      for (const k of keys) {
        const force = (tgt[k] - cur[k]) * stiffness - vel[k] * damping;
        vel[k] += force * dt;
        cur[k] += vel[k] * dt;
        if (Math.abs(tgt[k] - cur[k]) > 0.001 || Math.abs(vel[k]) > 0.001) moving = true;
      }
      el.style.setProperty("--rx", `${cur.rx.toFixed(3)}deg`);
      el.style.setProperty("--ry", `${cur.ry.toFixed(3)}deg`);
      el.style.setProperty("--lift", `${cur.lift.toFixed(2)}px`);
      el.style.setProperty("--glow-o", cur.glow.toFixed(3));
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = hit.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      tgt.rx = (0.5 - y) * maxTilt;
      tgt.ry = (x - 0.5) * maxTilt;
      tgt.lift = 6;
      tgt.glow = 1;
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      kick();
    };
    const onLeave = () => {
      tgt.rx = 0;
      tgt.ry = 0;
      tgt.lift = 0;
      tgt.glow = 0;
      kick();
    };
    hit.addEventListener("pointermove", onMove);
    hit.addEventListener("pointerleave", onLeave);
    return () => {
      hit.removeEventListener("pointermove", onMove);
      hit.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxTilt]);

  return (
    <div ref={hitRef} className={`flex min-w-0 ${wrapperClassName}`}>
      <div ref={ref} className={`v4-card w-full ${className}`} style={{ "--accent": accentHex[accent] } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}
