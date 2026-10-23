import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../../lib/motion.js";
import { legalPage } from "../../data/legalPage.js";
import "./TableOfContents.css";

export function TableOfContents({
  documents = [],
  activeId = "",
  onNavigate,
  ariaLabel = legalPage.toc.aria,
  className = ""
}) {
  const navRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !navRef.current) return;

    const activeTick = navRef.current.querySelector(
      ".toc-link--active .toc-link__tick"
    );
    if (activeTick) {
      animate(activeTick, {
        scale: [0.6, 1],
        opacity: [0.4, 1],
        duration: 250,
        ease: "outQuad"
      });
    }
  }, [activeId]);

  const handleClick = (e, id) => {
    e.preventDefault();
    onNavigate?.(id);
  };

  return (
    <nav
      ref={navRef}
      className={`toc-nav ${className}`}
      aria-label={ariaLabel}
    >
      <div className="toc-nav__header label" aria-hidden="true">
        <span>Contents</span>
      </div>

      <ul className="toc-nav__list" role="list">
        {documents.map((doc) => {
          const isActive = activeId === doc.id;

          return (
            <li key={doc.id} className="toc-nav__item">
              <a
                href={`#${doc.id}`}
                onClick={(e) => handleClick(e, doc.id)}
                className={`toc-link ${isActive ? "toc-link--active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="toc-link__tick" aria-hidden="true" />
                <span className="toc-link__label label">{doc.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
