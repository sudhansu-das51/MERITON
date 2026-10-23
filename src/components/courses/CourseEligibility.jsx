import { useRef, useEffect } from "react";
import { animate, stagger } from "animejs";
import SectionHeading from "../common/SectionHeading";
import { coursesPage } from "../../data/coursesPage";
import { prefersReducedMotion } from "../../lib/motion";
import "./CourseEligibility.css";

export function CourseEligibility({ course, className = "" }) {
  const listRef = useRef(null);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const paths = listEl.querySelectorAll(".course-eligibility__tick-path");
    if (!paths.length) return;

    if (prefersReducedMotion()) {
      paths.forEach((p) => {
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    // Set initial stroke dash properties
    paths.forEach((p) => {
      p.style.strokeDasharray = "30";
      p.style.strokeDashoffset = "30";
    });

    let observer = null;
    let animInstance = null;

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          animInstance = animate(paths, {
            strokeDashoffset: [30, 0],
            duration: 500,
            delay: stagger(120),
            ease: "outQuad"
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(listEl);

    return () => {
      if (observer) observer.disconnect();
      if (animInstance) animInstance.revert?.();
    };
  }, [course]);

  if (!course?.eligibility?.length) return null;

  const { sections } = coursesPage.details;

  return (
    <div className={`course-eligibility ${className}`} id="course-eligibility">
      <SectionHeading
        index="05"
        label={sections.eligibility}
        title="Admission Eligibility Criteria"
      />

      <ul ref={listRef} className="course-eligibility__list">
        {course.eligibility.map((criterion) => (
          <li key={criterion} className="course-eligibility__item">
            <span className="course-eligibility__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  className="course-eligibility__tick-path"
                />
              </svg>
            </span>
            <p className="course-eligibility__text body">
              {criterion}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseEligibility;
