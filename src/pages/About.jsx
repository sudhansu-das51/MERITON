import Section from "../components/common/Section";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import AboutIntro from "../components/about/AboutIntro";
import VisionMission from "../components/about/VisionMission";
import DirectorMessage from "../components/about/DirectorMessage";
import Methodology from "../components/about/Methodology";
import Infrastructure from "../components/about/Infrastructure";
import JourneyTimeline from "../components/about/JourneyTimeline";
import { about } from "../data/about";
import { results } from "../data/results";
import { useEnquiry } from "../lib/EnquiryContext";
import "./About.css";

export function About() {
  const { openEnquiry } = useEnquiry();
  const { page, founded, intro, vision, mission, director, methodology, infrastructure, journey } = about;

  const facultyCount = results.stats.find((s) => s.label.toLowerCase().includes("faculty"))?.value || 62;

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "About us" }
  ];

  const heroMeta = [
    `Since ${founded}`,
    `${facultyCount} faculty`,
    "40 seats per batch"
  ];

  return (
    <div className="about-page">
      <Seo title={page.seo.title} description={page.seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="ABOUT US"
        line="A premier coaching academy for JEE, NEET and Foundation. Small batches, weekly tests, and daily doubt hours since 2015."
        bgImage="/images/heroes/about-hero-bg.jpg"
      />

      {/* 2. Intro Statement & Ruled Stats Strip (Tone: Main) */}
      <Section tone="main" className="about-intro-section">
        <AboutIntro intro={intro} stats={results.stats} />
      </Section>

      {/* 3. Vision and Mission (Tone: Light / Lichen) */}
      <Section tone="light" className="about-vision-section">
        <VisionMission
          vision={vision}
          mission={mission}
          heading={page.sections.visionMission}
        />
      </Section>

      {/* 4. Director Message (Tone: Deep) */}
      <Section tone="deep" className="about-director-section">
        <DirectorMessage
          director={director}
          heading={page.sections.director}
        />
      </Section>

      {/* 5. Methodology - How we teach (Tone: Main) */}
      <Section tone="main" className="about-methodology-section">
        <Methodology
          steps={methodology}
          heading={page.sections.methodology}
        />
      </Section>

      {/* 6. Campus Infrastructure (Tone: Light / Lichen) */}
      <Section tone="light" className="about-infra-section">
        <Infrastructure
          items={infrastructure}
          heading={page.sections.infrastructure}
        />
      </Section>

      {/* 7. Journey Timeline (Tone: Deep) */}
      <Section tone="deep" className="about-journey-section">
        <JourneyTimeline
          entries={journey}
          heading={page.sections.journey}
        />
      </Section>

      {/* 8. CTABanner (Tone: Main) */}
      <CTABanner
        tone="main"
        title={page.cta.title}
        line={page.cta.line}
        primary={{
          label: "Enquire now",
          onClick: () => openEnquiry()
        }}
        secondary={{
          label: "Contact us",
          to: "/contact"
        }}
      />
    </div>
  );
}

export default About;
