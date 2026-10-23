import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Laptop, Users } from "lucide-react";
import { courses } from "../../data/courses.js";
import { homeContent } from "../../data/home.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import SectionHeading from "../common/SectionHeading";
import FocusReveal from "../animations/FocusReveal";
import "./PopularCourses.css";

export function PopularCourses() {
  const { sections } = homeContent;
  const { openEnquiry } = useEnquiry();

  // Curate the 4 featured courses in exact visual priority order
  const featuredSlugs = [
    "jee-main-advanced-class-11",
    "neet-dropper",
    "neet-class-11",
    "foundation-class-10"
  ];

  const featuredCourses = featuredSlugs
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <section className="popular-courses section section--main" aria-labelledby="courses-heading">
      <div className="container">
        <FocusReveal cardSelector=".course-hcard">
          <SectionHeading
            id="courses-heading"
            index={sections.courses.index}
            label={sections.courses.label}
            title={sections.courses.title}
            linkTo="/courses"
            linkLabel={sections.courses.linkLabel}
          />

          <div className="popular-courses__grid">
          {featuredCourses.map((course) => {
            const batch = course.batches[0] || {
              seatsTotal: 40,
              seatsLeft: 12,
              startDate: "5 Apr 2027"
            };
            const seatsFilledPercent = Math.min(
              100,
              Math.round(((batch.seatsTotal - batch.seatsLeft) / batch.seatsTotal) * 100)
            );

            return (
              <article
                key={course.slug}
                className="course-hcard"
                aria-label={`${course.title}, ${course.level}`}
              >
                {/* Left Side: Course Thematic Visual */}
                <div className="course-hcard__media">
                  <img
                    src={course.image}
                    alt={`${course.title} study setup`}
                    className="course-hcard__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="course-hcard__media-overlay" aria-hidden="true" />
                </div>

                {/* Right Side: Course Editorial Content (White Surface) */}
                <div className="course-hcard__body">
                  <div className="course-hcard__top">
                    {/* Badge Row */}
                    <div className="course-hcard__badge-row">
                      <span className="course-hcard__pill">{course.category}</span>
                      <span className="course-hcard__target">{course.level}</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="course-hcard__title-group">
                      <h3 className="course-hcard__title">
                        <Link to={`/courses/${course.slug}`} className="course-hcard__title-link">
                          {course.title}
                        </Link>
                      </h3>
                      {course.subtitle && (
                        <p className="course-hcard__subtitle">{course.subtitle}</p>
                      )}
                    </div>

                    {/* Meta info row with icons */}
                    <div className="course-hcard__meta-row">
                      <div className="course-hcard__meta-item">
                        <Calendar size={15} className="course-hcard__meta-icon" aria-hidden="true" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="course-hcard__meta-item">
                        <Laptop size={15} className="course-hcard__meta-icon" aria-hidden="true" />
                        <span>{course.mode}</span>
                      </div>
                      <div className="course-hcard__meta-item">
                        <Calendar size={15} className="course-hcard__meta-icon" aria-hidden="true" />
                        <span>Starts {batch.startDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats & Actions */}
                  <div className="course-hcard__bottom">
                    {/* Seats Left & Total Fee block */}
                    <div className="course-hcard__metrics">
                      {/* Left: Seats Left with Progress Bar */}
                      <div className="course-hcard__metric-col">
                        <div className="course-hcard__metric-header">
                          <Users size={15} className="course-hcard__metric-icon" aria-hidden="true" />
                          <span className="course-hcard__metric-label">Seats Left</span>
                        </div>
                        <div className="course-hcard__metric-value">
                          {batch.seatsLeft} / {batch.seatsTotal}
                        </div>
                        <div className="course-hcard__progress-track" aria-hidden="true">
                          <div
                            className="course-hcard__progress-fill"
                            style={{ width: `${seatsFilledPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Right: Total Fee */}
                      <div className="course-hcard__metric-col course-hcard__metric-col--fee">
                        <span className="course-hcard__metric-label">Total Fee</span>
                        <div className="course-hcard__fee-value">
                          ₹ {course.fees.total.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="course-hcard__actions">
                      <Link
                        to={`/courses/${course.slug}`}
                        className="course-hcard__details-link"
                      >
                        <span>View Details</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEnquiry({ course: course.title })}
                        className="course-hcard__enroll-btn"
                        aria-label={`Enroll in ${course.title}`}
                      >
                        <span>Enroll Now</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        </FocusReveal>
      </div>
    </section>
  );
}

export default PopularCourses;
