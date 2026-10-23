import Container from "../common/Container";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import StaggerGroup from "../animations/StaggerGroup";
import CourseCard from "./CourseCard";
import { courses } from "../../data/courses";
import { coursesPage } from "../../data/coursesPage";
import "./RelatedCourses.css";

export function RelatedCourses({ currentCourse, className = "" }) {
  if (!currentCourse) return null;

  const { sections } = coursesPage.details;

  // Filter out current course
  const otherCourses = courses.filter((c) => c.slug !== currentCourse.slug);

  // Same category first, then others
  const sameCategory = otherCourses.filter((c) => c.category === currentCourse.category);
  const differentCategory = otherCourses.filter((c) => c.category !== currentCourse.category);

  const related = [...sameCategory, ...differentCategory].slice(0, 3);

  if (!related.length) return null;

  return (
    <Section tone="light" className={`related-courses ${className}`} aria-labelledby="related-heading">
      <Container>
        <SectionHeading
          id="related-heading"
          index="07"
          label={sections.related}
          title="Other Recommended Programs"
          linkTo="/courses"
          linkLabel="All courses"
        />

        <StaggerGroup childSelector=".course-card" className="related-courses__grid">
          {related.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}

export default RelatedCourses;
