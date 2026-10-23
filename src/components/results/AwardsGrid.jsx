import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, ScrollTrigger, prefersReducedMotion } from "../../lib/motion.js";
import AwardCard from "./AwardCard";
import "./AwardsGrid.css";

export function AwardsGrid({
  awards = [],
  className = ""
}) {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const addCard = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!cardsRef.current.length) return;

      gsap.from(cardsRef.current, {
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
        }
      });
    },
    { scope: gridRef }
  );

  return (
    <div ref={gridRef} className={`awards-grid ${className}`} role="list">
      {awards.map((award) => (
        <div key={award.id} ref={addCard} className="awards-grid__item" role="listitem">
          <AwardCard award={award} />
        </div>
      ))}
    </div>
  );
}

export default AwardsGrid;
