import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../animations/Reveal";
import StaggerGroup from "../animations/StaggerGroup";
import { about } from "../../data/about";
import "./Methodology.css";

export function Methodology({
  steps = about.methodology,
  heading = about.page.sections.methodology,
  className = ""
}) {
  return (
    <div className={`methodology ${className}`}>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              index={heading.index}
              label={heading.label}
              title={heading.title}
              id="methodology-heading"
            />
          </Reveal>
        )}

        <div className="methodology__strip-wrap">
          <StaggerGroup childSelector=".methodology__step" className="methodology__strip">
            {steps.map((step, idx) => (
              <div key={step.title} className="methodology__step">
                <div className="methodology__step-header">
                  <span className="methodology__step-num label">
                    0{idx + 1}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="methodology__connector" aria-hidden="true">
                      <ArrowRight size={14} />
                    </span>
                  )}
                </div>

                <div className="methodology__step-content">
                  <h3 className="methodology__step-title h3">
                    {step.title}
                  </h3>
                  <p className="methodology__step-text small">
                    {step.text}
                  </p>
                </div>

                <div className="methodology__step-footer">
                  <span className="methodology__cadence label">
                    <span className="methodology__cadence-dot" aria-hidden="true" />
                    <span>{step.cadence}</span>
                  </span>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </div>
  );
}

export default Methodology;
