import { useState, useRef } from "react";
import { animate } from "animejs";
import SectionHeading from "../common/SectionHeading";
import { admissions } from "../../data/admissions.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./DocumentsRequired.css";

export function DocumentsRequired({ className = "" }) {
  const { sections } = admissions.page;
  const docs = admissions.documents;
  const [checkedIndices, setCheckedIndices] = useState(() => new Set());
  const tickRefs = useRef({});

  const toggleDoc = (index) => {
    setCheckedIndices((prev) => {
      const next = new Set(prev);
      const isChecking = !next.has(index);

      if (isChecking) {
        next.add(index);
        // Animate tick draw if checking and not reduced motion
        if (!prefersReducedMotion() && tickRefs.current[index]) {
          const path = tickRefs.current[index];
          path.style.strokeDasharray = "30";
          path.style.strokeDashoffset = "30";
          animate(path, {
            strokeDashoffset: [30, 0],
            duration: 350,
            ease: "outQuad"
          });
        }
      } else {
        next.delete(index);
      }
      return next;
    });
  };

  const readyCount = checkedIndices.size;
  const totalCount = docs.length;
  const progressRatio = totalCount > 0 ? readyCount / totalCount : 0;

  return (
    <div className={`documents-required ${className}`} id="documents-required">
      <SectionHeading
        index={sections.documents.index}
        label={sections.documents.label}
        title={sections.documents.title}
      />

      {/* Counter & Progress bar */}
      <div className="documents-required__status">
        <div className="documents-required__counter-row">
          <span className="documents-required__counter-label label">Checklist progress</span>
          <span className="documents-required__counter-val label numeral">
            {readyCount} of {totalCount} ready
          </span>
        </div>
        <div
          className="documents-required__progress-track"
          role="progressbar"
          aria-valuenow={readyCount}
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-label="Document preparation progress"
        >
          <div
            className="documents-required__progress-bar"
            style={{ transform: `scaleX(${progressRatio})` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      <ul className="documents-required__list" role="list">
        {docs.map((doc, idx) => {
          const isChecked = checkedIndices.has(idx);
          const inputId = `doc-check-${idx}`;

          return (
            <li key={doc} className="documents-required__item">
              <label htmlFor={inputId} className="documents-required__label">
                <input
                  id={inputId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleDoc(idx)}
                  className="documents-required__input sr-only"
                />
                <span
                  className={`documents-required__box ${
                    isChecked ? "documents-required__box--checked" : ""
                  }`}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="documents-required__tick-svg"
                    >
                      <polyline
                        ref={(el) => {
                          if (el) tickRefs.current[idx] = el;
                        }}
                        points="20 6 9 17 4 12"
                        className="documents-required__tick-path"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={`documents-required__text body ${
                    isChecked ? "documents-required__text--checked" : ""
                  }`}
                >
                  {doc}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DocumentsRequired;
