"use client";
export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="v4-btn v4-btn-primary">
      Download as PDF
    </button>
  );
}
