import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Accordion from "../common/Accordion";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import { faqsPage } from "../../data/faqsPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./FaqList.css";

gsap.registerPlugin(ScrollTrigger);

const KNOWN_CATEGORIES = [
  "Admissions",
  "Courses and batches",
  "Fees and scholarships",
  "Tests and results",
  "Campus and facilities"
];

export function FaqList({
  items = [],
  activeCategory = "All",
  query = "",
  onClearFilters,
  className = ""
}) {
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);
  const { openEnquiry } = useEnquiry();

  const isGrouped = activeCategory === "All" && !query.trim();

  // Check if flat list mixes categories
  const categoriesPresent = new Set(items.map((i) => i.category));
  const showCategoryTag = !isGrouped && categoriesPresent.size > 1;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) {
        ScrollTrigger.refresh();
        return;
      }

      const elements = containerRef.current.querySelectorAll(
        isGrouped ? ".faq-group" : ".accordion__item"
      );
      if (!elements.length) {
        ScrollTrigger.refresh();
        return;
      }

      const duration = isFirstRender.current ? 0.45 : 0.35;
      isFirstRender.current = false;

      gsap.fromTo(
        elements,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger: 0.04,
          ease: "power2.out",
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    },
    { scope: containerRef, dependencies: [items, isGrouped, activeCategory, query] }
  );

  const formatAccordionItems = (list, withCategoryBadge) => {
    return list.map((faq) => ({
      id: faq.id,
      title: (
        <span className="faq-item__title-row">
          {withCategoryBadge && (
            <span className="faq-item__badge label" aria-hidden="true">
              {faq.category}
            </span>
          )}
          <span className="faq-item__question">{faq.question}</span>
        </span>
      ),
      content: (
        <div className="faq-item__body">
          <p className="faq-item__answer body">{faq.answer}</p>
          {faq.link && (
            <div className="faq-item__link-wrap">
              <Link to={faq.link.to} className="faq-item__link label">
                <span>{faq.link.label}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      )
    }));
  };

  if (items.length === 0) {
    return (
      <div ref={containerRef} className={`faq-list faq-list--empty ${className}`}>
        <EmptyState
          label="No match"
          title={faqsPage.empty.title}
          line={faqsPage.empty.line}
        >
          <Button variant="secondary" size="md" onClick={onClearFilters}>
            {faqsPage.controls.clear}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() =>
              openEnquiry({
                message: query.trim()
                  ? `Question regarding: ${query.trim()}`
                  : "General question"
              })
            }
            showArrow
          >
            {faqsPage.cta.enquire}
          </Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`faq-list ${className}`}
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {isGrouped ? (
        <div className="faq-groups">
          {KNOWN_CATEGORIES.map((cat, idx) => {
            const catItems = items.filter((item) => item.category === cat);
            if (!catItems.length) return null;

            return (
              <div key={cat} className="faq-group">
                <div className="faq-group__header">
                  <h3 className="faq-group__title label">
                    <span className="faq-group__index">
                      {String(idx + 1).padStart(2, "0")} /{" "}
                    </span>
                    <span>{cat}</span>
                  </h3>
                  <span className="faq-group__count label">
                    {catItems.length}{" "}
                    {catItems.length === 1 ? "question" : "questions"}
                  </span>
                </div>
                <div className="faq-group__accordion">
                  <Accordion
                    items={formatAccordionItems(catItems, false)}
                    defaultOpenIndex={idx === 0 ? 0 : null}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="faq-flat-list">
          <Accordion
            items={formatAccordionItems(items, showCategoryTag)}
            defaultOpenIndex={0}
          />
        </div>
      )}
    </div>
  );
}

export default FaqList;
