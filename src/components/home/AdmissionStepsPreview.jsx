import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { animate, stagger } from "animejs";
import { admissions } from "../../data/admissions.js";
import { homeContent } from "../../data/home.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./AdmissionStepsPreview.css";

export function AdmissionStepsPreview() {
  const { sections } = homeContent;
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const circlesRef = useRef([]);

  const addCircle = (el) => {
    if (el && !circlesRef.current.includes(el)) {
      circlesRef.current.push(el);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const el = containerRef.current;
    const svgLine = lineRef.current;
    if (!el || !svgLine) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const lineLength = 360;
          svgLine.style.strokeDasharray = `${lineLength}`;
          svgLine.style.strokeDashoffset = `${lineLength}`;

          // Animate line draw
          animate(svgLine, {
            strokeDashoffset: [lineLength, 0],
            duration: 900,
            ease: "outQuad"
          });

          // Animate circles fill in turn
          if (circlesRef.current.length) {
            animate(circlesRef.current, {
              scale: [0.3, 1],
              opacity: [0, 1],
              delay: stagger(140, { start: 100 }),
              duration: 400,
              ease: "outBack"
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="admission-preview">
      {/* Title */}
      <div className="admission-preview__header">
        <h2 className="admission-preview__title h2 focus-heading">
          {sections.admission.title}
        </h2>
      </div>

      {/* Timeline Steps with Animated Connecting Line */}
      <div className="admission-preview__timeline" role="list">
        {/* SVG Vertical Guide Line */}
        <div className="admission-preview__line-wrap" aria-hidden="true">
          <svg className="admission-preview__svg-line" viewBox="0 0 2 360" preserveAspectRatio="none">
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="360"
              className="admission-preview__svg-path"
            />
          </svg>
        </div>

        {admissions.steps.map((step, i) => (
          <div key={step.title} className="admission-preview__step focus-card" role="listitem">
            <div ref={addCircle} className="admission-preview__step-circle label numeral">
              {i + 1}
            </div>
            <div className="admission-preview__step-content">
              <h3 className="admission-preview__step-title h3">
                {step.title}
              </h3>
              <p className="admission-preview__step-text small">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="admission-preview__footer focus-cta">
        <Link to="/admissions" className="admission-preview__link label">
          <span>{sections.admission.linkLabel}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default AdmissionStepsPreview;
