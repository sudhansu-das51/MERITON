import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { gsap, DUR, EASE, prefersReducedMotion } from "../../lib/motion.js";
import { pauseSmoothScroll, resumeSmoothScroll } from "../../lib/smoothScroll.js";
import "./Modal.css";

export function Modal({
  isOpen,
  onClose,
  title,
  labelledBy = "modal-title",
  children,
  className = ""
}) {
  const [mounted, setMounted] = useState(false);
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setMounted(true);
    } else if (prefersReducedMotion()) {
      setMounted(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      pauseSmoothScroll();
      document.body.style.overflow = "hidden";
    } else if (mounted) {
      if (prefersReducedMotion()) {
        resumeSmoothScroll();
        document.body.style.overflow = "";
        previousFocusRef.current?.focus?.();
        return;
      }

      // Exit animation
      const tl = gsap.timeline({
        onComplete: () => {
          setMounted(false);
          resumeSmoothScroll();
          document.body.style.overflow = "";
          previousFocusRef.current?.focus?.();
        }
      });

      if (panelRef.current) {
        tl.to(panelRef.current, {
          opacity: 0,
          y: 16,
          scale: 0.98,
          duration: DUR.fast,
          ease: EASE.out
        });
      }
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          { opacity: 0, duration: DUR.fast, ease: EASE.out },
          "<"
        );
      }
    }
  }, [isOpen, mounted]);

  // Entrance animation
  useEffect(() => {
    if (mounted && isOpen) {
      if (!prefersReducedMotion() && panelRef.current && overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(panelRef.current, { opacity: 0, y: 20, scale: 0.96 });

        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: DUR.fast,
          ease: EASE.out
        });

        gsap.to(panelRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DUR.base,
          ease: EASE.out
        });
      }

      // Move focus inside
      const focusable = panelRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }
  }, [mounted, isOpen]);

  // Keyboard trap and Escape listener
  useEffect(() => {
    if (!isOpen || !mounted) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, mounted, onClose]);

  if (!mounted && !isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? labelledBy : undefined}
    >
      <div ref={panelRef} className={`modal-panel ${className}`}>
        <div className="modal-panel__header">
          {title && (
            <h3 id={labelledBy} className="modal-panel__title h3">
              {title}
            </h3>
          )}
          <button
            type="button"
            className="modal-panel__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="modal-panel__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
