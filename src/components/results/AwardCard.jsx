import ImageWithFallback from "../common/ImageWithFallback";
import "./AwardCard.css";

export function AwardCard({
  award,
  className = ""
}) {
  return (
    <article
      className={`award-card ${className}`}
      aria-label={`${award.year}: ${award.title} by ${award.issuer}`}
    >
      <div className="award-card__media">
        <ImageWithFallback
          src={award.image}
          alt={award.title}
          ratio="4/3"
          duotone={true}
          label={String(award.year)}
          className="award-card__photo"
        />
      </div>

      <div className="award-card__content">
        <span className="award-card__year display-l numeral">{award.year}</span>
        <h3 className="award-card__title h3">{award.title}</h3>
        <span className="award-card__issuer label">{award.issuer}</span>
      </div>
    </article>
  );
}

export default AwardCard;
