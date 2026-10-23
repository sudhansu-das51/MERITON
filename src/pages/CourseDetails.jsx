import { useParams } from "react-router-dom";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import Seo from "../components/common/Seo";
import CTABanner from "../components/common/CTABanner";
import CourseNotFound from "../components/courses/CourseNotFound";
import CourseDetailHero from "../components/courses/CourseDetailHero";
import CourseOverview from "../components/courses/CourseOverview";
import CourseSyllabus from "../components/courses/CourseSyllabus";
import CourseBatchSchedule from "../components/courses/CourseBatchSchedule";
import CourseFeeStructure from "../components/courses/CourseFeeStructure";
import CourseEligibility from "../components/courses/CourseEligibility";
import CourseFacultyList from "../components/courses/CourseFacultyList";
import CourseSidebarEnquiry from "../components/courses/CourseSidebarEnquiry";
import RelatedCourses from "../components/courses/RelatedCourses";
import { courses } from "../data/courses";
import { coursesPage } from "../data/coursesPage";
import { siteConfig } from "../data/siteConfig";
import { useEnquiry } from "../lib/EnquiryContext";
import "./CourseDetails.css";

export function CourseDetails() {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="course-details-page">
        <Seo title="Course not found" />
        <CourseNotFound />
      </div>
    );
  }

  const { cta } = coursesPage.details;

  const waText = encodeURIComponent(
    `Hi MERITON, I have questions about ${course.title} (${course.level}).`
  );
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`;

  return (
    <div className="course-details-page">
      <Seo
        title={`${course.title} ${course.level}`}
        description={course.summary}
      />

      {/* Hero (Tone: Deep) */}
      <CourseDetailHero course={course} />

      {/* Main Content (Tone: Main) */}
      <Section tone="main" className="course-details-content-section">
        <Container>
          <div className="course-details-layout">
            <div className="course-details-main">
              {/* 01 / Overview */}
              <CourseOverview course={course} />

              {/* 02 / Syllabus */}
              <CourseSyllabus course={course} />

              {/* 03 / Batches */}
              <CourseBatchSchedule course={course} />

              {/* 04 / Fees */}
              <CourseFeeStructure course={course} />

              {/* 05 / Eligibility */}
              <CourseEligibility course={course} />

              {/* In-flow sidebar on mobile screens (<900px) */}
              <div className="course-details-sidebar-mobile">
                <CourseSidebarEnquiry course={course} />
              </div>

              {/* 06 / Faculty */}
              <CourseFacultyList course={course} />
            </div>

            {/* Sticky Sidebar on desktop (>=900px) */}
            <div className="course-details-sidebar-col">
              <CourseSidebarEnquiry course={course} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Courses (Tone: Light / Lichen) */}
      <RelatedCourses currentCourse={course} />

      {/* CTA Banner (Tone: Main) */}
      <CTABanner
        tone="main"
        title={cta.title}
        line={cta.line}
        primary={{
          label: "Enquire now",
          onClick: () => openEnquiry({ course: course.title })
        }}
        secondary={{
          label: "WhatsApp",
          href: waUrl
        }}
      />
    </div>
  );
}

export default CourseDetails;
