import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, DUR, EASE, MOTION, prefersReducedMotion } from "../../lib/motion.js";
import "./Reveal.css";

export function Reveal({
  as: Component = "div",
  delay = 0,
  y = MOTION.yHeading,
  duration = DUR.textHeading,
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

      gsap.from(el, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: EASE.focus,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once
        }
      });
    },
    { scope: containerRef, dependencies: [delay, y, duration, once] }
  );

  return (
    <Component ref={containerRef} className={`reveal ${className}`} {...rest}>
      {children}
    </Component>
  );
}

export default Reveal;
