import Seo from "../components/common/Seo";
import LogoSplitReveal from "../components/animations/LogoSplitReveal";
import HeroSection from "../components/home/HeroSection";
import TrustPoints from "../components/home/TrustPoints";
import PopularCourses from "../components/home/PopularCourses";
import WhyChooseUs from "../components/home/WhyChooseUs";
import SubjectsPlayground from "../components/home/SubjectsPlayground";
import ResultsHighlights from "../components/home/ResultsHighlights";
import FacultyPreview from "../components/home/FacultyPreview";
import TestimonialsPreview from "../components/home/TestimonialsPreview";
import ResourcesNoticesPreview from "../components/home/ResourcesNoticesPreview";
import AdmissionStepsPreview from "../components/home/AdmissionStepsPreview";
import FaqPreview from "../components/home/FaqPreview";
import FinalEnquiryCTA from "../components/home/FinalEnquiryCTA";
import "./Home.css";

export function Home() {
  return (
    <>
      <Seo
        title=""
        description="MERITON - JEE, NEET and Foundation coaching academy for Classes 8 to 12. Weekly tests, ranked and reviewed."
      />

      {/* 4.0 Logo-Split Geometric Wipe Reveal (Landing Page Entrance) */}
      <LogoSplitReveal />

      {/* 4.1 Hero Section - Tone: Deep */}
      <HeroSection />

      {/* 4.2 Trust Points Strip - Tone: Deep */}
      <TrustPoints />

      {/* 4.3 Popular Courses - Tone: Main */}
      <PopularCourses />

      {/* 4.4 Why MERITON - Tone: Light (Lichen) */}
      <WhyChooseUs />

      {/* 4.5 Subjects Playground (Matter.js) - Tone: Deep */}
      <SubjectsPlayground />

      {/* 4.6 Results Highlights (Horizontal Pinned Scroll) - Tone: Main */}
      <ResultsHighlights />

      {/* 4.7 Faculty Preview - Tone: Light (Lichen) */}
      <FacultyPreview />

      {/* 4.8 Testimonials Preview (Single Large Quote Slider) - Tone: Deep */}
      <TestimonialsPreview />

      {/* 4.9 Study Material & Notice Board - Tone: Main */}
      <ResourcesNoticesPreview />

      {/* 4.10 Admissions Steps + Common FAQ - Tone: Light (Lichen) */}
      <section className="home-admissions-faq section section--light" aria-label="Admissions process and Frequently Asked Questions">
        <div className="container home-admissions-faq__grid">
          <AdmissionStepsPreview />
          <FaqPreview />
        </div>
      </section>

      {/* 4.11 Final Enquiry CTA - Tone: Main */}
      <FinalEnquiryCTA />
    </>
  );
}

export default Home;
