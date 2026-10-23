import SectionHeading from "../common/SectionHeading";
import Reveal from "../animations/Reveal";
import CourseHighlights from "./CourseHighlights";
import { coursesPage } from "../../data/coursesPage";
import "./CourseOverview.css";

export function CourseOverview({ course, className = "" }) {
  if (!course) return null;

  const { sections } = coursesPage.details;

  return (
    <div className={`course-overview ${className}`} id="course-overview">
      <SectionHeading
        index="01"
        label={sections.overview}
        title="Program Overview & Key Pillars"
      />

      {course.overview && (
        <Reveal delay={0.1}>
          <p className="course-overview__text body">
            {course.overview}
          </p>
        </Reveal>
      )}

      <CourseHighlights highlights={course.highlights} />
    </div>
  );
}

export default CourseOverview;
