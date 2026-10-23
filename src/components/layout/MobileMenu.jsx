import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { siteConfig } from "../../data/siteConfig.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import { gsap, DUR, EASE, prefersReducedMotion } from "../../lib/motion.js";
import { pauseSmoothScroll, resumeSmoothScroll } from "../../lib/smoothScroll.js";
import Button from "../common/Button";
import "./MobileMenu.css";

export function MobileMenu({ isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState({ Courses: false, More: false });
  const location = useLocation();
  const { openEnquiry } = useEnquiry();
  const menuRef = useRef(null);
  const linksContainerRef = useRef(null);

  const prevPathRef = useRef(location.pathname);

  // Close only when route pathname actually changes
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [location.pathname, isOpen, onClose]);

  // Lock body scroll and stop Lenis when open
  useEffect(() => {
    if (isOpen) {
      pauseSmoothScroll();
      document.body.style.overflow = "hidden";
    } else {
      resumeSmoothScroll();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      resumeSmoothScroll();
    };
  }, [isOpen]);

  // GSAP animation for staggered menu items
  useEffect(() => {
    if (!isOpen) return;

    if (prefersReducedMotion()) return;

    const el = menuRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".mobile-menu__item, .mobile-menu__cta");
    gsap.fromTo(
      items,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DUR.base,
        stagger: 0.05,
        ease: EASE.out,
        delay: 0.1
      }
    );
  }, [isOpen]);

  // Escape listener & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = menuRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || !focusable.length) return;

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
  }, [isOpen, onClose]);

  const toggleSection = (label) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div className="mobile-menu__header">
        <div className="mobile-menu__brand">
          <NavLink to="/" onClick={onClose} aria-label="MERITON Home">
            <img src="/meriton.svg" alt="MERITON" className="mobile-menu__logo" />
          </NavLink>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mobile-menu__close"
          aria-label="Close navigation menu"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <div ref={linksContainerRef} className="mobile-menu__content">
        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__list">
            {siteConfig.nav.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = !!expandedSections[item.label];

              if (hasChildren) {
                return (
                  <li key={item.label} className="mobile-menu__item mobile-menu__item--accordion">
                    <button
                      type="button"
                      className="mobile-menu__link mobile-menu__accordion-trigger"
                      aria-expanded={isExpanded}
                      onClick={() => toggleSection(item.label)}
                    >
                      <span className="display-l">{item.label}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`mobile-menu__chevron ${isExpanded ? "mobile-menu__chevron--rotated" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="mobile-menu__sublist">
                        {item.children.map((child) => (
                          <li key={child.label} className="mobile-menu__subitem">
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                `mobile-menu__sublink ${isActive ? "mobile-menu__sublink--active" : ""}`
                              }
                              onClick={onClose}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.label} className="mobile-menu__item">
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `mobile-menu__link display-l ${isActive ? "mobile-menu__link--active" : ""}`
                    }
                    onClick={onClose}
                  >
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mobile-menu__cta">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => {
            onClose();
            openEnquiry();
          }}
        >
          Enquire now
        </Button>
      </div>
    </div>
  );
}

export default MobileMenu;
