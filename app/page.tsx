import "./v4.css";
import SiteHeader from "./Components/v4/SiteHeader";
import SectionRail from "./Components/v4/SectionRail";
import Hero from "./Components/v4/Hero";
import CareerTimeline from "./Components/v4/CareerTimeline";
import ProjectGallery from "./Components/v4/ProjectGallery";
import AIStudio from "./Components/v4/AIStudio";
import { ArcadeShowcase, Contact, RecruiterPanel, SiteFooter } from "./Components/v4/HomeSections";

export default function Home() {
  return (
    <div className="v4">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--gold)] focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <div className="v4-ambient" aria-hidden="true"><div className="v4-grid-bg" /></div>
      <SiteHeader home />
      <SectionRail />
      <main id="main">
        <Hero />
        <CareerTimeline />
        <ProjectGallery />
        <AIStudio />
        <ArcadeShowcase />
        <RecruiterPanel />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
