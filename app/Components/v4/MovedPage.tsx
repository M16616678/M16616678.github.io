"use client";
import Link from "next/link";
import { useEffect } from "react";

/** Keeps old URLs working on static hosting by forwarding to the canonical page. */
export default function MovedPage({ to, label }: { to: string; label: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <main className="v4 grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="v4-kicker justify-center">This page moved</p>
        <p className="mt-4 text-[var(--muted)]">Taking you to the {label}.</p>
        <Link href={to} className="v4-btn v4-btn-primary mt-6">Go to {label}</Link>
      </div>
    </main>
  );
}
