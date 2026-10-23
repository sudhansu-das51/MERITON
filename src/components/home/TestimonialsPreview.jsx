import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { approvedTestimonials } from "../../data/testimonials.js";
import { homeContent } from "../../data/home.js";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion.js";
import SectionHeading from "../common/SectionHeading";
import FocusReveal from "../animations/FocusReveal";
import "./TestimonialsPreview.css";

export function TestimonialsPreview() {
  const { sections } = homeContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const quoteContainerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const total = approvedTestimonials.length;
  const current = approvedTestimonials[activeIndex];

  const animateSlide = (newIndex) => {
    if (prefersReducedMotion() || !quoteContainerRef.current) {
      setActiveIndex(newIndex);
      return;
    }

    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const el = quoteContainerRef.current;

    // Outgoing transition: subtle focus fade
    gsap.to(el, {
      y: -MOTION.yCta,
      opacity: 0,
      duration: DUR.fast,
      ease: EASE.out,
      onComplete: () => {
        setActiveIndex(newIndex);
        gsap.fromTo(
          el,
          { y: MOTION.yCta, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DUR.textSub,
            ease: EASE.focus,
            clearProps: "transform,opacity",
            onComplete: () => {
              isAnimatingRef.current = false;
            }
          }
        );
      }
    });
  };

  const handleNext = useCallback(() => {
    const next = (activeIndex + 1) % total;
    animateSlide(next);
  }, [activeIndex, total]);

  const handlePrev = useCallback(() => {
    const prev = (activeIndex - 1 + total) % total;
    animateSlide(prev);
  }, [activeIndex, total]);

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return;

    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  const formattedIndex = `${String(activeIndex + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}`;

  return (
    <section
      className="testimonials-preview section section--deep"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <FocusReveal className="container">
        <SectionHeading
          id="testimonials-heading"
          index={sections.testimonials.index}
          label={sections.testimonials.label}
          title={sections.testimonials.title}
        />

        <div className="testimonials-preview__card focus-card">
          {/* Top Row: Big Mono Index and Nav Controls */}
          <div className="testimonials-preview__top">
            <span className="testimonials-preview__index numeral label">
              {formattedIndex}
            </span>

            {/* Progress Rail */}
            <div className="testimonials-preview__ticks" aria-hidden="true">
              {approvedTestimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`testimonials-preview__tick ${i === activeIndex ? "testimonials-preview__tick--active" : ""}`}
                  onClick={() => animateSlide(i)}
                  aria-label={`Jump to quote ${i + 1}`}
                />
              ))}
            </div>

            <div className="testimonials-preview__controls">
              <button
                type="button"
                onClick={handlePrev}
                className="testimonials-preview__btn"
                aria-label="Previous student quote"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="testimonials-preview__btn"
                aria-label="Next student quote"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Quote Area */}
          <div
            ref={quoteContainerRef}
            className="testimonials-preview__quote-wrap"
            aria-live="polite"
          >
            <blockquote className="testimonials-preview__quote display-l">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="testimonials-preview__author">
              <div className="testimonials-preview__name h3">
                {current.name}
              </div>
              <div className="testimonials-preview__meta label">
                <span>{current.course}</span>
                <span className="testimonials-preview__sep" aria-hidden="true">&bull;</span>
                <span className="testimonials-preview__result">{current.result}</span>
              </div>
            </div>
          </div>
        </div>
      </FocusReveal>
    </section>
  );
}

export default TestimonialsPreview;
