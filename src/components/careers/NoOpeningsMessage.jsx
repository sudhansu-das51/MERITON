import { siteConfig } from "../../data/siteConfig.js";
import { careersPage } from "../../data/careersPage.js";
import "./NoOpeningsMessage.css";

export function NoOpeningsMessage({
  title = careersPage.noOpenings.title,
  line = careersPage.noOpenings.line,
  emailLabel = careersPage.noOpenings.emailLabel,
  className = ""
}) {
  const email = siteConfig.careersEmail || siteConfig.contact?.careersEmail || "careers@meriton.example";

  return (
    <div className={`no-openings ${className}`}>
      <div className="no-openings__content">
        <h3 className="no-openings__title display-l">
          {title}
        </h3>
        <p className="no-openings__line body">
          {line}
        </p>
        <div className="no-openings__action">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("General application - Prospective faculty / staff")}`}
            className="no-openings__link label"
          >
            {emailLabel} ({email})
          </a>
        </div>
      </div>
    </div>
  );
}

export default NoOpeningsMessage;
