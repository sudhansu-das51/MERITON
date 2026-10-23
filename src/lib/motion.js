import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP plugins once globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  // Silky, authoritative glide with long gentle deceleration tail
  CustomEase.create("splitVault", "M0,0 C0.32,0.02 0.12,1 1,1");
  CustomEase.create("laserCut", "M0,0 C0.25,0.05 0.15,1 1,1");
}

// Calibrated Animation Timing & Values (Focus Reveal System):
// - Heading & Text: 400–600ms
// - Cards: 450–650ms
// - Card Stagger: 40–70ms (default 60ms)
// - Easing: cubic-bezier(0.22, 1, 0.36, 1) via power3.out
export const DUR = {
  fast: 0.25,
  textHeading: 0.52,   // 520ms
  textSub: 0.46,       // 460ms
  cta: 0.44,           // 440ms
  card: 0.55,          // 550ms
  base: 0.55,
  slow: 0.85,
  curtain: 0.55
};

export const EASE = {
  focus: "power3.out", // smooth cubic-bezier(0.22, 1, 0.36, 1)
  out: "power3.out",
  expo: "expo.out",
  inOut: "power4.inOut",
  linear: "none"
};

export const MOTION = {
  yHeading: 18,        // subtle upward movement (18px)
  ySubtext: 14,        // subtle upward movement (14px)
  yCta: 12,            // subtle upward movement (12px)
  yCard: 20,           // subtle upward movement (20px)
  revealDistance: 18,
  cardHoverLift: 4,
  staggerFast: 0.045,
  staggerCard: 0.06,   // 60ms refined stagger
  staggerBase: 0.06
};

export const prefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const isCoarsePointer = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: coarse)").matches;
};

export { gsap, ScrollTrigger, CustomEase };
