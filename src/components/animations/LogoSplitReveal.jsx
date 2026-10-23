import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion.js";
import "./LogoSplitReveal.css";

const STORAGE_KEY = "meriton_has_seen_reveal";

/**
 * Premium Logo-Split Geometric Wipe Reveal
 *
 * Visual Concept:
 * 1. Viewport appears covered in a solid geometric forest surface.
 * 2. Exact favicon (/favicon.svg) reveals in the precise viewport center.
 * 3. A diagonal laser cut is established through the center of the logo and screen.
 * 4. The two panels separate in opposite directions along the cut's normal vector,
 *    carrying their corresponding logo fragments with them.
 * 5. As the panels pull apart, the landing page hero is revealed in a coordinated
 *    focus sequence (Heading -> Subline -> CTAs -> Imagery).
 * 6. The overlay is cleanly unmounted and removed from the DOM.
 *
 * Persistence rule:
 * Runs ONLY ONCE per browser session on initial entrance via any link.
 * Does NOT run on refresh, browser back/forward, or internal route navigation.
 */
export function LogoSplitReveal({ onComplete }) {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === "undefined") return false;
    if (prefersReducedMotion()) return false;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        return false;
      }
    } catch {
      // Fallback if sessionStorage is blocked
    }
    return true;
  });

  const overlayRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const cutLineRef = useRef(null);
  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);

  // Safety lock on body while overlay is active and mark session persistence
  useEffect(() => {
    if (!isActive) return;

    // Mark as shown immediately so refresh or abort will not replay
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Fallback
    }

    document.documentElement.classList.add("logo-split-active");

    // Safety failsafe: never let overlay get permanently stuck under any circumstance
    const safetyTimer = setTimeout(() => {
      document.documentElement.classList.remove("logo-split-active");
      setIsActive(false);
      onComplete?.();
    }, 4800);

    return () => {
      clearTimeout(safetyTimer);
      document.documentElement.classList.remove("logo-split-active");
    };
  }, [isActive, onComplete]);

  useGSAP(
    () => {
      if (!isActive || prefersReducedMotion()) {
        setIsActive(false);
        onComplete?.();
        return;
      }

      const overlay = overlayRef.current;
      const panel1 = panel1Ref.current;
      const panel2 = panel2Ref.current;
      const cutLine = cutLineRef.current;
      const logo1 = logo1Ref.current;
      const logo2 = logo2Ref.current;

      if (!overlay || !panel1 || !panel2 || !cutLine || !logo1 || !logo2) return;

      // Calculate travel distances along the exact normal of the diagonal cut
      // Cut line: (0.72*w, 0) to (0.28*w, h)
      // Vector along cut: dx = -0.44 * w, dy = h
      // Normal vector pointing up-left (Panel 1): nx = -h, ny = -0.44 * w
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      const nx = -h;
      const ny = -0.44 * w;
      const len = Math.hypot(nx, ny) || 1;
      const unx = nx / len;
      const uny = ny / len;
      const maxDim = Math.hypot(w, h);
      const dist = maxDim * 1.35; // Generous distance ensures 100% off-screen exit

      const p1x = Math.round(unx * dist);
      const p1y = Math.round(uny * dist);
      const p2x = Math.round(-unx * dist);
      const p2y = Math.round(-uny * dist);

      // SVG line coordinates: (720, 0) to (280, 1000)
      // Line length in 1000x1000 viewBox = Math.hypot(280 - 720, 1000) = 1092.5
      const lineLen = 1100;
      gsap.set(cutLine, {
        strokeDasharray: lineLen,
        strokeDashoffset: lineLen,
        opacity: 1
      });

      // Query hero elements underneath to sequence Phase D
      const heroHeadline = document.querySelector(".hero-section__headline");
      const heroEyebrow = document.querySelector(".hero-section__eyebrow");
      const heroSubline = document.querySelector(".hero-section__subline");
      const heroCtas = document.querySelectorAll(".hero-section__actions .btn");
      const heroImage = document.querySelector(".hero-section__image");

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("logo-split-active");
          setIsActive(false);
          onComplete?.();
        }
      });

      // ----------------------------------------------------------------------
      // Phase A: Logo Establishment (550ms + 180ms calm settle)
      // Reveal favicon at the exact viewport center at a calm, deliberate pace
      // ----------------------------------------------------------------------
      tl.fromTo(
        [logo1, logo2],
        { opacity: 0, scale: 0.90 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power2.out"
        }
      );

      // ----------------------------------------------------------------------
      // Phase B: Diagonal Cut (580ms steady cut + 140ms hold)
      // Cut line draws smoothly through center of viewport and center of the logo
      // ----------------------------------------------------------------------
      tl.to(
        cutLine,
        {
          strokeDashoffset: 0,
          duration: 0.58,
          ease: "laserCut"
        },
        "+=0.18"
      );

      // ----------------------------------------------------------------------
      // Phase C: Geometric Separation (1.20s majestic, silky glide)
      // Panels separate in opposite directions carrying their logo fragments
      // ----------------------------------------------------------------------
      tl.to(
        panel1,
        {
          x: p1x,
          y: p1y,
          duration: 1.20,
          ease: "splitVault"
        },
        "+=0.14" // Brief deliberate pause letting user register the cut
      );

      tl.to(
        panel2,
        {
          x: p2x,
          y: p2y,
          duration: 1.20,
          ease: "splitVault"
        },
        "<" // precisely synchronized with panel1
      );

      tl.to(
        cutLine,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out"
        },
        "<"
      );

      // ----------------------------------------------------------------------
      // Phase D: Hero Reveal (overlapping gracefully as the panels clear center)
      // Animate the actual landing page underneath with refined focus easing
      // ----------------------------------------------------------------------
      const headingElements = [heroEyebrow, heroHeadline].filter(Boolean);
      if (headingElements.length) {
        tl.fromTo(
          headingElements,
          { y: MOTION.yHeading, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.64,
            ease: EASE.focus,
            stagger: 0.1,
            clearProps: "transform,opacity"
          },
          "-=0.65"
        );
      }

      if (heroSubline) {
        tl.fromTo(
          heroSubline,
          { y: MOTION.ySubtext, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.56,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          headingElements.length ? "-=0.45" : "-=0.65"
        );
      }

      if (heroCtas && heroCtas.length) {
        tl.fromTo(
          heroCtas,
          { y: MOTION.yCta, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.52,
            stagger: 0.09,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          "-=0.36"
        );
      }

      if (heroImage) {
        tl.fromTo(
          heroImage,
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.88,
            ease: EASE.focus,
            clearProps: "transform,opacity,scale"
          },
          "-=0.50"
        );
      }
    },
    { scope: overlayRef, dependencies: [isActive] }
  );

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className="logo-split-overlay"
      aria-label="Welcome to MERITON"
      role="presentation"
    >
      {/* Panel 1 (Left / Top-Left): Clipped to the left of the diagonal cut */}
      <div
        ref={panel1Ref}
        className="logo-split-panel logo-split-panel--left"
        aria-hidden="true"
      >
        <div className="logo-split-logo-wrap">
          <img
            ref={logo1Ref}
            src="/favicon.svg"
            alt=""
            className="logo-split-logo"
            draggable="false"
          />
        </div>
      </div>

      {/* Panel 2 (Right / Bottom-Right): Clipped to the right of the diagonal cut */}
      <div
        ref={panel2Ref}
        className="logo-split-panel logo-split-panel--right"
        aria-hidden="true"
      >
        <div className="logo-split-logo-wrap">
          <img
            ref={logo2Ref}
            src="/favicon.svg"
            alt=""
            className="logo-split-logo"
            draggable="false"
          />
        </div>
      </div>

      {/* Synchronized Diagonal Laser Cut Seam */}
      <svg
        className="logo-split-cut-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          ref={cutLineRef}
          x1="720"
          y1="0"
          x2="280"
          y2="1000"
          className="logo-split-cut-line"
        />
      </svg>
    </div>
  );
}

export default LogoSplitReveal;
