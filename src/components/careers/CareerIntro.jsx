import CountUp from "../animations/CountUp";
import { results } from "../../data/results.js";
import { careersPage } from "../../data/careersPage.js";
import "./CareerIntro.css";

export function CareerIntro({
  statement = careersPage.intro.statement,
  className = ""
}) {
  const facultyStat = results.stats.find((s) => s.label.toLowerCase().includes("faculty")) || {
    label: "Faculty",
    value: 62,
    suffix: ""
  };

  const yearsStat = results.stats.find((s) => s.label.toLowerCase().includes("years")) || {
    label: "Years running",
    value: 11,
    suffix: ""
  };

  return (
    <div className={`career-intro ${className}`}>
      <div className="career-intro__grid">
        {/* Left Column: Intro statement in large serif */}
        <div className="career-intro__left">
          <p className="career-intro__statement display-l">
            {statement}
          </p>
        </div>

        {/* Right Column: Ruled strip of 2 facts with CountUp */}
        <div className="career-intro__right">
          <div className="career-intro__stat">
            <div className="career-intro__number display-l numeral">
              <CountUp
                to={facultyStat.value}
                suffix={facultyStat.suffix}
                duration={1.8}
              />
            </div>
            <span className="career-intro__label label">
              {facultyStat.label}
            </span>
          </div>

          <div className="career-intro__stat">
            <div className="career-intro__number display-l numeral">
              <CountUp
                to={yearsStat.value}
                suffix={yearsStat.suffix}
                duration={1.5}
              />
            </div>
            <span className="career-intro__label label">
              {yearsStat.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerIntro;
