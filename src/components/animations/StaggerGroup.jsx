import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion.js";
import "./StaggerGroup.css";

export function StaggerGroup({
  as: Component = "div",
  stagger = MOTION.staggerCard,
  y = MOTION.yCard,
  delay = 0,
  duration = DUR.card,
  childSelector = ":scope > *",
  once = true,
  className = "",
  children,
  ...rest
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll(childSelector);
      if (!items.length) return;

      gsap.from(items, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: EASE.focus,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once
        }
      });
    },
    { scope: containerRef, dependencies: [stagger, y, delay, duration, once, childSelector] }
  );

  return (
    <Component ref={containerRef} className={`stagger-group ${className}`} {...rest}>
      {children}
    </Component>
  );
}

export default StaggerGroup;
