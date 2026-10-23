import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./SectionHeading.css";

export function SectionHeading({
  index,
  label,
  title,
  linkTo,
  linkLabel,
  hint,
  id,
  className = ""
}) {
  return (
    <div className={`section-heading ${className}`}>
      <div className="section-heading__main">
        {title && (
          <h2 id={id} className="section-heading__title h2 focus-heading">
            {title}
          </h2>
        )}
        {hint && (
          <span className="section-heading__hint label focus-subtext">{hint}</span>
        )}
      </div>

      {linkTo && linkLabel && (
        <div className="section-heading__action focus-cta">
          <Link to={linkTo} className="section-heading__link">
            <span>{linkLabel}</span>
            <ArrowRight size={16} aria-hidden="true" className="section-heading__arrow" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SectionHeading;
