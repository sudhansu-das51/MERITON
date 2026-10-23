import { ArrowRight } from "lucide-react";
import ImageWithFallback from "../common/ImageWithFallback";
import { facultyPage } from "../../data/facultyPage.js";
import "./FacultyCard.css";

export function FacultyCard({
  member,
  onSelect,
  className = ""
}) {
  const { card } = facultyPage;

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onSelect?.(member)}
      className={`faculty-card ${className}`}
      aria-label={`View profile of ${member.name}, ${member.subject} teacher`}
    >
      <div className="faculty-card__frame">
        <ImageWithFallback
          src={member.photo}
          alt={member.name}
          ratio="4/5"
          duotone={true}
          label={member.subject}
          className="faculty-card__photo"
        />
        <span className="faculty-card__tag label" aria-hidden="true">
          {member.subject}
        </span>
      </div>

      <div className="faculty-card__info">
        <h3 className="faculty-card__name h3">{member.name}</h3>
        <p className="faculty-card__qual">{member.qualification}</p>

        <div className="faculty-card__footer">
          <span className="faculty-card__exp label numeral">{member.experience}</span>
          <div className="faculty-card__view-action label" aria-hidden="true">
            <span>{card.view}</span>
            <ArrowRight size={13} className="faculty-card__arrow" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default FacultyCard;
