import { useRef, useState, Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";
import { admissions } from "../../data/admissions.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./AdmissionProcessSteps.css";

gsap.registerPlugin(ScrollTrigger);

export function AdmissionProcessSteps({ className = "" }) {
  const { openEnquiry } = useEnquiry();
  const { sections } = admissions.page;
  const [activeStep, setActiveStep] = useState(1);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const fillsRef = useRef([]);
  const arrowsRef = useRef([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        cardsRef.current.forEach((card) => {
          if (card) {
            card.style.opacity = "1";
            card.style.visibility = "visible";
            card.style.transform = "none";
          }
        });
        fillsRef.current.forEach((fill) => {
          if (fill) fill.style.transform = "scaleX(1)";
        });
        arrowsRef.current.forEach((arrow) => {
          if (arrow) arrow.style.opacity = "1";
        });
        return;
      }

      const sectionEl =
        containerRef.current?.closest(".admissions-section--process") ||
        containerRef.current;
      if (!sectionEl || !cardsRef.current.length) return;

      const mm = gsap.matchMedia();

      // ============================================
      // 1. DESKTOP (>= 1024px)
      // ============================================
      mm.add("(min-width: 1024px)", () => {
        // Initial setup:
        // Card 0 (First card) is visible
        gsap.set(cardsRef.current[0], {
          opacity: 1,
          visibility: "visible",
          y: 0,
          scale: 1
        });

        // Cards 1, 2, 3, 4 are completely hidden
        cardsRef.current.slice(1).forEach((card) => {
          if (card) {
            gsap.set(card, {
              opacity: 0,
              visibility: "hidden",
              y: 20,
              scale: 0.98
            });
          }
        });

        // Connector fills start at scaleX: 0
        fillsRef.current.forEach((fill) => {
          if (fill) gsap.set(fill, { scaleX: 0 });
        });
        arrowsRef.current.forEach((arrow) => {
          if (arrow) gsap.set(arrow, { opacity: 0.25 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "+=1800",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const stepIdx = Math.min(
                5,
                Math.max(1, Math.floor(self.progress * 4.95) + 1)
              );
              setActiveStep(stepIdx);
            }
          }
        });

        // Card 0 entrance
        tl.fromTo(
          cardsRef.current[0],
          { opacity: 0.5, y: 14 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
        );

        // Sequentially draw the line between cards and reveal next card
        const numConnectors = admissions.steps.length - 1;
        for (let i = 0; i < numConnectors; i++) {
          const fill = fillsRef.current[i];
          const arrow = arrowsRef.current[i];
          const nextCard = cardsRef.current[i + 1];
          const label = `step-${i}`;

          // Yellow line draws across the gap between card i and card i+1
          if (fill) {
            tl.to(
              fill,
              {
                scaleX: 1,
                duration: 1.0,
                ease: "none"
              },
              label
            );
          }

          if (arrow) {
            tl.to(
              arrow,
              {
                opacity: 1,
                duration: 0.3,
                ease: "none"
              },
              `${label}+=0.7`
            );
          }

          // Next card reveals smoothly when the line reaches it
          if (nextCard) {
            tl.set(nextCard, { visibility: "visible" }, `${label}+=0.85`);
            tl.to(
              nextCard,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                ease: "power2.out"
              },
              `${label}+=0.85`
            );
          }
        }

        // Buffer hold before unpinning
        tl.to({}, { duration: 0.5 });
      });

      // ============================================
      // 2. MOBILE / TABLET (< 1024px)
      // ============================================
      mm.add("(max-width: 1023px)", () => {
        const track = trackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth + 40;

        gsap.set(cardsRef.current[0], {
          opacity: 1,
          visibility: "visible",
          scale: 1
        });
        cardsRef.current.slice(1).forEach((card) => {
          if (card) {
            gsap.set(card, {
              opacity: 0,
              visibility: "hidden",
              scale: 0.98
            });
          }
        });
        fillsRef.current.forEach((fill) => {
          if (fill) gsap.set(fill, { scaleX: 0 });
        });
        arrowsRef.current.forEach((arrow) => {
          if (arrow) gsap.set(arrow, { opacity: 0.25 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "+=1600",
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const stepIdx = Math.min(
                5,
                Math.max(1, Math.floor(self.progress * 4.95) + 1)
              );
              setActiveStep(stepIdx);
            }
          }
        });

        tl.to(track, {
          x: -Math.max(0, totalScroll),
          duration: 4.0,
          ease: "none"
        });

        const numConnectors = admissions.steps.length - 1;
        for (let i = 0; i < numConnectors; i++) {
          const startTime = (i / numConnectors) * 3.6;
          const fill = fillsRef.current[i];
          const arrow = arrowsRef.current[i];
          const nextCard = cardsRef.current[i + 1];

          if (fill) {
            tl.to(
              fill,
              {
                scaleX: 1,
                duration: 0.8,
                ease: "none"
              },
              startTime
            );
          }

          if (arrow) {
            tl.to(
              arrow,
              {
                opacity: 1,
                duration: 0.2,
                ease: "none"
              },
              startTime + 0.5
            );
          }

          if (nextCard) {
            tl.set(nextCard, { visibility: "visible" }, startTime + 0.6);
            tl.to(
              nextCard,
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              },
              startTime + 0.6
            );
          }
        }

        tl.to({}, { duration: 0.4 });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} className={`admission-process ${className}`} id="admission-process">
      {/* Header */}
      <div className="admission-process__header">
        <div className="admission-process__heading-group">
          <SectionHeading
            index={sections.process.index}
            label={sections.process.label}
            title={sections.process.title}
          />
          <div className="admission-process__step-counter label">
            <span>STEP 0{activeStep} OF 05</span>
            <span className="admission-process__step-sep">&middot;</span>
            <span className="admission-process__step-name">
              {admissions.steps[activeStep - 1]?.title}
            </span>
          </div>
        </div>

        <div className="admission-process__enquiry-wrap">
          <button
            type="button"
            onClick={openEnquiry}
            className="admission-process__enquiry-btn label"
          >
            <span>Start with an enquiry</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Cards & Middle Connectors Track */}
      <div ref={trackRef} className="admission-process__track" role="list">
        {admissions.steps.map((step, idx) => (
          <Fragment key={step.title}>
            {/* The Card */}
            <div
              ref={(el) => (cardsRef.current[idx] = el)}
              className="admission-process__card"
              role="listitem"
            >
              <div className="admission-process__card-header">
                <div className="admission-process__circle">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="admission-process__card-body">
                <h3 className="admission-process__card-title">{step.title}</h3>
                <span className="admission-process__when label">{step.when}</span>
                <p className="admission-process__card-text body">{step.text}</p>
              </div>
            </div>

            {/* Middle Connecting Line between Card idx and Card idx+1 */}
            {idx < admissions.steps.length - 1 && (
              <div className="admission-process__connector" aria-hidden="true">
                <div className="admission-process__connector-track">
                  <div
                    ref={(el) => (fillsRef.current[idx] = el)}
                    className="admission-process__connector-fill"
                  />
                </div>
                <div
                  ref={(el) => (arrowsRef.current[idx] = el)}
                  className="admission-process__connector-arrow"
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default AdmissionProcessSteps;
