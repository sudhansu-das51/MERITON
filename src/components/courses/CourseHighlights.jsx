import Reveal from "../animations/Reveal";
import "./CourseHighlights.css";

export function CourseHighlights({ highlights = [], className = "" }) {
  if (!highlights || !highlights.length) return null;

  return (
    <div className={`course-highlights ${className}`} role="list" aria-label="Course Highlights">
      {highlights.map((highlight, index) => {
        const numStr = String(index + 1).padStart(2, "0");

        return (
          <Reveal key={highlight} delay={index * 0.08} className="course-highlights__row" role="listitem">
            <span className="course-highlights__numeral" aria-hidden="true">
              {numStr}
            </span>
            <p className="course-highlights__text body">
              {highlight}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}

export default CourseHighlights;
