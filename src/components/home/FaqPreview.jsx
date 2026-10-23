import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { faqs } from "../../data/faqs.js";
import { homeContent } from "../../data/home.js";
import Accordion from "../common/Accordion";
import "./FaqPreview.css";

export function FaqPreview() {
  const { sections } = homeContent;
  const faqItems = faqs.slice(0, 5).map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer
  }));

  return (
    <div className="faq-preview">
      <div className="faq-preview__header">
        <h2 className="faq-preview__title h2 focus-heading">
          {sections.faq.title}
        </h2>
      </div>

      <div className="faq-preview__accordion-wrap focus-card">
        <Accordion items={faqItems} defaultOpenIndex={0} />
      </div>

      <div className="faq-preview__footer focus-cta">
        <Link to="/faqs" className="faq-preview__link label">
          <span>{sections.faq.linkLabel}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default FaqPreview;
