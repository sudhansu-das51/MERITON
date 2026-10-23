import { useRef } from "react";
import { Phone, Navigation, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./BranchList.css";

gsap.registerPlugin(ScrollTrigger);

export function BranchList({
  branches = [],
  selectedId = "",
  onSelect,
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

  const hasMultiple = branches.length > 1;

  return (
    <div
      ref={containerRef}
      className={`branch-list ${className}`}
      role={hasMultiple ? "group" : undefined}
      aria-label={hasMultiple ? "Select a campus branch" : undefined}
    >
      <div className="branch-list__rows">
        {branches.map((branch) => {
          const isSelected = branch.id === selectedId;
          const phoneTel = branch.phone ? `tel:${branch.phone.replace(/[\s-]/g, "")}` : "#";
          const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            branch.address
          )}`;

          return (
            <div
              key={branch.id}
              ref={addRow}
              className={`branch-list__item ${isSelected ? "branch-list__item--selected" : ""}`}
            >
              {hasMultiple ? (
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect?.(branch)}
                  className="branch-list__select-btn"
                >
                  <div className="branch-list__header">
                    <span className="branch-list__name h3">{branch.name}</span>
                    <span
                      className={`branch-list__indicator ${
                        isSelected ? "branch-list__indicator--active" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? <Check size={14} /> : null}
                    </span>
                  </div>

                  <p className="branch-list__address body">{branch.address}</p>

                  {branch.note && (
                    <span className="branch-list__note label">{branch.note}</span>
                  )}
                </button>
              ) : (
                <div className="branch-list__static-content">
                  <div className="branch-list__header">
                    <span className="branch-list__name h3">{branch.name}</span>
                  </div>
                  <p className="branch-list__address body">{branch.address}</p>
                  {branch.note && (
                    <span className="branch-list__note label">{branch.note}</span>
                  )}
                </div>
              )}

              {/* Action links */}
              <div className="branch-list__actions">
                <a
                  href={phoneTel}
                  className="branch-list__action-link label"
                  aria-label={`Call ${branch.name}`}
                >
                  <Phone size={13} aria-hidden="true" />
                  <span>{branch.phone}</span>
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="branch-list__action-link label"
                  aria-label={`Get directions to ${branch.name}`}
                >
                  <Navigation size={13} aria-hidden="true" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BranchList;
