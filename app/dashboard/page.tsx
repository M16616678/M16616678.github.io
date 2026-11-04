import type { Metadata } from "next";
import "../v4.css";
import MovedPage from "../Components/v4/MovedPage";

export const metadata: Metadata = { title: "Moved to the Arcade | Adi Narayana Manga", robots: { index: false } };

export default function DashboardPage() {
  return <MovedPage to="/arcade/" label="arcade" />;
}
