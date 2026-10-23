import { siteConfig } from "../../data/siteConfig.js";
import "./LegalSection.css";

function renderFormattedText(text) {
  if (!text || typeof text !== "string") return text;

  const parts = text.split(/(\{email\}|\{phone\}|\{address\}|\{careersEmail\})/g);

  return parts.map((part, i) => {
    if (part === "{email}") {
      const email = siteConfig.contact?.email || "hello@meriton.example";
      return (
        <a key={i} href={`mailto:${email}`} className="legal-link">
          {email}
        </a>
      );
    }
    if (part === "{phone}") {
      const phone = siteConfig.contact?.phone || "+91 00000 00000";
      const tel = phone.replace(/[^\d+]/g, "");
      return (
        <a key={i} href={`tel:${tel}`} className="legal-link">
          {phone}
        </a>
      );
    }
    if (part === "{careersEmail}") {
      const careersEmail =
        siteConfig.careersEmail ||
        siteConfig.contact?.careersEmail ||
        "careers@meriton.example";
      return (
        <a key={i} href={`mailto:${careersEmail}`} className="legal-link">
          {careersEmail}
        </a>
      );
    }
    if (part === "{address}") {
      const address = siteConfig.contact?.address || "MERITON Academy";
      return (
        <span key={i} className="legal-address">
          {address}
        </span>
      );
    }
    return part;
  });
}

export function LegalSection({ clause, className = "" }) {
  const { id, title, paragraphs = [], list = [], after = [] } = clause;

  return (
    <article id={id} className={`legal-clause ${className}`}>
      <h3 className="legal-clause__title h3">
        {title}
      </h3>

      {paragraphs.length > 0 && (
        <div className="legal-clause__paragraphs">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="legal-clause__paragraph body">
              {renderFormattedText(p)}
            </p>
          ))}
        </div>
      )}

      {list.length > 0 && (
        <ul className="legal-clause__list" role="list">
          {list.map((item, idx) => (
            <li key={idx} className="legal-clause__list-item body">
              <span className="legal-clause__bullet" aria-hidden="true">&bull;</span>
              <span className="legal-clause__list-text">{renderFormattedText(item)}</span>
            </li>
          ))}
        </ul>
      )}

      {after.length > 0 && (
        <div className="legal-clause__after">
          {after.map((p, idx) => (
            <p key={idx} className="legal-clause__paragraph body">
              {renderFormattedText(p)}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}

export default LegalSection;
