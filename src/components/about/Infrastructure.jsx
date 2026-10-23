import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import ImageWithFallback from "../common/ImageWithFallback";
import Reveal from "../animations/Reveal";
import StaggerGroup from "../animations/StaggerGroup";
import { about } from "../../data/about";
import "./Infrastructure.css";

export function Infrastructure({
  items = about.infrastructure,
  heading = about.page.sections.infrastructure,
  className = ""
}) {
  return (
    <div className={`infrastructure ${className}`}>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              index={heading.index}
              label={heading.label}
              title={heading.title}
              id="infrastructure-heading"
            />
          </Reveal>
        )}

        <StaggerGroup childSelector=".infra-tile" className="infrastructure__grid">
          {items.map((item) => (
            <article key={item.title} className="infra-tile">
              <div className="infra-tile__media">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  ratio="4/3"
                  duotone={false}
                  label={item.title.toUpperCase()}
                  className="infra-tile__frame"
                />
              </div>

              <div className="infra-tile__content">
                <h3 className="infra-tile__title h3">
                  {item.title}
                </h3>
                <p className="infra-tile__line small">
                  {item.line}
                </p>
              </div>
            </article>
          ))}
        </StaggerGroup>
      </Container>
    </div>
  );
}

export default Infrastructure;
