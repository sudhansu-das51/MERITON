import { results } from "../../data/results.js";
import { homeContent } from "../../data/home.js";
import SectionHeading from "../common/SectionHeading";
import ImageWithFallback from "../common/ImageWithFallback";
import CountUp from "../animations/CountUp";
import FocusReveal from "../animations/FocusReveal";
import "./ResultsHighlights.css";

export function ResultsHighlights() {
  const { sections } = homeContent;
  const year2026 = results.years.find((y) => y.year === 2026) || results.years[0];
  const toppers = year2026?.toppers || [];
  const selectionsStat = results.stats.find((s) => s.label.includes("Selections")) || {
    value: 1860,
    label: "Selections in 2026"
  };

  // Duplicate toppers list for seamless infinite marquee loop
  const marqueeToppers = [...toppers, ...toppers];

  return (
    <section
      className="results-highlights section section--main"
      aria-labelledby="results-heading"
    >
      <FocusReveal className="container">
        <SectionHeading
          id="results-heading"
          index={sections.results.index}
          label={sections.results.label}
          title={sections.results.title}
          linkTo="/results"
          linkLabel={sections.results.linkLabel}
        />

        <div className="results-highlights__layout">
          {/* Left Intro Block */}
          <div className="results-highlights__intro">
            <div className="results-highlights__stat-box focus-card">
              <span className="results-highlights__stat-val display-l numeral">
                <CountUp
                  value={selectionsStat.value}
                  suffix={selectionsStat.suffix}
                  duration={1.6}
                />
              </span>
              <span className="results-highlights__stat-lbl label">
                {selectionsStat.label}
              </span>
            </div>
            <p className="results-highlights__note small focus-subtext">
              Verified classroom selections across JEE Advanced, JEE Main, and NEET examinations.
            </p>
          </div>

          {/* Right Continuous Horizontal Scrolling Strip with Blur Fades */}
          <div
            className="results-highlights__strip-wrap focus-card"
            role="region"
            aria-label="High-rankers selection reel. Pauses on hover."
          >
            {/* Left Minimal Blur Effect Line */}
            <div
              className="results-highlights__fade results-highlights__fade--left"
              aria-hidden="true"
            />

            {/* Right Thicker Blur Effect Line */}
            <div
              className="results-highlights__fade results-highlights__fade--right"
              aria-hidden="true"
            />

            {/* Scrolling Track */}
            <div className="results-highlights__strip">
              {marqueeToppers.map((topper, index) => (
                <article
                  key={`${topper.id}-${index}`}
                  className="results-highlights__card"
                  aria-label={`${topper.name}, ${topper.rank}, ${topper.exam}`}
                >
                  <div className="results-highlights__photo-wrap">
                    <ImageWithFallback
                      src={topper.photo}
                      alt={topper.name}
                      ratio="4/5"
                      duotone={false}
                      label={topper.rank}
                    />
                  </div>
                  <div className="results-highlights__card-info">
                    <div className="results-highlights__rank display-l numeral">
                      {topper.rank}
                    </div>
                    <div className="results-highlights__name small">
                      {topper.name}
                    </div>
                    <div className="results-highlights__meta label">
                      <span>{topper.exam}</span>
                      <span className="results-highlights__sep" aria-hidden="true">
                        /
                      </span>
                      <span className="numeral">{topper.score}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </FocusReveal>
    </section>
  );
}

export default ResultsHighlights;
