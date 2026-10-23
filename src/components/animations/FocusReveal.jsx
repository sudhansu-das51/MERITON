import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion.js";

/**
 * Focus Reveal Hook
 * Coordinates the 4-step sequence:
 * 1. Heading reveals first (subtle upward movement + opacity transition)
 * 2. Supporting text appears immediately after heading
 * 3. CTA buttons appear next
 * 4. Cards reveal last with a refined staggered entrance
 */
export function useFocusReveal(
  containerRef,
  {
    start = "top 85%",
    once = true,
    delay = 0,
    cardSelector,
    stagger = MOTION.staggerCard,
    enabled = true
  } = {}
) {
  useGSAP(
    () => {
      if (!enabled || prefersReducedMotion()) return;
      const root = containerRef?.current;
      if (!root) return;

      const cardsSelector =
        cardSelector ||
        ".focus-card, .course-hcard, .course-card, .faculty-preview__card, .faculty-card, .topper-card, .award-card, .notice-item, .resource-card, .stat-card, .trust-points__cell, .admission-preview__step, .event-card, .faq-preview__accordion-wrap, .why-choose-us__row";

      // 1. Headings (exclude nested headings inside child cards)
      const allHeadings = Array.from(
        root.querySelectorAll(
          ".focus-heading, .section-heading__title, .page-hero__title, .final-cta__title, h2:not(.course-hcard *):not(.faculty-preview__card *):not(.course-card *):not(.card *):not(.topper-card *):not(.award-card *)"
        )
      );
      const headings = allHeadings.filter(
        (el) =>
          !el.closest(
            ".course-hcard, .course-card, .faculty-preview__card, .faculty-card, .topper-card, .award-card, .card"
          )
      );

      // 2. Supporting text (exclude inside cards)
      const allSubtexts = Array.from(
        root.querySelectorAll(
          ".focus-subtext, .section-heading__hint, .page-hero__line, .final-cta__line, .section-subline, .results-highlights__note"
        )
      );
      const subtexts = allSubtexts.filter(
        (el) =>
          !el.closest(
            ".course-hcard, .course-card, .faculty-preview__card, .faculty-card, .topper-card, .award-card, .card"
          )
      );

      // 3. CTA buttons / actions
      const allCtas = Array.from(
        root.querySelectorAll(
          ".focus-cta, .section-heading__action, .final-cta__actions, .section-cta, .resources-notices__footer-link, .admission-preview__footer, .faq-preview__footer"
        )
      );
      const ctas = allCtas.filter(
        (el) =>
          !el.closest(
            ".course-hcard, .course-card, .faculty-preview__card, .faculty-card, .topper-card, .award-card, .card"
          )
      );

      // 4. Cards / Items
      const cards = Array.from(root.querySelectorAll(cardsSelector));

      if (!headings.length && !subtexts.length && !ctas.length && !cards.length) return;

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: root,
          start,
          once
        }
      });

      // Step 1: Heading
      if (headings.length) {
        tl.from(headings, {
          y: MOTION.yHeading,
          opacity: 0,
          duration: DUR.textHeading,
          ease: EASE.focus,
          clearProps: "transform,opacity"
        });
      }

      // Step 2: Supporting text
      if (subtexts.length) {
        tl.from(
          subtexts,
          {
            y: MOTION.ySubtext,
            opacity: 0,
            duration: DUR.textSub,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          headings.length ? "-=0.34" : undefined
        );
      }

      // Step 3: CTA buttons
      if (ctas.length) {
        tl.from(
          ctas,
          {
            y: MOTION.yCta,
            opacity: 0,
            duration: DUR.cta,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          headings.length || subtexts.length ? "-=0.28" : undefined
        );
      }

      // Step 4: Cards with refined stagger
      if (cards.length) {
        tl.from(
          cards,
          {
            y: MOTION.yCard,
            opacity: 0,
            duration: DUR.card,
            stagger,
            ease: EASE.focus,
            clearProps: "transform,opacity"
          },
          headings.length || subtexts.length || ctas.length ? "-=0.24" : undefined
        );
      }
    },
    { scope: containerRef, dependencies: [start, once, delay, cardSelector, stagger, enabled] }
  );
}

/**
 * FocusReveal Component Wrapper
 */
export function FocusReveal({
  as: Component = "div",
  children,
  className = "",
  start = "top 85%",
  once = true,
  delay = 0,
  cardSelector,
  stagger = MOTION.staggerCard,
  enabled = true,
  ...rest
}) {
  const ref = useRef(null);
  useFocusReveal(ref, { start, once, delay, cardSelector, stagger, enabled });

  return (
    <Component ref={ref} className={`focus-reveal ${className}`} {...rest}>
      {children}
    </Component>
  );
}

export default FocusReveal;
