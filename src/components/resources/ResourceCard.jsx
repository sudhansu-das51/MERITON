import { useState } from "react";
import DownloadButton from "./DownloadButton";
import "./ResourceCard.css";

export function ResourceCard({
  resource,
  downloadLabel = "Download",
  className = ""
}) {
  const {
    id,
    title,
    class: classNameProp,
    subject,
    type,
    format = "PDF",
    size,
    fileUrl,
    image
  } = resource;

  const [imgSrc, setImgSrc] = useState(image || "/images/resources/physics-kinematics.jpg");

  return (
    <article
      className={`resource-card ${className}`}
      aria-labelledby={`resource-title-${id}`}
    >
      <div className="resource-card__media">
        <img
          src={imgSrc}
          alt={`${title} cover thumbnail`}
          className="resource-card__image"
          loading="lazy"
          onError={() => setImgSrc("/images/resources/physics-kinematics.jpg")}
        />
        <div className="resource-card__overlay-gradient" aria-hidden="true" />
        <div className="resource-card__badges">
          <span className="resource-card__tag label">{type}</span>
          <span className="resource-card__file-badge label">
            {format} &middot; {size}
          </span>
        </div>
      </div>

      <div className="resource-card__content">
        <div className="resource-card__body">
          <h3 id={`resource-title-${id}`} className="resource-card__title" title={title}>
            {title}
          </h3>

          <div className="resource-card__meta label">
            <span>{classNameProp}</span>
            <span className="resource-card__sep" aria-hidden="true">&middot;</span>
            <span>{subject}</span>
          </div>
        </div>

        <div className="resource-card__footer">
          <DownloadButton
            fileUrl={fileUrl}
            title={title}
            format={format}
            size={size}
            label={downloadLabel}
          />
        </div>
      </div>
    </article>
  );
}

export default ResourceCard;
