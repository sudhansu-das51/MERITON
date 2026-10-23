import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./Tabs.css";

export function Tabs({
  tabs = [],
  value,
  onChange,
  ariaLabel = "Tabs",
  idPrefix = "tab",
  className = ""
}) {
  const tablistRef = useRef(null);
  const tabRefs = useRef({});
  const indicatorRef = useRef(null);
  const isInitialMount = useRef(true);

  // Update animated indicator position and width
  const updateIndicator = useCallback(() => {
    const activeEl = tabRefs.current[value];
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;

    const offsetLeft = activeEl.offsetLeft;
    const offsetWidth = activeEl.offsetWidth;

    if (prefersReducedMotion() || isInitialMount.current) {
      gsap.set(indicator, {
        x: offsetLeft,
        width: offsetWidth,
        opacity: 1
      });
      isInitialMount.current = false;
    } else {
      gsap.to(indicator, {
        x: offsetLeft,
        width: offsetWidth,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [value]);

  useEffect(() => {
    updateIndicator();

    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  // Keyboard navigation for roving tabIndex & accessibility
  const handleKeyDown = (e, currentIndex) => {
    let nextIndex = null;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      const nextTab = tabs[nextIndex];
      onChange?.(nextTab.id);
      const nextEl = tabRefs.current[nextTab.id];
      nextEl?.focus?.();
    }
  };

  return (
    <div className={`tabs-wrapper ${className}`}>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={ariaLabel}
        className="tabs__list"
      >
        {tabs.map((tab, idx) => {
          const isSelected = String(value) === String(tab.id);

          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current[tab.id] = el;
              }}
              role="tab"
              type="button"
              id={`${idPrefix}-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`${idPrefix}-panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange?.(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`tabs__tab label ${isSelected ? "tabs__tab--active" : ""}`}
            >
              <span className="tabs__label">{tab.label}</span>
              {tab.count !== undefined && (
                <span className="tabs__count numeral label" aria-hidden="true">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Sliding indicator */}
        <div ref={indicatorRef} className="tabs__indicator" aria-hidden="true" />
      </div>
    </div>
  );
}

export default Tabs;
