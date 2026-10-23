import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../animations/Reveal";
import { prefersReducedMotion } from "../../lib/motion";
import { about } from "../../data/about";
import "./JourneyTimeline.css";

export function JourneyTimeline({
  entries = about.journey,
  heading = about.page.sections.journey,
  className = ""
}) {
  const spineRef = useRef(null);
  const lineRef = useRef(null);
  const markersRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const sectionEl = sectionRef.current;
    const svgLine = lineRef.current;
    const spineEl = spineRef.current;
    if (!sectionEl || !svgLine || !spineEl) return;

    let animLine = null;
    let animMarkers = null;

    const observer = new IntersectionObserver(
      (entriesList) => {
        const [entry] = entriesList;
        if (entry.isIntersecting) {
          const totalLength = spineEl.clientHeight || 900;
          svgLine.style.strokeDasharray = `${totalLength}`;
          svgLine.style.strokeDashoffset = `${totalLength}`;

          animLine = animate(svgLine, {
            strokeDashoffset: [totalLength, 0],
            duration: 1200,
            ease: "outQuad"
          });

          if (markersRef.current.length) {
            animMarkers = animate(markersRef.current, {
              scale: [0.2, 1],
              opacity: [0, 1],
              delay: stagger(160, { start: 150 }),
              duration: 450,
              ease: "outBack"
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      if (animLine) animLine.revert?.();
      if (animMarkers) animMarkers.revert?.();
    };
  }, []);

  return (
    <div ref={sectionRef} className={`journey-timeline ${className}`}>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              index={heading.index}
              label={heading.label}
              title={heading.title}
              id="journey-heading"
            />
          </Reveal>
        )}

        <div className="journey-timeline__wrap">
          {/* Central animated SVG spine */}
          <div ref={spineRef} className="journey-timeline__spine" aria-hidden="true">
            <svg width="2" height="100%" className="journey-timeline__svg" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="var(--cta)"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="journey-timeline__items">
            {entries.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`journey-timeline__row ${isEven ? "journey-timeline__row--left" : "journey-timeline__row--right"}`}
                >
                  {/* Marker on the spine */}
                  <div
                    ref={(el) => {
                      if (el) markersRef.current[idx] = el;
                    }}
                    className="journey-timeline__marker"
                    aria-hidden="true"
                  >
                    <span className="journey-timeline__marker-dot" />
                  </div>

                  {/* Timeline Entry Card */}
                  <div className="journey-timeline__card">
                    <span className="journey-timeline__year display-l numeral">
                      {item.year}
                    </span>
                    <h3 className="journey-timeline__title">
                      {item.title}
                    </h3>
                    <p className="journey-timeline__text small">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default JourneyTimeline;
