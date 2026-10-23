import { Phone } from "lucide-react";
import Button from "../common/Button";
import WhatsAppIcon from "../common/WhatsAppIcon";
import { useEnquiry } from "../../lib/EnquiryContext";
import { siteConfig } from "../../data/siteConfig";
import { formatRupees, formatDate } from "../../lib/format";
import "./CourseSidebarEnquiry.css";

export function CourseSidebarEnquiry({ course, className = "" }) {
  const { openEnquiry } = useEnquiry();

  if (!course) return null;

  const batch = course.batches?.[0] || {
    startDate: siteConfig.nextBatchDate,
    seatsTotal: 40,
    seatsLeft: 12
  };

  const seatsFilledPercent = Math.min(
    100,
    Math.max(0, Math.round(((batch.seatsTotal - batch.seatsLeft) / batch.seatsTotal) * 100))
  );

  const waText = encodeURIComponent(
    `Hi MERITON, I want details about ${course.title} (${course.level}).`
  );
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`;

  return (
    <aside className={`course-sidebar ${className}`} aria-label="Course admissions summary">
      <div className="course-sidebar__header">
        <span className="course-sidebar__label">Admissions Open</span>
        <h3 className="course-sidebar__title">{course.title}</h3>
      </div>

      <div className="course-sidebar__metrics">
        <div className="course-sidebar__metric-item">
          <span className="course-sidebar__metric-label">Next Batch Date</span>
          <span className="course-sidebar__metric-value">
            {formatDate(batch.startDate)}
          </span>
        </div>

        <div className="course-sidebar__metric-item">
          <span className="course-sidebar__metric-label">Availability</span>
          <span className="course-sidebar__metric-value">
            {batch.seatsLeft} seats remaining ({batch.seatsTotal - batch.seatsLeft} enrolled)
          </span>
          <div
            className="course-sidebar__seats-bar"
            role="progressbar"
            aria-valuenow={seatsFilledPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="course-sidebar__seats-fill"
              style={{ width: `${seatsFilledPercent}%` }}
            />
          </div>
        </div>

        <div className="course-sidebar__price-box">
          <span className="course-sidebar__price-label">Program Fee (Total)</span>
          <span className="course-sidebar__price">
            {formatRupees(course.fees?.total)}
          </span>
        </div>
      </div>

      <div className="course-sidebar__actions">
        <Button
          variant="primary"
          onClick={() => openEnquiry({ course: course.title })}
          fullWidth
          showArrow
        >
          Enquire now
        </Button>

        <div className="course-sidebar__contact-links">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/[\s-]/g, "")}`}
            className="course-sidebar__contact-link"
          >
            <Phone size={14} aria-hidden="true" />
            <span>Call desk</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="course-sidebar__contact-link"
          >
            <WhatsAppIcon size={14} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default CourseSidebarEnquiry;
