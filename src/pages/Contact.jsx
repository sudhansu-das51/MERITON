import { useState } from "react";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import ContactInfoCards from "../components/contact/ContactInfoCards";
import OfficeHours from "../components/contact/OfficeHours";
import MapEmbed from "../components/contact/MapEmbed";
import BranchList from "../components/contact/BranchList";
import ContactForm from "../components/forms/ContactForm";
import { siteConfig } from "../data/siteConfig.js";
import { contactPage } from "../data/contactPage.js";
import { branches } from "../data/branches.js";
import "./Contact.css";

export function Contact() {
  const { seo, hero, sections } = contactPage;
  const [selectedBranch, setSelectedBranch] = useState(branches[0] || {});

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Contact us" }
  ];

  const heroMeta = siteConfig.hours.map((h) => `${h.days}, ${h.time}`);

  return (
    <div className="contact-page">
      <Seo title={seo.title} description={seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="CONTACT US"
        line="Visit our campus, book a 1-on-1 counseling session, or reach out to our admissions desk."
        bgImage="/images/heroes/contact-hero-bg.jpg"
      />

      {/* 2. Contact Info Strip (Tone: Main) */}
      <Section tone="main" className="contact-section--strip">
        <Container>
          <ContactInfoCards />
        </Container>
      </Section>

      {/* 3. Enquiry & Office Hours Section (Tone: Light / Lichen) */}
      <Section tone="light" className="contact-section--enquiry">
        <Container>
          <div className="contact-enquiry-grid">
            {/* Left Column: Heading + Office Hours */}
            <div className="contact-enquiry-info">
              <SectionHeading
                index={sections.enquiry.index}
                label={sections.enquiry.label}
                title={sections.enquiry.title}
              />
              <p className="contact-enquiry-line body">{sections.enquiry.line}</p>

              <div className="contact-office-hours-wrap">
                <OfficeHours />
              </div>
            </div>

            {/* Right Column: Dark Form Panel */}
            <div className="contact-form-panel">
              <div className="contact-form-panel__header">
                <h3 className="contact-form-panel__title h3">Send an Enquiry</h3>
                <span className="contact-form-panel__badge label">Same-day reply</span>
              </div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Map & Branches Section (Tone: Deep) */}
      <Section tone="deep" className="contact-section--branches">
        <Container>
          <SectionHeading
            index={sections.find.index}
            label={sections.find.label}
            title={sections.find.title}
            className="contact-branches-heading"
          />

          <div className="contact-branches-grid">
            {/* Left Column: Map Embed or Placeholder */}
            <div className="contact-map-col">
              <MapEmbed
                embedUrl={selectedBranch.mapEmbedUrl}
                address={selectedBranch.address}
                title={selectedBranch.name}
              />
            </div>

            {/* Right Column: Branch Selection List */}
            <div className="contact-list-col">
              <BranchList
                branches={branches}
                selectedId={selectedBranch.id}
                onSelect={(b) => setSelectedBranch(b)}
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default Contact;
