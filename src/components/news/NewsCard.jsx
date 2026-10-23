import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";
import ImageWithFallback from "../common/ImageWithFallback";
import { formatDate } from "../../lib/format.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./NewsCard.css";

export function NewsCard({
  article,
  labels = { more: "Read more", less: "Show less" },
  className = ""
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const bodyRef = useRef(null);
  const iconRef = useRef(null);
  const isInitial = useRef(true);

  const { id, title, date, summary, body, image } = article;

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    if (isInitial.current) {
      isInitial.current = false;
      gsap.set(el, { height: 0, opacity: 0 });
      return;
    }

    if (prefersReducedMotion()) {
      if (isExpanded) {
        gsap.set(el, { height: "auto", opacity: 1 });
      } else {
        gsap.set(el, { height: 0, opacity: 0 });
      }
      ScrollTrigger.refresh();
      return;
    }

    if (isExpanded) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => ScrollTrigger.refresh()
      });
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);

    if (!prefersReducedMotion() && iconRef.current) {
      animate(iconRef.current, {
        translateY: isExpanded ? [0, -2, 0] : [0, 2, 0],
        duration: 250,
        ease: "outQuad"
      });
    }
  };

  return (
    <article
      className={`news-card ${className}`}
      aria-labelledby={`news-title-${id}`}
    >
      <div className="news-card__frame">
        <ImageWithFallback
          src={image}
          alt={`Image for ${title}`}
          ratio="16/10"
          duotone={false}
          className="news-card__image"
        />
      </div>

      <div className="news-card__content">
        <div className="news-card__meta label">
          <time dateTime={date}>{formatDate(date)}</time>
        </div>

        <h3 id={`news-title-${id}`} className="news-card__title">
          {title}
        </h3>

        {summary && (
          <p className="news-card__summary body">
            {summary}
          </p>
        )}

        {/* Expandable body text */}
        {body && (
          <div
            ref={bodyRef}
            id={`news-body-${id}`}
            className="news-card__body-wrapper"
            style={{ overflow: "hidden" }}
          >
            <p className="news-card__body-text body">
              {body}
            </p>
          </div>
        )}

        {/* Toggle read more */}
        {body && (
          <div className="news-card__footer">
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isExpanded}
              aria-controls={`news-body-${id}`}
              className="news-card__toggle label"
            >
              <span>{isExpanded ? labels.less : labels.more}</span>
              <span
                ref={iconRef}
                className={`news-card__toggle-icon ${isExpanded ? "news-card__toggle-icon--rotated" : ""}`}
                aria-hidden="true"
              >
                <ChevronDown size={14} />
              </span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default NewsCard;
