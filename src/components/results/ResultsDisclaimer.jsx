import { resultsPage } from "../../data/resultsPage.js";
import "./ResultsDisclaimer.css";

export function ResultsDisclaimer({ className = "" }) {
  const { disclaimer } = resultsPage;

  return (
    <div className={`results-disclaimer ${className}`}>
      <p className="results-disclaimer__text label">
        <span>*</span> {disclaimer}
      </p>
    </div>
  );
}

export default ResultsDisclaimer;
