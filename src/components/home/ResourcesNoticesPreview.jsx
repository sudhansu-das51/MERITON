import { Link } from "react-router-dom";
import { Download, ArrowRight } from "lucide-react";
import { resources } from "../../data/resources.js";
import { news } from "../../data/news.js";
import { homeContent } from "../../data/home.js";
import SectionHeading from "../common/SectionHeading";
import FocusReveal from "../animations/FocusReveal";
import "./ResourcesNoticesPreview.css";

// Helper for date formatting
function parseDateParts(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return { day, month };
}

export function ResourcesNoticesPreview() {
  const { sections } = homeContent;
  const studyMaterials = resources.slice(0, 5);
  const notices = news
    .filter((n) => n.type === "notice")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section
      className="resources-notices section section--main"
      aria-labelledby="resources-heading"
    >
      <div className="container">
        <FocusReveal cardSelector=".resources-notices__col">
          <SectionHeading
            id="resources-heading"
            index={sections.resourcesNotices.index}
            label={sections.resourcesNotices.label}
            title={sections.resourcesNotices.title}
          />

          <div className="resources-notices__grid">
            {/* Left Column: Study Material */}
            <div className="resources-notices__col">
              <div className="resources-notices__col-header">
                <h3 className="resources-notices__subheading h3">Study material</h3>
                <span className="resources-notices__col-tag label">PDF Downloads</span>
              </div>

              <div className="resources-notices__list" role="list">
                {studyMaterials.map((res) => (
                  <Link
                    key={res.id}
                    to="/resources"
                    className="resources-notices__row resources-notices__row--material"
                    role="listitem"
                  >
                    <div className="resources-notices__row-main">
                      <span className="resources-notices__item-title small">
                        {res.title}
                      </span>
                      <div className="resources-notices__item-meta label">
                        <span>{res.class}</span>
                        <span className="resources-notices__sep" aria-hidden="true">&bull;</span>
                        <span>{res.subject}</span>
                        <span className="resources-notices__sep" aria-hidden="true">&bull;</span>
                        <span>{res.type} ({res.size})</span>
                      </div>
                    </div>
                    <span className="resources-notices__action-icon" aria-hidden="true">
                      <Download size={16} />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="resources-notices__footer-link focus-cta">
                <Link to="/resources" className="resources-notices__link label">
                  <span>All resources</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Column: Notice Board */}
            <div className="resources-notices__col">
              <div className="resources-notices__col-header">
                <h3 className="resources-notices__subheading h3">Notice board</h3>
                <span className="resources-notices__col-tag label">Recent Updates</span>
              </div>

              <div className="resources-notices__list" role="list">
                {notices.map((item) => {
                  const { day, month } = parseDateParts(item.date);
                  return (
                    <Link
                      key={item.id}
                      to="/news-events"
                      className="resources-notices__row resources-notices__row--notice"
                      role="listitem"
                    >
                      <div className="resources-notices__date-block" aria-hidden="true">
                        <span className="resources-notices__date-day display-l numeral">
                          {String(day).padStart(2, "0")}
                        </span>
                        <span className="resources-notices__date-month label">
                          {month}
                        </span>
                      </div>

                      <div className="resources-notices__notice-body">
                        <span className="resources-notices__item-title small">
                          {item.title}
                        </span>
                        <div className="resources-notices__item-meta label">
                          <span>{item.venue || "Academy Notice"}</span>
                        </div>
                      </div>

                      <span className="resources-notices__action-icon" aria-hidden="true">
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="resources-notices__footer-link focus-cta">
                <Link to="/news-events" className="resources-notices__link label">
                  <span>All notices</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </FocusReveal>
      </div>
    </section>
  );
}

export default ResourcesNoticesPreview;
