import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import ImageWithFallback from "../common/ImageWithFallback";
import { faculty } from "../../data/faculty";
import { coursesPage } from "../../data/coursesPage";
import "./CourseFacultyList.css";

export function CourseFacultyList({ course, className = "" }) {
  if (!course?.facultyIds?.length) return null;

  const resolvedFaculty = course.facultyIds
    .map((id) => faculty.find((f) => f.id === id))
    .filter(Boolean);

  if (resolvedFaculty.length === 0) return null;

  const { sections } = coursesPage.details;

  return (
    <div className={`course-faculty ${className}`} id="course-faculty">
      <SectionHeading
        index="06"
        label={sections.faculty}
        title="Faculty & Mentors"
        linkTo="/faculty"
        linkLabel="All faculty"
      />

      <div className="course-faculty__grid">
        {resolvedFaculty.map((member) => (
          <Link
            key={member.id}
            to="/faculty"
            className="course-faculty__card"
            aria-label={`${member.name}, ${member.subject}`}
          >
            <div className="course-faculty__avatar">
              <ImageWithFallback
                src={member.photo}
                alt={member.name}
                ratio="1/1"
                duotone={true}
                label={member.subject}
              />
            </div>
            <div className="course-faculty__info">
              <h4 className="course-faculty__name">{member.name}</h4>
              <span className="course-faculty__subject">{member.subject}</span>
              <p className="course-faculty__qual">{member.qualification}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CourseFacultyList;
