import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, ScrollTrigger, prefersReducedMotion } from "../../lib/motion";
import CourseCard from "./CourseCard";
import "./CourseGrid.css";

export function CourseGrid({
  courses = [],
  className = ""
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const cards = el.querySelectorAll(".course-card");
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: MOTION.yCard },
        {
          opacity: 1,
          y: 0,
          duration: DUR.card,
          stagger: MOTION.staggerCard,
          ease: EASE.focus,
          clearProps: "transform,opacity",
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }
      );
    },
    { scope: containerRef, dependencies: [courses] }
  );

  if (!courses.length) return null;

  return (
    <div ref={containerRef} className={`course-grid ${className}`}>
      <div className="course-grid__cards">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CourseGrid;
