import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./CountUp.css";

export function CountUp({
  value = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = ""
}) {
  const targetNum = typeof value === "number" ? value : parseInt(value, 10) || 0;
  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion() ? (typeof value === "number" ? value : parseInt(value, 10) || 0) : 0
  );
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    let animInstance = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const targetObj = { val: 0 };

          animInstance = animate(targetObj, {
            val: targetNum,
            duration: duration * 1000,
            ease: "outExpo",
            onUpdate: () => {
              setDisplayValue(Math.round(targetObj.val));
            }
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animInstance) {
        animInstance.revert?.();
      }
    };
  }, [targetNum, duration]);

  const formattedDisplay = displayValue.toLocaleString("en-IN");
  const fullLabel = `${prefix}${targetNum.toLocaleString("en-IN")}${suffix}`;

  return (
    <span
      ref={containerRef}
      className={`count-up numeral ${className}`}
      aria-label={fullLabel}
    >
      <span aria-hidden="true">
        {prefix}
        {formattedDisplay}
        {suffix}
      </span>
    </span>
  );
}

export default CountUp;
