import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careersPage } from "../../data/careersPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./WhyWorkWithUs.css";

gsap.registerPlugin(ScrollTrigger);

export function WhyWorkWithUs({
  points = careersPage.why.points,
  className = ""
}) {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      const cells = gridRef.current.querySelectorAll(".why-work__cell");
      if (!cells.length) return;

      gsap.from(cells, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    },
    { scope: gridRef }
  );

  return (
    <div className={`why-work ${className}`}>
      <div ref={gridRef} className="why-work__grid">
        {points.map((pt) => (
          <div key={pt.n} className="why-work__cell">
            <span className="why-work__numeral label numeral" aria-hidden="true">
              {pt.n}
            </span>
            <div className="why-work__content">
              <h3 className="why-work__title">
                {pt.title}
              </h3>
              <p className="why-work__line body">
                {pt.line}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyWorkWithUs;
