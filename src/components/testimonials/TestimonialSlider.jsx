import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate } from "animejs";
import ImageWithFallback from "../common/ImageWithFallback";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./TestimonialSlider.css";

export function TestimonialSlider({
  testimonials = [],
  labels = {},
  className = ""
}) {
  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const progressFillRef = useRef(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(testimonials.length > 1);
  const [progress, setProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    setCanScrollPrev(currentScroll > 8);
    setCanScrollNext(currentScroll < maxScroll - 8);

    const ratio = maxScroll > 0 ? Math.min(Math.max(currentScroll / maxScroll, 0), 1) : 0;
    setProgress(ratio);

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${ratio})`;
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollBySlide = (direction) => {
    const el = containerRef.current;
    if (!el) return;

    // Width of first child slide plus gap
    const firstSlide = el.querySelector(".testimonial-slide");
    const slideWidth = firstSlide ? firstSlide.getBoundingClientRect().width + 24 : el.clientWidth * 0.86;

    el.scrollBy({
      left: direction === "next" ? slideWidth : -slideWidth,
      behavior: "smooth"
    });

    // Anime.js arrow micro-motion
    if (!prefersReducedMotion()) {
      const btn = direction === "next" ? nextBtnRef.current : prevBtnRef.current;
      const icon = btn?.querySelector("svg");
      if (icon) {
        animate(icon, {
          translateX: direction === "next" ? [0, 4, 0] : [0, -4, 0],
          duration: 300,
          ease: "outQuad"
        });
      }
    }
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      className={`testimonial-slider ${className}`}
      aria-label={labels.regionLabel || "Featured testimonials"}
    >
      {/* Top controls: Progress Rail & Arrow Buttons */}
      <div className="testimonial-slider__header">
        <div className="testimonial-slider__progress-track" aria-hidden="true">
          <div
            ref={progressFillRef}
            className="testimonial-slider__progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="testimonial-slider__controls">
          <button
            ref={prevBtnRef}
            type="button"
            className="testimonial-slider__btn"
            onClick={() => scrollBySlide("prev")}
            disabled={!canScrollPrev}
            aria-label={labels.previous || "Previous story"}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            ref={nextBtnRef}
            type="button"
            className="testimonial-slider__btn"
            onClick={() => scrollBySlide("next")}
            disabled={!canScrollNext}
            aria-label={labels.next || "Next story"}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll-Snap Carousel Container */}
      <div
        ref={containerRef}
        className="testimonial-slider__track"
        data-lenis-prevent
        tabIndex="0"
        role="region"
        aria-label={labels.regionLabel || "Featured testimonials"}
      >
        {testimonials.map((item) => (
          <article
            key={item.id}
            className="testimonial-slide"
            aria-labelledby={`featured-quote-${item.id}`}
          >
            {/* Left: Portrait 4:5 duotone */}
            <div className="testimonial-slide__portrait-wrap">
              <ImageWithFallback
                src={item.photo}
                alt={`Photo of ${item.name}`}
                ratio="4/5"
                duotone={false}
                className="testimonial-slide__photo"
              />
            </div>

            {/* Right: Quote, author, course, result tag */}
            <div className="testimonial-slide__content">
              <blockquote
                id={`featured-quote-${item.id}`}
                className="testimonial-slide__quote"
              >
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="testimonial-slide__footer">
                <div className="testimonial-slide__identity">
                  <h3 className="testimonial-slide__name">{item.name}</h3>
                  {item.relation && (
                    <span className="testimonial-slide__relation label">
                      {item.relation}
                    </span>
                  )}
                  <span className="testimonial-slide__course label">
                    {item.course} &bull; {item.year}
                  </span>
                </div>

                {item.result && (
                  <div className="testimonial-slide__result-tag label">
                    {item.result}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TestimonialSlider;
