import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCard from "./TestimonialCard";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./TestimonialGrid.css";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialGrid({
  testimonials = [],
  emptyState = {},
  onClear,
  filterKey = "",
  className = ""
}) {
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      const items = gridRef.current.querySelectorAll(".testimonial-grid__item");
      if (!items.length) return;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        // Quick 0.35s re-stagger on filter change
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
            onComplete: () => ScrollTrigger.refresh()
          }
        );
      }
    },
    { scope: gridRef, dependencies: [filterKey, testimonials.length] }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <div className="testimonial-grid__empty-wrapper">
        <EmptyState
          title={emptyState.title || "No stories match"}
          line={emptyState.line || "Try another course or author."}
        >
          {onClear && (
            <Button variant="secondary" onClick={onClear}>
              Clear filters
            </Button>
          )}
        </EmptyState>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={`testimonial-grid ${className}`}
      role="list"
      aria-label="Student and parent testimonials"
    >
      {testimonials.map((item) => (
        <div key={item.id} className="testimonial-grid__item" role="listitem">
          <TestimonialCard testimonial={item} />
        </div>
      ))}
    </div>
  );
}

export default TestimonialGrid;
