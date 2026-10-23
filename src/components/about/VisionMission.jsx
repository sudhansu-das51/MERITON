import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../animations/Reveal";
import StaggerGroup from "../animations/StaggerGroup";
import { about } from "../../data/about";
import "./VisionMission.css";

export function VisionMission({
  vision = about.vision,
  mission = about.mission,
  heading = about.page.sections.visionMission,
  className = ""
}) {
  const panels = [
    {
      numeral: "01",
      label: "Vision",
      text: vision
    },
    {
      numeral: "02",
      label: "Mission",
      text: mission
    }
  ];

  return (
    <div className={`vision-mission ${className}`}>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              index={heading.index}
              label={heading.label}
              title={heading.title}
              id="vision-mission-heading"
            />
          </Reveal>
        )}

        <StaggerGroup childSelector=".vision-mission__panel" className="vision-mission__grid">
          {panels.map((panel) => (
            <div key={panel.numeral} className="vision-mission__panel">
              <div className="vision-mission__header">
                <span className="vision-mission__label label">
                  <span className="vision-mission__tick" aria-hidden="true" />
                  <span>{panel.label}</span>
                </span>
                <span className="vision-mission__corner-tick" aria-hidden="true" />
              </div>

              <p className="vision-mission__text">
                {panel.text}
              </p>

              <span className="vision-mission__numeral numeral" aria-hidden="true">
                {panel.numeral}
              </span>
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </div>
  );
}

export default VisionMission;
