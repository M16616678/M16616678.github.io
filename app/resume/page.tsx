import type { Metadata } from "next";
import Link from "next/link";
import "../v4.css";

export const metadata: Metadata = {
  title: "Résumé PDF | Adi Narayana Manga",
  description:
    "Preview and download the same official résumé PDF for Adi Narayana Manga.",
};

/**
 * One canonical public résumé:
 * - the embedded preview and every download button use the exact same file.
 * - no second, independently generated HTML or browser-print résumé.
 * - PDF browser support varies: always provide direct open/download alternatives.
 */
const RESUME_PDF = "/Adi_Narayana_Manga_Resume.pdf";

export default function ResumePage() {
  return (
    <div className="v4 min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="no-print v4-wrap flex flex-wrap items-center justify-between gap-3 py-6">
        <Link href="/" className="v4-btn v4-btn-ghost">
          ← Back to portfolio
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="hidden text-sm text-[var(--dim)] md:inline">
            PDF preview — identical to the download
          </span>
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="v4-btn v4-btn-ghost"
          >
            Open PDF ↗
          </a>
          <a
            href={RESUME_PDF}
            download="Adi_Narayana_Manga_Resume.pdf"
            className="v4-btn v4-btn-primary"
          >
            Download résumé PDF ↓
          </a>
        </div>
      </div>

      <main className="v4-wrap pb-16" id="main">
        <div className="mb-5">
          <p className="v4-kicker">Professional résumé</p>
          <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Adi Narayana Manga
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            The document displayed below is the exact PDF you will download.
            On mobile, choose Open PDF for your device’s native document viewer.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-white shadow-2xl">
          <iframe
            title="Adi Narayana Manga résumé PDF preview"
            data-testid="resume-pdf-preview"
            src={RESUME_PDF}
            className="block h-[74vh] min-h-[520px] w-full border-0 sm:h-[86vh] sm:min-h-[760px]"
          >
            <p>
              Your browser cannot embed the résumé PDF.
              <a href={RESUME_PDF}>Open the identical PDF</a>.
            </p>
          </iframe>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <p>Two-page PDF · same document for preview and download.</p>
          <a
            href={RESUME_PDF}
            download="Adi_Narayana_Manga_Resume.pdf"
            className="font-semibold text-[var(--gold-2)] hover:underline"
          >
            Download this PDF ↓
          </a>
        </div>
      </main>
    </div>
  );
}
