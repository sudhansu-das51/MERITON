import { useState } from "react";
import { Mail } from "lucide-react";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import CareerIntro from "../components/careers/CareerIntro";
import WhyWorkWithUs from "../components/careers/WhyWorkWithUs";
import JobList from "../components/careers/JobList";
import JobApplicationForm from "../components/forms/JobApplicationForm";
import { careersPage } from "../data/careersPage.js";
import { jobs } from "../data/jobs.js";
import { siteConfig } from "../data/siteConfig.js";
import { getLenis } from "../lib/smoothScroll.js";
import { prefersReducedMotion } from "../lib/motion.js";
import "./Careers.css";

export function Careers() {
  const [selectedRole, setSelectedRole] = useState("");

  const openJobs = jobs.filter((j) => j.open);
  const openCount = openJobs.length;

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Careers" }
  ];

  const heroMeta = [
    `${openCount} open position${openCount === 1 ? "" : "s"}`,
    "Teaching and support roles"
  ];

  const careersEmail = siteConfig.careersEmail || siteConfig.contact?.careersEmail || "careers@meriton.example";

  const handleApply = (roleTitle) => {
    setSelectedRole(roleTitle);

    const target = document.getElementById("apply-section");
    if (target) {
      const lenis = getLenis();
      if (lenis && !prefersReducedMotion()) {
        lenis.scrollTo(target, { offset: -40 });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      }
    }

    // Move focus to the form's first field after scroll begins/completes
    const delay = prefersReducedMotion() ? 50 : 400;
    setTimeout(() => {
      const firstInput = document.getElementById("job-name");
      if (firstInput) {
        firstInput.focus({ preventScroll: true });
      }
    }, delay);
  };

  return (
    <div className="careers-page">
      <Seo
        title={careersPage.seo.title}
        description={careersPage.seo.description}
      />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="CAREERS"
        line="Join our distinguished faculty team and shape the next generation of academic toppers."
        bgImage="/images/heroes/careers-hero-bg.jpg"
      />

      {/* 2. Intro (Tone: Main) */}
      <Section tone="main" className="careers-section--intro">
        <Container>
          <CareerIntro statement={careersPage.intro.statement} />
        </Container>
      </Section>

      {/* 3. Why Work Here (Tone: Light / Lichen) */}
      <Section tone="light" className="careers-section--why">
        <Container>
          <div className="careers-why-wrap">
            <SectionHeading
              index={careersPage.why.index}
              label={careersPage.why.label}
              title={careersPage.why.title}
            />
            <WhyWorkWithUs points={careersPage.why.points} />
          </div>
        </Container>
      </Section>

      {/* 4. Open Positions (Tone: Deep) */}
      <Section tone="deep" className="careers-section--jobs" id="open-positions">
        <Container>
          <div className="careers-jobs-wrap">
            <SectionHeading
              index={careersPage.jobs.index}
              label={careersPage.jobs.label}
              title={careersPage.jobs.title}
            />
            <JobList
              jobsList={jobs}
              onApply={handleApply}
              labels={careersPage.jobs}
            />
          </div>
        </Container>
      </Section>

      {/* 5. Apply (Tone: Light / Lichen) */}
      <Section tone="light" className="careers-section--apply" id="apply-section">
        <Container>
          <div className="careers-apply-grid">
            {/* Left Column on Lichen */}
            <div className="careers-apply__info">
              <SectionHeading
                index={careersPage.apply.index}
                label={careersPage.apply.label}
                title={careersPage.apply.title}
              />
              <p className="careers-apply__line body">
                {careersPage.apply.line}
              </p>

              <div className="careers-apply__contacts">
                <a
                  href={`mailto:${careersEmail}?subject=${encodeURIComponent("General application - MERITON")}`}
                  className="careers-apply__contact-link"
                >
                  <span className="careers-apply__contact-icon" aria-hidden="true">
                    <Mail size={18} />
                  </span>
                  <div className="careers-apply__contact-text">
                    <span className="careers-apply__contact-label label">Careers Desk</span>
                    <span className="careers-apply__contact-val label">{careersEmail}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Dark Panel containing JobApplicationForm */}
            <div className="careers-apply__panel">
              <div className="careers-apply__panel-header">
                <h3 className="careers-apply__panel-title h3">
                  Job application
                </h3>
                <span className="careers-apply__panel-badge label">
                  Online submission
                </span>
              </div>
              <JobApplicationForm selectedRole={selectedRole} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default Careers;
