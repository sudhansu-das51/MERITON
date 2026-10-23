import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ResourceCard from "./ResourceCard";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./ResourceGrid.css";

gsap.registerPlugin(ScrollTrigger);

export function ResourceGrid({
  resources = [],
  downloadLabel = "Download",
  emptyState = {},
  onClear,
  filterKey = "",
  className = ""
}) {
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      const items = gridRef.current.querySelectorAll(".resource-grid__item");
      if (!items.length) return;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        // Fast 0.35s re-stagger on filter change
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.out",
            onComplete: () => ScrollTrigger.refresh()
          }
        );
      }
    },
    { scope: gridRef, dependencies: [filterKey, resources.length] }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [resources.length]);

  if (resources.length === 0) {
    return (
      <div className="resource-grid__empty-wrapper">
        <EmptyState
          title={emptyState.title || "No resource matches"}
          line={emptyState.line || "Try another class, subject or type."}
        >
          {onClear && (
            <Button variant="secondary" onClick={onClear}>
              Clear filters
            </Button>
          )}
        </EmptyState>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={`resource-grid ${className}`}
      role="list"
      aria-label="Study materials and resources"
    >
      {resources.map((res) => (
        <div key={res.id} className="resource-grid__item" role="listitem">
          <ResourceCard resource={res} downloadLabel={downloadLabel} />
        </div>
      ))}
    </div>
  );
}

export default ResourceGrid;
