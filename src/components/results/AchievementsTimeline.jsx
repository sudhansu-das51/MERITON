import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./AchievementsTimeline.css";

gsap.registerPlugin(ScrollTrigger);

export function AchievementsTimeline({
  items = [],
  className = ""
}) {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  const addRow = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!rowsRef.current.length) return;

      gsap.from(rowsRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`achievements-ledger ${className}`} role="list">
      {items.map((item) => (
        <div
          key={`${item.year}-${item.title}`}
          ref={addRow}
          className="achievements-ledger__row"
          role="listitem"
        >
          {/* Left: Year */}
          <div className="achievements-ledger__year-col">
            <span className="achievements-ledger__year display-l numeral">{item.year}</span>
          </div>

          {/* Middle: Title & Description */}
          <div className="achievements-ledger__content-col">
            <h3 className="achievements-ledger__title h3">{item.title}</h3>
            <p className="achievements-ledger__text body">{item.text}</p>
          </div>

          {/* Right: Mono Tag Badge */}
          <div className="achievements-ledger__tag-col">
            <span className="achievements-ledger__tag label numeral">{item.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AchievementsTimeline;
