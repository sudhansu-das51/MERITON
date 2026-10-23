import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Container from "../common/Container";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion";
import "./CoursesHero.css";

export function CoursesHero({
  title = "COURSES",
  line = "JEE, NEET and Foundation. Pick a class and an exam.",
  batchInfo = "Batches start from 5 April to 20 May 2027",
  className = ""
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const titleEl = el.querySelector(".courses-hero__title");
      const lineEl = el.querySelector(".courses-hero__line");
      const batchEl = el.querySelector(".courses-hero__batch");

      const tl = gsap.timeline();

      // Step 1: Heading reveals first
      if (titleEl) {
        tl.from(titleEl, {
          y: MOTION.yHeading,
          opacity: 0,
          duration: DUR.textHeading,
          ease: EASE.focus,
          clearProps: "transform,opacity"
        });
      }

      // Step 2: Supporting text appears immediately after heading
      if (lineEl) {
        tl.from(
          lineEl,
          {
            y: MOTION.ySubtext,
            opacity: 0,
            duration: DUR.textSub,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          titleEl ? "-=0.34" : undefined
        );
      }

      // Step 3: CTA / Batch status appears next
      if (batchEl) {
        tl.from(
          batchEl,
          {
            y: MOTION.yCta,
            opacity: 0,
            duration: DUR.cta,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          lineEl || titleEl ? "-=0.28" : undefined
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className={`courses-hero ${className}`} aria-labelledby="courses-hero-title">
      <div className="courses-hero__bg" aria-hidden="true" />
      <Container>
        <div ref={containerRef} className="courses-hero__inner">
          <h1 id="courses-hero-title" className="courses-hero__title">
            {title}
          </h1>

          {line && (
            <p className="courses-hero__line">
              {line}
            </p>
          )}

          {batchInfo && (
            <div className="courses-hero__batch" role="status">
              <span className="courses-hero__batch-indicator" aria-hidden="true" />
              <span className="courses-hero__batch-text">
                {batchInfo}
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default CoursesHero;
