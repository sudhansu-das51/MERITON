import { useRef } from "react";
import { Play } from "lucide-react";
import { animate } from "animejs";
import ImageWithFallback from "../common/ImageWithFallback";
import { prefersReducedMotion } from "../../lib/motion.js";
import { extractYouTubeId } from "./youtube.js";
import "./VideoTestimonialCard.css";

export function VideoTestimonialCard({
  testimonial,
  onPlay,
  playLabel = "Play video",
  className = ""
}) {
  const playBtnRef = useRef(null);
  const { id, name, result, course, videoUrl, poster } = testimonial;

  const videoId = extractYouTubeId(videoUrl);
  if (!videoId) return null;

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !playBtnRef.current) return;
    animate(playBtnRef.current, {
      scale: [1, 1.1, 1],
      duration: 350,
      ease: "outQuad"
    });
  };

  const handleClick = () => {
    if (onPlay) {
      onPlay(testimonial, videoId);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={`video-card ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex="0"
      aria-label={`${playLabel}: ${name}, ${result}`}
    >
      {/* 16:9 Poster with centered 56px play button */}
      <div className="video-card__frame">
        <ImageWithFallback
          src={poster}
          alt={`Video thumbnail for ${name}`}
          ratio="16/9"
          duotone={false}
          className="video-card__poster"
        />

        <div className="video-card__overlay">
          <div ref={playBtnRef} className="video-card__play-btn" aria-hidden="true">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Info below poster */}
      <div className="video-card__info">
        <h3 id={`video-title-${id}`} className="video-card__name">
          {name}
        </h3>
        <span className="video-card__course label">
          {course}
        </span>
        {result && (
          <span className="video-card__result label">
            {result}
          </span>
        )}
      </div>
    </article>
  );
}

export default VideoTestimonialCard;
