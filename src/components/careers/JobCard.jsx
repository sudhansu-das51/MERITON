import { useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../common/Button";
import { formatDate } from "../../lib/format.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./JobCard.css";

export function JobCard({
  job,
  isOpen = false,
  onToggle,
  onApply,
  labels = {
    apply: "Apply for this role",
    responsibilities: "Responsibilities",
    requirements: "Requirements",
    posted: "Posted"
  },
  className = ""
}) {
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const isMountedRef = useRef(false);

  const { id, title, department, type, location, experience, summary, responsibilities, requirements, postedOn } = job;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (!isOpen) {
        gsap.set(el, { height: 0, opacity: 0 });
      } else {
        gsap.set(el, { height: "auto", opacity: 1 });
      }
      return;
    }

    if (prefersReducedMotion()) {
      if (isOpen) {
        gsap.set(el, { height: "auto", opacity: 1 });
      } else {
        gsap.set(el, { height: 0, opacity: 0 });
      }
      ScrollTrigger.refresh();
      return;
    }

    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => ScrollTrigger.refresh()
      });
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle?.();
    }
  };

  return (
    <article
      className={`job-card ${isOpen ? "job-card--open" : ""} ${className}`}
      aria-labelledby={`job-title-${id}`}
    >
      <div
        className="job-card__header"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex="0"
        aria-expanded={isOpen}
        aria-controls={`job-details-${id}`}
      >
        <div className="job-card__main-info">
          <div className="job-card__title-row">
            <h3 id={`job-title-${id}`} className="job-card__title">
              {title}
            </h3>
            <span className="job-card__dept label">
              {department}
            </span>
          </div>

          <div className="job-card__meta label">
            <span>{type}</span>
            <span className="job-card__sep" aria-hidden="true">&bull;</span>
            <span>{location}</span>
            <span className="job-card__sep" aria-hidden="true">&bull;</span>
            <span>{experience}</span>
            <span className="job-card__sep" aria-hidden="true">&bull;</span>
            <span className="job-card__posted">{labels.posted} {formatDate(postedOn)}</span>
          </div>
        </div>

        <div className="job-card__toggle-action">
          <span
            ref={iconRef}
            className={`job-card__plus ${isOpen ? "job-card__plus--open" : ""}`}
            aria-hidden="true"
          >
            <Plus size={20} />
          </span>
        </div>
      </div>

      {/* Expandable Disclosure Body */}
      <div
        ref={contentRef}
        id={`job-details-${id}`}
        className="job-card__body"
        style={{ overflow: "hidden" }}
      >
        <div className="job-card__body-inner">
          {summary && (
            <p className="job-card__summary body">
              {summary}
            </p>
          )}

          <div className="job-card__details-grid">
            {responsibilities && responsibilities.length > 0 && (
              <div className="job-card__detail-col">
                <h4 className="job-card__section-heading label">
                  {labels.responsibilities}
                </h4>
                <ul className="job-card__list" role="list">
                  {responsibilities.map((item, idx) => (
                    <li key={idx} className="job-card__list-item body">
                      <span className="job-card__tick" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requirements && requirements.length > 0 && (
              <div className="job-card__detail-col">
                <h4 className="job-card__section-heading label">
                  {labels.requirements}
                </h4>
                <ul className="job-card__list" role="list">
                  {requirements.map((item, idx) => (
                    <li key={idx} className="job-card__list-item body">
                      <span className="job-card__tick" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="job-card__actions">
            <Button
              variant="primary"
              size="md"
              onClick={() => onApply?.(title)}
              showArrow
            >
              {labels.apply}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default JobCard;
