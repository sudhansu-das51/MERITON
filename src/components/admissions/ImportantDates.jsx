import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";
import { admissions } from "../../data/admissions.js";
import { formatDate } from "../../lib/format.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./ImportantDates.css";

gsap.registerPlugin(ScrollTrigger);

export function ImportantDates({ className = "" }) {
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
        stagger: 0.1,
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

  const parseDateParts = (dateStr) => {
    // If format is like "2026-11-01"
    const formatted = formatDate(dateStr); // e.g. "1 Nov 2026"
    const parts = formatted.split(" ");
    if (parts.length === 3) {
      return {
        day: parts[0],
        monthYear: `${parts[1]} ${parts[2]}`
      };
    }
    return { day: dateStr, monthYear: "" };
  };

  return (
    <div className={`important-dates ${className}`} id="important-dates">
      <SectionHeading
        index={sections.dates.index}
        label={sections.dates.label}
        title={sections.dates.title}
      />

      <div ref={listRef} className="important-dates__ledger" role="list">
        {admissions.dates.map((item) => {
          const { day, monthYear } = parseDateParts(item.date);

          return (
            <div
              key={item.label}
              ref={addRow}
              className="important-dates__row"
              role="listitem"
            >
              <div className="important-dates__date-block">
                <span className="important-dates__day display-l numeral">{day}</span>
                <span className="important-dates__month-year label">{monthYear}</span>
              </div>
              <div className="important-dates__info">
                <span className="important-dates__label body">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImportantDates;
