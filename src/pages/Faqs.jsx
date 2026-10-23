import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import FaqSearch from "../components/faq/FaqSearch";
import FaqCategoryTabs from "../components/faq/FaqCategoryTabs";
import FaqList from "../components/faq/FaqList";
import FaqContactCTA from "../components/faq/FaqContactCTA";
import { faqs } from "../data/faqs.js";
import { faqsPage } from "../data/faqsPage.js";
import "./Faqs.css";

export function Faqs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract unique categories preserving order of appearance
  const categoriesList = useMemo(() => {
    const set = new Set();
    const list = [];
    faqs.forEach((f) => {
      if (f.category && !set.has(f.category)) {
        set.add(f.category);
        list.push(f.category);
      }
    });
    return list;
  }, []);

  // Compute counts per category for filter chips
  const categoryCounts = useMemo(() => {
    const counts = { All: faqs.length };
    categoriesList.forEach((cat) => {
      counts[cat] = faqs.filter((f) => f.category === cat).length;
    });
    return counts;
  }, [categoriesList]);

  // Read URL params (with fallback for invalid category)
  const rawCategory = searchParams.get("category");
  const query = searchParams.get("q") || "";
  const activeCategory =
    rawCategory && categoriesList.includes(rawCategory) ? rawCategory : "All";

  // Filter FAQ items
  const filteredFaqs = useMemo(() => {
    const term = query.trim().toLowerCase();
    return faqs.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }
      if (term) {
        const inQuestion = item.question.toLowerCase().includes(term);
        const inAnswer = item.answer.toLowerCase().includes(term);
        if (!inQuestion && !inAnswer) return false;
      }
      return true;
    });
  }, [activeCategory, query]);

  // URL state update handlers
  const handleQueryChange = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val && val.trim()) {
      newParams.set("q", val.trim());
    } else {
      newParams.delete("q");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCategoryChange = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== "All") {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("category");
    newParams.delete("q");
    setSearchParams(newParams, { replace: true });
  };

  const isFilterActive = activeCategory !== "All" || Boolean(query.trim());

  // Structured Data (Schema.org FAQPage) for visible FAQs
  const faqSchema = useMemo(() => {
    const schemaObj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: filteredFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    };
    return JSON.stringify(schemaObj).replace(/</g, "\\u003c");
  }, [filteredFaqs]);

  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "FAQs" }
  ];

  const heroMeta = [
    `${faqs.length} questions`,
    `${categoriesList.length} categories`
  ];

  return (
    <div className="faqs-page">
      <Seo
        title={faqsPage.seo.title}
        description={faqsPage.seo.description}
      />

      {/* Structured data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="FREQUENTLY ASKED QUESTIONS"
        line="Clear answers about admissions, batch schedules, faculty, fee structures, and study routines."
        bgImage="/images/heroes/faqs-hero-bg.jpg"
      />

      {/* 2. Questions Section (Tone: Main) */}
      <Section tone="main" className="faqs-section--questions" id="faqs-questions">
        <Container>
          <div className="faqs-wrap">
            <SectionHeading
              index={faqsPage.section.index}
              label={faqsPage.section.label}
              title={faqsPage.section.title}
            />

            {/* Controls */}
            <div className="faqs-controls">
              <FaqSearch
                value={query}
                onChange={handleQueryChange}
                label={faqsPage.controls.searchLabel}
                placeholder={faqsPage.controls.searchPlaceholder}
              />

              <FaqCategoryTabs
                categories={categoriesList}
                activeCategory={activeCategory}
                onSelectCategory={handleCategoryChange}
                counts={categoryCounts}
                ariaLabel={faqsPage.controls.categoryAria}
              />

              {/* Live result count & clear button */}
              <div className="faqs-results-bar">
                <span className="faqs-results-count label" aria-live="polite">
                  Showing {filteredFaqs.length} of {faqs.length}
                </span>

                {isFilterActive && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="faqs-clear-btn label"
                  >
                    {faqsPage.controls.clear}
                  </button>
                )}
              </div>
            </div>

            {/* Accordion FAQ list or empty state */}
            <FaqList
              items={filteredFaqs}
              activeCategory={activeCategory}
              query={query}
              onClearFilters={handleClearFilters}
            />
          </div>
        </Container>
      </Section>

      {/* 3. Contact CTA Section (Tone: Light / Lichen) */}
      <Section tone="light" className="faqs-section--cta" id="faqs-cta">
        <Container>
          <FaqContactCTA
            title={faqsPage.cta.title}
            line={faqsPage.cta.line}
          />
        </Container>
      </Section>
    </div>
  );
}

export default Faqs;
