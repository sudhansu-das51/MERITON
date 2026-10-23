import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";
import { admissions } from "../../data/admissions.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./ScholarshipInfo.css";

gsap.registerPlugin(ScrollTrigger);

export function ScholarshipInfo({ className = "" }) {
  const { sections } = admissions.page;
  const listRef = useRef(null);
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
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    },
    { scope: listRef }
  );

  return (
    <div className={`scholarship-info ${className}`} id="scholarship-info">
      <SectionHeading
        index={sections.scholarships.index}
        label={sections.scholarships.label}
        title={sections.scholarships.title}
      />

      <div ref={listRef} className="scholarship-info__ledger" role="list">
        {admissions.scholarships.map((s) => (
          <div
            key={s.title}
            ref={addRow}
            className="scholarship-info__row"
            role="listitem"
          >
            <div className="scholarship-info__details">
              <h3 className="scholarship-info__title h3">{s.title}</h3>
              <p className="scholarship-info__criteria body">{s.criteria}</p>
            </div>
            <div className="scholarship-info__benefit">
              <span className="scholarship-info__value display-l numeral">{s.benefit}</span>
            </div>
          </div>
        ))}
      </div>

      {sections.scholarships.note && (
        <p className="scholarship-info__note label">
          <span>*</span> {sections.scholarships.note}
        </p>
      )}
    </div>
  );
}

export default ScholarshipInfo;
