import SectionHeading from "../common/SectionHeading";
import Accordion from "../common/Accordion";
import { coursesPage } from "../../data/coursesPage";
import "./CourseSyllabus.css";

export function CourseSyllabus({ course, className = "" }) {
  if (!course?.syllabus?.length) return null;

  const { sections } = coursesPage.details;

  const accordionItems = course.syllabus.map((s, sIdx) => ({
    id: `subject-${sIdx}`,
    title: s.subject,
    content: (
      <ol className="course-syllabus__topics">
        {s.topics.map((topic, tIdx) => {
          const numStr = String(tIdx + 1).padStart(2, "0");
          return (
            <li key={topic} className="course-syllabus__topic">
              <span className="course-syllabus__topic-num" aria-hidden="true">
                {numStr}.
              </span>
              <span className="course-syllabus__topic-text">{topic}</span>
            </li>
          );
        })}
      </ol>
    )
  }));

  return (
    <div className={`course-syllabus ${className}`} id="course-syllabus">
      <SectionHeading
        index="02"
        label={sections.syllabus}
        title="Subject Syllabus & Modules"
      />

      <Accordion
        items={accordionItems}
        defaultOpenIndex={0}
        allowMultiple={true}
        className="course-syllabus__accordion"
      />
    </div>
  );
}

export default CourseSyllabus;
