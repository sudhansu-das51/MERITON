import ImageWithFallback from "../common/ImageWithFallback";
import "./TestimonialCard.css";

export function TestimonialCard({
  testimonial,
  className = ""
}) {
  const { id, name, relation, course, year, result, quote, photo } = testimonial;

  return (
    <article
      className={`testimonial-card ${className}`}
      aria-labelledby={`story-author-${id}`}
    >
      <blockquote className="testimonial-card__quote">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="testimonial-card__footer">
        <div className="testimonial-card__author-media">
          <ImageWithFallback
            src={photo}
            alt={`Photo of ${name}`}
            ratio="1/1"
            duotone={false}
            className="testimonial-card__photo"
          />
        </div>

        <div className="testimonial-card__author-info">
          <h3 id={`story-author-${id}`} className="testimonial-card__name">
            {name}
          </h3>

          {relation && (
            <span className="testimonial-card__relation label">
              {relation}
            </span>
          )}

          <span className="testimonial-card__course label">
            {course} &bull; {year}
          </span>

          {result && (
            <span className="testimonial-card__result label">
              {result}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default TestimonialCard;
