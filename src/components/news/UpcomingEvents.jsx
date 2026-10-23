import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { animate } from "animejs";
import { isUpcoming, formatDate } from "../../lib/format.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import Container from "../common/Container";
import "./UpcomingEvents.css";

function parseEventDate(dateStr) {
  const [year, month, day] = String(dateStr).slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    dayStr: String(day).padStart(2, "0"),
    monthYearStr: `${months[date.getMonth()]} ${year}`.toUpperCase()
  };
}

export function UpcomingEvents({
  events = [],
  onSelectEvent,
  label = "Coming up",
  title = "Next events",
  className = ""
}) {
  const arrowRefs = useRef({});

  // Filter only upcoming events and sort soonest first (ascending by date)
  const upcoming = events
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  if (upcoming.length === 0) return null;

  const handleCellHover = (id) => {
    if (prefersReducedMotion()) return;
    const arrow = arrowRefs.current[id];
    if (arrow) {
      animate(arrow, {
        translateX: [0, 4, 0],
        duration: 300,
        ease: "outQuad"
      });
    }
  };

  const handleCellClick = (event) => {
    if (onSelectEvent) {
      onSelectEvent(event);
    }
  };

  const handleKeyDown = (e, event) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCellClick(event);
    }
  };

  return (
    <section
      className={`upcoming-band ${className}`}
      aria-label={`${label}: ${title}`}
    >
      <Container>
        <div className="upcoming-band__header">
          <span className="upcoming-band__label label">
            <Calendar size={14} aria-hidden="true" />
            <span>{title || label}</span>
          </span>
          <span className="upcoming-band__hint label">
            Click an event to view full calendar
          </span>
        </div>

        <div className="upcoming-band__grid" role="list">
          {upcoming.map((item) => {
            const { dayStr, monthYearStr } = parseEventDate(item.date);

            return (
              <div
                key={item.id}
                role="listitem"
                className="upcoming-band__item"
              >
                <div
                  role="button"
                  tabIndex="0"
                  className="upcoming-cell"
                  onClick={() => handleCellClick(item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  onMouseEnter={() => handleCellHover(item.id)}
                  aria-label={`Upcoming event: ${item.title} on ${formatDate(item.date)}`}
                >
                  <div className="upcoming-cell__date-block">
                    <span className="upcoming-cell__day numeral display-l">
                      {dayStr}
                    </span>
                    <span className="upcoming-cell__month label">
                      {monthYearStr}
                    </span>
                  </div>

                  <div className="upcoming-cell__content">
                    <h3 className="upcoming-cell__title">
                      {item.title}
                    </h3>

                    <div className="upcoming-cell__meta label">
                      <span>{item.time}</span>
                      <span className="upcoming-cell__sep" aria-hidden="true">&bull;</span>
                      <span>{item.venue}</span>
                    </div>
                  </div>

                  <span
                    ref={(el) => {
                      if (el) arrowRefs.current[item.id] = el;
                    }}
                    className="upcoming-cell__arrow"
                    aria-hidden="true"
                  >
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default UpcomingEvents;
