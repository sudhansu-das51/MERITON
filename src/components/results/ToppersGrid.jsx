import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, ScrollTrigger, prefersReducedMotion } from "../../lib/motion.js";
import TopperCard from "./TopperCard";
import "./ToppersGrid.css";

export function ToppersGrid({
  toppers = [],
  filterKey = "",
  className = ""
}) {
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".topper-card");
      if (!cards.length) return;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.from(cards, {
          y: MOTION.yCard,
          opacity: 0,
          duration: DUR.card,
          stagger: MOTION.staggerCard,
          ease: EASE.focus,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true
          },
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        // Quick re-stagger on filter change
        gsap.fromTo(
          cards,
          { opacity: 0, y: MOTION.ySubtext },
          {
            opacity: 1,
            y: 0,
            duration: DUR.textSub,
            stagger: 0.04,
            ease: EASE.focus,
            clearProps: "transform,opacity",
            onComplete: () => ScrollTrigger.refresh()
          }
        );
      }
    },
    { scope: gridRef, dependencies: [filterKey, toppers.length] }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [toppers.length]);

  return (
    <div ref={gridRef} className={`toppers-grid ${className}`} role="list">
      {toppers.map((topper) => (
        <div key={topper.id} className="toppers-grid__item" role="listitem">
          <TopperCard topper={topper} />
        </div>
      ))}
    </div>
  );
}

export default ToppersGrid;
