import Container from "../common/Container";
import ImageWithFallback from "../common/ImageWithFallback";
import StatCard from "../common/StatCard";
import Reveal from "../animations/Reveal";
import StaggerGroup from "../animations/StaggerGroup";
import { about } from "../../data/about";
import { results } from "../../data/results";
import "./AboutIntro.css";

export function AboutIntro({
  intro = about.intro,
  stats = results.stats,
  className = ""
}) {
  return (
    <div className={`about-intro ${className}`}>
      <Container>
        <div className="about-intro__grid">
          <Reveal className="about-intro__content">
            <h2 className="about-intro__statement display-l">
              {intro.statement}
            </h2>
            <p className="about-intro__body body">
              {intro.body}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="about-intro__media">
            <ImageWithFallback
              src={intro.image}
              alt="MERITON Academy campus"
              ratio="4/3"
              duotone={false}
              label="CAMPUS ARCHIVE"
            />
          </Reveal>
        </div>

        {/* Ruled strip of 4 key facts */}
        {stats && stats.length > 0 && (
          <div className="about-intro__stats-wrap">
            <StaggerGroup childSelector=".stat-card" className="about-intro__stats">
              {stats.slice(0, 4).map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  className="about-intro__stat-item"
                />
              ))}
            </StaggerGroup>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AboutIntro;
