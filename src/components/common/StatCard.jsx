import CountUp from "../animations/CountUp";
import "./StatCard.css";

export function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
  duration = 1.6,
  className = ""
}) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card__hairline" aria-hidden="true" />
      <div className="stat-card__value display-l numeral">
        <CountUp
          value={value}
          prefix={prefix}
          suffix={suffix}
          duration={duration}
        />
      </div>
      <div className="stat-card__label label">
        {label}
      </div>
    </div>
  );
}

export default StatCard;
