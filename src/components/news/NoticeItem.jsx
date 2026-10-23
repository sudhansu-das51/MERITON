import { useRef } from "react";
import { Download } from "lucide-react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./NoticeItem.css";

function parseNoticeDate(dateStr) {
  const [year, month, day] = String(dateStr).slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    dayStr: String(day).padStart(2, "0"),
    monthStr: months[date.getMonth()].toUpperCase(),
    yearStr: String(year)
  };
}

export function NoticeItem({
  notice,
  downloadLabel = "Download PDF",
  className = ""
}) {
  const iconRef = useRef(null);
  const { id, title, date, summary, fileUrl, size = "1 KB", image } = notice;
  const { dayStr, monthStr } = parseNoticeDate(date);

  const handleDownloadHover = () => {
    if (prefersReducedMotion() || !iconRef.current) return;
    animate(iconRef.current, {
      translateY: [0, 3, 0],
      duration: 350,
      ease: "outQuad"
    });
  };

  return (
    <article
      className={`notice-item ${className}`}
      aria-labelledby={`notice-title-${id}`}
    >
      {/* Date block */}
      <div className="notice-item__date-block" aria-hidden="true">
        <span className="notice-item__date-day numeral display-l">
          {dayStr}
        </span>
        <span className="notice-item__date-month label">
          {monthStr}
        </span>
      </div>

      {/* Main content */}
      <div className="notice-item__content">
        <div className="notice-item__header">
          <h3 id={`notice-title-${id}`} className="notice-item__title">
            {title}
          </h3>
          <span className="notice-item__file-info label">
            PDF &middot; {size}
          </span>
        </div>

        {summary && (
          <p className="notice-item__summary body">
            {summary}
          </p>
        )}
      </div>

      {/* 3:4 aspect ratio preview image revealed on hover */}
      {image && (
        <div className="notice-item__preview" aria-hidden="true">
          <div className="notice-item__preview-frame">
            <img
              src={image}
              alt=""
              className="notice-item__preview-img"
              loading="lazy"
            />
            <div className="notice-item__preview-overlay" />
            <div className="notice-item__preview-corner notice-item__preview-corner--tl" />
            <div className="notice-item__preview-corner notice-item__preview-corner--br" />
          </div>
        </div>
      )}

      {/* Download action link */}
      {fileUrl && (
        <div className="notice-item__action">
          <a
            href={fileUrl}
            download
            className="notice-item__download-btn label"
            aria-label={`${downloadLabel}: ${title} (PDF, ${size})`}
            onMouseEnter={handleDownloadHover}
          >
            <span ref={iconRef} className="notice-item__download-icon" aria-hidden="true">
              <Download size={15} />
            </span>
            <span>{downloadLabel}</span>
          </a>
        </div>
      )}
    </article>
  );
}

export default NoticeItem;
