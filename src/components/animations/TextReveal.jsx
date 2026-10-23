import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, prefersReducedMotion } from "../../lib/motion.js";
import "./TextReveal.css";

export function TextReveal({
  as: Component = "h1",
  text = "",
  delay = 0,
  trigger = "load",
  className = "",
  ...rest
}) {
  const containerRef = useRef(null);
  const cleanLabel = text.replace(/\*/g, "");

  // Parse words and identify asterisks (*word* -> italic)
  const tokens = text.split(" ").filter(Boolean);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const words = el.querySelectorAll(".text-reveal__word");
      if (!words.length) return;

      const animConfig = {
        y: "115%",
        duration: 0.85,
        stagger: 0.04,
        ease: EASE.out,
        delay
      };

      if (trigger === "scroll") {
        animConfig.scrollTrigger = {
          trigger: el,
          start: "top 88%",
          once: true
        };
      }

      gsap.from(words, animConfig);
    },
    { scope: containerRef, dependencies: [text, delay, trigger] }
  );

  return (
    <Component
      ref={containerRef}
      className={`text-reveal ${className}`}
      aria-label={cleanLabel}
      {...rest}
    >
      <span aria-hidden="true" className="text-reveal__inner">
        {tokens.map((token, i) => {
          const isItalic = token.startsWith("*") && token.endsWith("*") && token.length > 2;
          const cleanWord = isItalic ? token.slice(1, -1) : token;

          return (
            <span key={i} className="text-reveal__wrap">
              <span className="text-reveal__word">
                {isItalic ? (
                  <em className="text-reveal__italic">{cleanWord}</em>
                ) : (
                  cleanWord
                )}
              </span>
              {i < tokens.length - 1 && "\u00A0"}
            </span>
          );
        })}
      </span>
    </Component>
  );
}

export default TextReveal;
