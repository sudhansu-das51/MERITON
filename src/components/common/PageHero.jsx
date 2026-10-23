import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion";
import Container from "./Container";
import "./PageHero.css";

export function PageHero({
  title,
  line,
  bgImage = "/images/courses/courses-hero-bg.jpg",
  className = ""
}) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = heroRef.current;
      if (!root) return;

      const titleEl = root.querySelector(".page-hero__title");
      const lineEl = root.querySelector(".page-hero__line");

      const tl = gsap.timeline({ delay: 0.1 });

      if (titleEl) {
        tl.from(titleEl, {
          y: MOTION.yHeading,
          opacity: 0,
          duration: DUR.textHeading,
          ease: EASE.focus,
          clearProps: "transform,opacity"
        });
      }

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
    },
    { scope: heroRef, dependencies: [title, line] }
  );

  return (
    <header ref={heroRef} className={`page-hero ${className}`} role="banner">
      <div
        className="page-hero__bg"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(6, 32, 26, 0.88) 0%,
              rgba(6, 32, 26, 0.72) 28%,
              rgba(6, 32, 26, 0.35) 55%,
              rgba(6, 32, 26, 0.08) 80%,
              transparent 100%
            ),
            linear-gradient(
              180deg,
              rgba(6, 32, 26, 0.35) 0%,
              transparent 25%
            ),
            url("${bgImage}")
          `
        }}
        aria-hidden="true"
      />
      <Container>
        <div className="page-hero__inner">
          {title && (
            <h1 className="page-hero__title focus-heading">{title}</h1>
          )}
          {line && (
            <p className="page-hero__line focus-subtext">{line}</p>
          )}
        </div>
      </Container>
    </header>
  );
}

export default PageHero;
