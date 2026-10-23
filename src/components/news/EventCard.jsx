import ImageWithFallback from "../common/ImageWithFallback";
import { isUpcoming } from "../../lib/format.js";
import "./EventCard.css";

function parseEventDate(dateStr) {
  const [year, month, day] = String(dateStr).slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    dayStr: String(day).padStart(2, "0"),
    monthStr: months[date.getMonth()].toUpperCase(),
    yearStr: String(year)
  };
}

export function EventCard({
  event,
  labels = { upcoming: "Upcoming", past: "Past" },
  className = ""
}) {
  const { id, title, date, summary, time, venue, mode, image } = event;
  const upcoming = isUpcoming(date);
  const { dayStr, monthStr, yearStr } = parseEventDate(date);

  return (
    <article
      className={`event-card ${upcoming ? "event-card--upcoming" : "event-card--past"} ${className}`}
      aria-labelledby={`event-title-${id}`}
    >
      {/* 16:10 Duotone image with mode tag and status badge overlay */}
      <div className="event-card__frame">
        <ImageWithFallback
          src={image}
          alt={`Event cover for ${title}`}
          ratio="16/10"
          duotone={false}
          className="event-card__image"
        />

        <div className="event-card__tags">
          {mode && (
            <span className="event-card__tag event-card__tag--mode label">
              {mode}
            </span>
          )}
          <span
            className={`event-card__badge ${upcoming ? "event-card__badge--upcoming" : "event-card__badge--past"} label`}
          >
            {upcoming ? labels.upcoming : labels.past}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="event-card__body">
        <div className="event-card__date-row">
          <div className="event-card__date-block" aria-hidden="true">
            <span className="event-card__day numeral display-l">{dayStr}</span>
            <span className="event-card__month-year label">{monthStr} {yearStr}</span>
          </div>

          <div className="event-card__meta label">
            <span>{time}</span>
            <span className="event-card__sep" aria-hidden="true">&bull;</span>
            <span>{venue}</span>
          </div>
        </div>

        <h3 id={`event-title-${id}`} className="event-card__title">
          {title}
        </h3>

        {summary && (
          <p className="event-card__summary body">
            {summary}
          </p>
        )}
      </div>
    </article>
  );
}

export default EventCard;
