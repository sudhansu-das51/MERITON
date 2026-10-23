import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FacultyCard from "./FacultyCard";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./FacultyGrid.css";

gsap.registerPlugin(ScrollTrigger);

export function FacultyGrid({
  facultyList = [],
  onSelectMember,
  selectedSubject = "All",
  className = ""
}) {
  const gridRef = useRef(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".faculty-card");
      if (!cards.length) return;

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        // Quick re-stagger when filter changes
        gsap.fromTo(
          cards,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            onComplete: () => ScrollTrigger.refresh()
          }
        );
      }
    },
    { scope: gridRef, dependencies: [selectedSubject, facultyList.length] }
  );

  useEffect(() => {
    // Refresh ScrollTrigger when list changes
    ScrollTrigger.refresh();
  }, [facultyList.length]);

  return (
    <div ref={gridRef} className={`faculty-grid ${className}`} role="list">
      {facultyList.map((member) => (
        <div key={member.id} className="faculty-grid__item" role="listitem">
          <FacultyCard member={member} onSelect={onSelectMember} />
        </div>
      ))}
    </div>
  );
}

export default FacultyGrid;
