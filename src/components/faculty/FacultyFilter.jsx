import { useMemo, useRef } from "react";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import FilterChips from "../common/FilterChips";
import { facultyPage } from "../../data/facultyPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./FacultyFilter.css";

export function FacultyFilter({
  subjects = [],
  facultyList = [],
  selectedSubject = "All",
  onSelectSubject,
  onClear,
  filteredCount = 0,
  className = ""
}) {
  const containerRef = useRef(null);
  const { controls } = facultyPage;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      gsap.from(containerRef.current, {
        y: 12,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out"
      });
    },
    { scope: containerRef }
  );

  const chipOptions = useMemo(() => {
    const totalCount = facultyList.length;
    const chips = [
      {
        value: "All",
        label: controls.allLabel,
        count: totalCount
      }
    ];

    subjects.forEach((subj) => {
      const count = facultyList.filter((f) => f.subject === subj).length;
      chips.push({
        value: subj,
        label: subj,
        count
      });
    });

    return chips;
  }, [subjects, facultyList, controls.allLabel]);

  const hasFilter = selectedSubject !== "All";

  return (
    <div ref={containerRef} className={`faculty-filter ${className}`}>
      <div className="faculty-filter__chips-wrap">
        <FilterChips
          options={chipOptions}
          value={selectedSubject}
          onChange={onSelectSubject}
          ariaLabel={controls.ariaLabel}
        />
      </div>

      <div className="faculty-filter__meta">
        <span className="faculty-filter__count" aria-live="polite">
          Showing {filteredCount} of {facultyList.length}
        </span>

        {hasFilter && (
          <button
            type="button"
            onClick={onClear}
            className="faculty-filter__clear-btn label"
          >
            <X size={12} aria-hidden="true" />
            <span>{controls.clear}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default FacultyFilter;
