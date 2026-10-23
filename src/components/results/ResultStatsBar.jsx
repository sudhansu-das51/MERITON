import StatCard from "../common/StatCard";
import StaggerGroup from "../animations/StaggerGroup";
import { results } from "../../data/results.js";
import "./ResultStatsBar.css";

export function ResultStatsBar({ className = "" }) {
  const { stats } = results;

  return (
    <div className={`result-stats-bar ${className}`} role="region" aria-label="Key academy statistics">
      <StaggerGroup childSelector=".result-stats-bar__cell" className="result-stats-bar__grid">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="result-stats-bar__cell">
            <span className="result-stats-bar__tick label" aria-hidden="true">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <StatCard
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={1.6 + idx * 0.15}
              className="result-stats-bar__card"
            />
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}

export default ResultStatsBar;
