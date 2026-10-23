import { useState } from "react";
import "./ImageWithFallback.css";

export function ImageWithFallback({
  src,
  alt = "",
  ratio = "4/5",
  duotone = true,
  label,
  className = "",
  loading = "lazy",
  decoding = "async"
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showPlaceholder = !src || hasError;

  return (
    <div
      className={`img-frame ${duotone ? "img-frame--duotone" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!showPlaceholder ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          className={`img-frame__image ${isLoaded ? "img-frame__image--loaded" : ""}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="img-frame__placeholder" role="img" aria-label={alt || label || "Photo placeholder"}>
          <div className="img-frame__grid" aria-hidden="true" />
          <div className="img-frame__corner img-frame__corner--tl" aria-hidden="true" />
          <div className="img-frame__corner img-frame__corner--br" aria-hidden="true" />
          <span className="img-frame__label label" aria-hidden="true">
            {label || alt || "MERITON ARCHIVE"}
          </span>
        </div>
      )}
      {duotone && !showPlaceholder && (
        <div className="img-frame__overlay" aria-hidden="true" />
      )}
    </div>
  );
}

export default ImageWithFallback;
