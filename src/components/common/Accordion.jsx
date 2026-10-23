import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { animate } from "animejs";
import { gsap, DUR, EASE, prefersReducedMotion } from "../../lib/motion.js";
import "./Accordion.css";

function AccordionItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    const el = contentRef.current;
    const icon = iconRef.current;
    if (!el) return;

    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (!isOpen) {
        gsap.set(el, { height: 0, opacity: 0 });
      } else {
        gsap.set(el, { height: "auto", opacity: 1 });
        if (icon) gsap.set(icon, { rotate: 45 });
      }
      return;
    }

    if (prefersReducedMotion()) {
      if (isOpen) {
        gsap.set(el, { height: "auto", opacity: 1 });
        if (icon) gsap.set(icon, { rotate: 45 });
      } else {
        gsap.set(el, { height: 0, opacity: 0 });
        if (icon) gsap.set(icon, { rotate: 0 });
      }
      return;
    }

    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: DUR.fast, ease: EASE.out }
      );
      if (icon) {
        animate(icon, {
          rotate: 45,
          duration: 250,
          ease: "outQuad"
        });
      }
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: DUR.fast,
        ease: EASE.out
      });
      if (icon) {
        animate(icon, {
          rotate: 0,
          duration: 250,
          ease: "outQuad"
        });
      }
    }
  }, [isOpen]);

  const headerId = `acc-header-${item.id || index}`;
  const contentId = `acc-content-${item.id || index}`;

  return (
    <div className={`accordion__item ${isOpen ? "accordion__item--open" : ""}`}>
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="accordion__trigger"
        onClick={onToggle}
      >
        <span className="accordion__title">{item.title}</span>
        <span ref={iconRef} className="accordion__icon" aria-hidden="true">
          <Plus size={18} />
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        ref={contentRef}
        className="accordion__content"
      >
        <div className="accordion__body small">
          {item.content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items = [],
  defaultOpenIndex = 0,
  allowMultiple = false,
  className = ""
}) {
  const [openIndices, setOpenIndices] = useState(() =>
    defaultOpenIndex !== null && defaultOpenIndex >= 0 ? [defaultOpenIndex] : []
  );

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          item={item}
          index={index}
          isOpen={openIndices.includes(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

export default Accordion;
