import Container from "../components/common/Container";
import Section from "../components/common/Section";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import AdmissionProcessSteps from "../components/admissions/AdmissionProcessSteps";
import EligibilityCriteria from "../components/admissions/EligibilityCriteria";
import DocumentsRequired from "../components/admissions/DocumentsRequired";
import ScholarshipInfo from "../components/admissions/ScholarshipInfo";
import ImportantDates from "../components/admissions/ImportantDates";
import FeeAndPaymentInfo from "../components/admissions/FeeAndPaymentInfo";
import AdmissionFormSection from "../components/admissions/AdmissionFormSection";
import { admissions } from "../data/admissions.js";
import "./Admissions.css";

export function Admissions() {
  const { page } = admissions;

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "Admissions" }
  ];

  return (
    <div className="admissions-page">
      <Seo title={page.seo.title} description={page.seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="ADMISSIONS"
        line="Transparent admission process, scholarship test details, and batch enrollment guidelines."
        bgImage="/images/heroes/admissions-hero-bg.jpg"
      />

      {/* 2. Process (Tone: Main) */}
      <Section tone="main" id="admissions-process" className="admissions-section--process">
        <Container>
          <AdmissionProcessSteps />
        </Container>
      </Section>

      {/* 3. Eligibility (Tone: Light / Lichen) */}
      <Section tone="light" className="admissions-section--eligibility">
        <Container>
          <EligibilityCriteria />
        </Container>
      </Section>

      {/* 4. Documents + Scholarships (Tone: Deep) */}
      <Section tone="deep" className="admissions-section--docs-scholarships">
        <Container>
          <div className="admissions-split-grid">
            <DocumentsRequired />
            <ScholarshipInfo />
          </div>
        </Container>
      </Section>

      {/* 5. Dates + Fees (Tone: Main) */}
      <Section tone="main" className="admissions-section--dates-fees">
        <Container>
          <div className="admissions-split-grid">
            <ImportantDates />
            <FeeAndPaymentInfo />
          </div>
        </Container>
      </Section>

      {/* 6. Apply (Tone: Light / Lichen) */}
      <Section tone="light" className="admissions-section--apply">
        <Container>
          <AdmissionFormSection />
        </Container>
      </Section>
    </div>
  );
}

export default Admissions;
