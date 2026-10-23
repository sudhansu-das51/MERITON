import ImageWithFallback from "../common/ImageWithFallback";
import "./TopperCard.css";

export function TopperCard({
  topper,
  className = ""
}) {
  return (
    <article
      className={`topper-card ${className}`}
      aria-label={`${topper.name}, ${topper.rank} in ${topper.exam}`}
    >
      <div className="topper-card__media">
        <ImageWithFallback
          src={topper.photo}
          alt={topper.name}
          ratio="4/5"
          duotone={true}
          label={topper.rank}
          className="topper-card__photo"
        />
        <div className="topper-card__exam-tag label" aria-hidden="true">
          {topper.exam}
        </div>
      </div>

      <div className="topper-card__info">
        <div className="topper-card__rank-wrap">
          <span className="topper-card__rank display-l numeral">{topper.rank}</span>
        </div>

        <h3 className="topper-card__name h3">{topper.name}</h3>

        <div className="topper-card__footer">
          <span className="topper-card__score label numeral">{topper.score}</span>
        </div>
      </div>
    </article>
  );
}

export default TopperCard;
