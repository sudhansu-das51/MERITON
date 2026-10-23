import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";
import { admissions } from "../../data/admissions.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./EligibilityCriteria.css";

gsap.registerPlugin(ScrollTrigger);

export function EligibilityCriteria({ className = "" }) {
  const { sections } = admissions.page;
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
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`eligibility-criteria ${className}`} id="eligibility-criteria">
      <SectionHeading
        index={sections.eligibility.index}
        label={sections.eligibility.label}
        title={sections.eligibility.title}
      />

      <div className="eligibility-criteria__table-wrapper">
        <table className="eligibility-criteria__table">
          <caption className="sr-only">Eligibility criteria for MERITON programs</caption>
          <thead>
            <tr>
              <th scope="col" className="label">Program</th>
              <th scope="col" className="label">Classes</th>
              <th scope="col" className="label">Criteria</th>
              <th scope="col" className="label">Entrance Test</th>
            </tr>
          </thead>
          <tbody>
            {admissions.eligibility.map((item) => (
              <tr key={item.program} ref={addRow} className="eligibility-criteria__row">
                <td data-label="Program" className="eligibility-criteria__program">
                  <span className="eligibility-criteria__program-name h3">{item.program}</span>
                </td>
                <td data-label="Classes" className="eligibility-criteria__classes">
                  <span className="label numeral">{item.classes}</span>
                </td>
                <td data-label="Criteria" className="eligibility-criteria__desc body">
                  {item.criteria}
                </td>
                <td data-label="Entrance Test" className="eligibility-criteria__test">
                  <span className="eligibility-criteria__badge label">{item.entranceTest}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EligibilityCriteria;
