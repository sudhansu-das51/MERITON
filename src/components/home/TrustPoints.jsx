import { results } from "../../data/results.js";
import StatCard from "../common/StatCard";
import FocusReveal from "../animations/FocusReveal";
import "./TrustPoints.css";

export function TrustPoints() {
  return (
    <section className="trust-points section--deep" aria-label="Academy Statistics">
      <div className="container">
        <FocusReveal cardSelector=".trust-points__cell" className="trust-points__grid">
          {results.stats.map((stat, i) => (
            <div key={stat.label} className="trust-points__cell">
              <StatCard
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                duration={1.5 + i * 0.15}
              />
            </div>
          ))}
        </FocusReveal>
      </div>
    </section>
  );
}

export default TrustPoints;
