import Container from "../components/common/Container";
import Section from "../components/common/Section";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import Seo from "../components/common/Seo";
import LegalPageLayout from "../components/legal/LegalPageLayout";
import { legal } from "../data/legal.js";
import { legalPage } from "../data/legalPage.js";
import { siteConfig } from "../data/siteConfig.js";
import { formatDate } from "../lib/format.js";
import "./PrivacyPolicy.css";

export function PrivacyPolicy() {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Privacy policy" }
  ];

  const meta = [
    `Last updated ${formatDate(legal.updated)}`,
    "Privacy · Terms · Refund"
  ];

  const contactEmail = siteConfig.contact?.email || "hello@meriton.example";

  return (
    <div className="privacy-policy-page">
      <Seo
        title={legalPage.seo.title}
        description={legalPage.seo.description}
      />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="PRIVACY POLICY"
        line="How MERITON collects, protects, and manages your personal and academic information."
        bgImage="/images/heroes/privacy-hero-bg.jpg"
      />

      {/* 2. Documents Section (Tone: Main) */}
      <Section tone="main" className="legal-section--documents">
        <Container>
          <LegalPageLayout documents={legal.documents} />
        </Container>
      </Section>

      {/* 3. CTABanner (Tone: Light / Lichen) */}
      <CTABanner
        tone="light"
        title={legalPage.cta.title}
        line={legalPage.cta.line}
        primary={{
          label: legalPage.cta.primary,
          to: "/contact"
        }}
        secondary={{
          label: legalPage.cta.secondary,
          href: `mailto:${contactEmail}`
        }}
      />
    </div>
  );
}

export default PrivacyPolicy;
