import Container from "../common/Container";
import Section from "../common/Section";
import Button from "../common/Button";
import Reveal from "../animations/Reveal";
import { useEnquiry } from "../../lib/EnquiryContext";
import { coursesPage } from "../../data/coursesPage";
import "./CourseNotFound.css";

export function CourseNotFound({ className = "" }) {
  const { openEnquiry } = useEnquiry();
  const { notFound } = coursesPage.details;

  return (
    <Section tone="main" className={`course-not-found-section ${className}`}>
      <Container>
        <div className="course-not-found">
          <Reveal delay={0.05} className="course-not-found__label label">
            &mdash; {notFound.label}
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="course-not-found__title display-l">
              Course not found
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="course-not-found__line body">
              {notFound.line}
            </p>
          </Reveal>
          <Reveal delay={0.35} className="course-not-found__actions">
            <Button variant="primary" to="/courses" showArrow>
              All courses
            </Button>
            <Button variant="secondary" onClick={() => openEnquiry()}>
              Enquire now
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export default CourseNotFound;
