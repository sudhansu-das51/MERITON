import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { homeContent } from "../../data/home.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion.js";
import TextReveal from "../animations/TextReveal";
import Button from "../common/Button";
import "./HeroSection.css";

export function HeroSection() {
  const { hero } = homeContent;
  const { openEnquiry } = useEnquiry();

  const sectionRef = useRef(null);
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const leftBox = leftBoxRef.current;
      const rightBox = rightBoxRef.current;
      if (!leftBox || !rightBox) return;

      // When the LogoSplitReveal geometric wipe is active on the landing page,
      // it orchestrates the hero sequence (Phase D) within its master timeline.
      if (document.querySelector(".logo-split-overlay")) {
        return;
      }

      const eyebrow = leftBox.querySelector(".hero-section__eyebrow");
      const headline = leftBox.querySelector(".hero-section__headline");
      const subline = leftBox.querySelector(".hero-section__subline");
      const actionBtns = leftBox.querySelectorAll(".hero-section__actions .btn");
      const image = rightBox.querySelector(".hero-section__image");

      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Eyebrow & Heading reveals first (subtle upward movement + opacity)
      if (eyebrow) {
        tl.from(eyebrow, {
          y: -8,
          opacity: 0,
          duration: DUR.fast,
          ease: EASE.focus,
          clearProps: "transform,opacity"
        });
      }

      if (headline) {
        tl.from(
          headline,
          {
            y: MOTION.yHeading,
            opacity: 0,
            duration: DUR.textHeading,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          "-=0.15"
        );
      }

      // 2. Supporting text appears immediately after heading
      if (subline) {
        tl.from(
          subline,
          {
            y: MOTION.ySubtext,
            opacity: 0,
            duration: DUR.textSub,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          "-=0.34"
        );
      }

      // 3. CTA buttons appear next
      if (actionBtns.length) {
        tl.from(
          actionBtns,
          {
            y: MOTION.yCta,
            opacity: 0,
            duration: DUR.cta,
            stagger: 0.08,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          "-=0.28"
        );
      }

      // 4. Visual reveals smoothly
      if (image) {
        tl.from(
          image,
          {
            opacity: 0,
            scale: 1.04,
            duration: DUR.slow,
            ease: EASE.focus,
            clearProps: "transform,opacity,scale"
          },
          "-=0.45"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="hero-section" aria-label="Hero Section">
      <div className="hero-section__split">
        {/* Left Column: Equal Split Square - Editorial Content */}
        <div ref={leftBoxRef} className="hero-section__left">
          <div className="hero-section__text-content">
            <div className="hero-section__eyebrow label focus-eyebrow">
              <span>{hero.eyebrow}</span>
            </div>

            <h1 className="hero-section__headline display-xl focus-heading">
              SERIOUS PREPARATION, <em>TRACKED</em> WEEKLY.
            </h1>

            <p className="hero-section__subline body focus-subtext">
              {hero.subline}
            </p>

            <div className="hero-section__actions focus-cta">
              <Button
                variant="primary"
                size="lg"
                to={hero.primaryCta.to}
                showArrow
              >
                {hero.primaryCta.label}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => openEnquiry()}
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Equal Split Square - Edge-to-Edge Visual */}
        <div ref={rightBoxRef} className="hero-section__right">
          <img
            src="/images/hero/hero-student.jpg"
            alt="Focused student preparing with study materials at MERITON Academy"
            className="hero-section__image"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
