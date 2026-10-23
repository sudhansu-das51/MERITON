import { faculty } from "../../data/faculty.js";
import { homeContent } from "../../data/home.js";
import SectionHeading from "../common/SectionHeading";
import ImageWithFallback from "../common/ImageWithFallback";
import FocusReveal from "../animations/FocusReveal";
import "./FacultyPreview.css";

export function FacultyPreview() {
  const { sections } = homeContent;
  const featuredFaculty = faculty.filter((f) => f.featured);

  return (
    <section className="faculty-preview section section--light" aria-labelledby="faculty-heading">
      <div className="container">
        <FocusReveal cardSelector=".faculty-preview__card">
          <SectionHeading
            id="faculty-heading"
            index={sections.faculty.index}
            label={sections.faculty.label}
            title={sections.faculty.title}
            linkTo="/faculty"
            linkLabel={sections.faculty.linkLabel}
          />

          <div className="faculty-preview__grid">
            {featuredFaculty.map((member) => (
              <article
                key={member.id}
                className="faculty-preview__card"
                aria-label={`${member.name}, ${member.subject}`}
              >
                <div className="faculty-preview__photo-container">
                  <ImageWithFallback
                    src={member.photo}
                    alt={member.name}
                    ratio="4/5"
                    duotone={false}
                    label={member.subject}
                    className="faculty-preview__photo"
                  />
                  <div className="faculty-preview__tag label" aria-hidden="true">
                    {member.subject}
                  </div>
                </div>

                <div className="faculty-preview__info">
                  <h3 className="faculty-preview__name h3">
                    {member.name}
                  </h3>
                  <div className="faculty-preview__subject label">
                    {member.subject} Department
                  </div>
                  <div className="faculty-preview__qual small">
                    {member.qualification} &bull; {member.experience}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FocusReveal>
      </div>
    </section>
  );
}

export default FacultyPreview;
