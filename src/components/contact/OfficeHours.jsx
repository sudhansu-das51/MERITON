import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";
import { siteConfig } from "../../data/siteConfig.js";
import { contactPage } from "../../data/contactPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./OfficeHours.css";

gsap.registerPlugin(ScrollTrigger);

export function OfficeHours({ className = "" }) {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);
  const { hours } = siteConfig;
  const { sections } = contactPage;

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
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
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
    <div ref={containerRef} className={`office-hours ${className}`} id="office-hours">
      <SectionHeading
        index={sections.hours.index}
        label={sections.hours.label}
        title={sections.hours.title}
      />

      <div className="office-hours__ledger" role="list">
        {hours.map((item) => (
          <div
            key={item.days}
            ref={addRow}
            className="office-hours__row"
            role="listitem"
          >
            <span className="office-hours__days label numeral">{item.days}</span>
            <span className="office-hours__time h3 numeral">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfficeHours;
