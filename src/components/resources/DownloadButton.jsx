import { useRef } from "react";
import { Download } from "lucide-react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./DownloadButton.css";

export function DownloadButton({
  fileUrl,
  title,
  format = "PDF",
  size = "",
  label = "Download",
  className = ""
}) {
  const btnRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !iconRef.current) return;
    animate(iconRef.current, {
      translateY: [0, 3, 0],
      duration: 350,
      ease: "outQuad"
    });
  };

  const handleClick = () => {
    if (prefersReducedMotion() || !btnRef.current) return;
    animate(btnRef.current, {
      scale: [1, 0.96, 1],
      duration: 200,
      ease: "outQuad"
    });
  };

  const ariaLabel = `${label} ${title} (${format}${size ? `, ${size}` : ""})`;

  return (
    <a
      ref={btnRef}
      href={fileUrl}
      download
      className={`btn btn--secondary download-button ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      <span ref={iconRef} className="download-button__icon" aria-hidden="true">
        <Download size={16} />
      </span>
      <span className="download-button__text">{label}</span>
    </a>
  );
}

export default DownloadButton;
