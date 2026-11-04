import type { Metadata } from "next";
import "../v4.css";
import MovedPage from "../Components/v4/MovedPage";

export const metadata: Metadata = { title: "Moved to the homepage | Adi Narayana Manga", robots: { index: false } };

export default function PortfolioPreviewPage() {
  return <MovedPage to="/" label="homepage" />;
}
