import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Laptop, Users } from "lucide-react";
import { useEnquiry } from "../../lib/EnquiryContext";
import "./CourseCard.css";

export function CourseCard({ course, className = "" }) {
  const { openEnquiry } = useEnquiry();

  if (!course) return null;

  const batch = course.batches?.[0] || {
    seatsTotal: 40,
    seatsLeft: 12,
    startDate: "5 Apr 2027"
  };

  const seatsFilledPercent = Math.min(
    100,
    Math.max(0, Math.round(((batch.seatsTotal - batch.seatsLeft) / batch.seatsTotal) * 100))
  );

  return (
    <article
      className={`course-card ${className}`}
      aria-label={`${course.title}, ${course.level}`}
    >
      {/* Left Side: Course Thematic Visual */}
      <div className="course-card__media">
        <img
          src={course.image}
          alt={`${course.title} study setup`}
          className="course-card__img"
          loading="lazy"
          decoding="async"
        />
        <div className="course-card__media-overlay" aria-hidden="true" />
      </div>

      {/* Right Side: Course Editorial Content (White Surface) */}
      <div className="course-card__body">
        <div className="course-card__top">
          {/* Badge Row */}
          <div className="course-card__badge-row">
            <span className="course-card__pill">{course.category}</span>
            <span className="course-card__target">{course.level}</span>
          </div>

          {/* Title & Subtitle */}
          <div className="course-card__title-group">
            <h3 className="course-card__title">
              <Link to={`/courses/${course.slug}`} className="course-card__title-link">
                {course.title}
              </Link>
            </h3>
            {course.subtitle && (
              <p className="course-card__subtitle">{course.subtitle}</p>
            )}
          </div>

          {/* Meta info row with icons */}
          <div className="course-card__meta-row">
            <div className="course-card__meta-item">
              <Calendar size={15} className="course-card__meta-icon" aria-hidden="true" />
              <span>{course.duration}</span>
            </div>
            <div className="course-card__meta-item">
              <Laptop size={15} className="course-card__meta-icon" aria-hidden="true" />
              <span>{course.mode}</span>
            </div>
            <div className="course-card__meta-item">
              <Calendar size={15} className="course-card__meta-icon" aria-hidden="true" />
              <span>Starts {batch.startDate}</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats & Actions */}
        <div className="course-card__bottom">
          {/* Seats Left & Total Fee block */}
          <div className="course-card__metrics">
            {/* Left: Seats Left with Progress Bar */}
            <div className="course-card__metric-col">
              <div className="course-card__metric-header">
                <Users size={15} className="course-card__metric-icon" aria-hidden="true" />
                <span className="course-card__metric-label">Seats Left</span>
              </div>
              <div className="course-card__metric-value">
                {batch.seatsLeft} / {batch.seatsTotal}
              </div>
              <div className="course-card__progress-track" aria-hidden="true">
                <div
                  className="course-card__progress-fill"
                  style={{ width: `${seatsFilledPercent}%` }}
                />
              </div>
            </div>

            {/* Right: Total Fee */}
            <div className="course-card__metric-col course-card__metric-col--fee">
              <span className="course-card__metric-label">Total Fee</span>
              <div className="course-card__fee-value">
                ₹ {course.fees?.total?.toLocaleString("en-IN") || course.fees?.total}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="course-card__actions">
            <Link
              to={`/courses/${course.slug}`}
              className="course-card__details-link"
            >
              <span>View Details</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => openEnquiry({ course: course.title })}
              className="course-card__enroll-btn"
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
}

export default CourseCard;
