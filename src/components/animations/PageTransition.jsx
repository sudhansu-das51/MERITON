import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, DUR, EASE, ScrollTrigger, prefersReducedMotion } from "../../lib/motion.js";
import { getLenis } from "../../lib/smoothScroll.js";
import { siteConfig } from "../../data/siteConfig.js";
import "./PageTransition.css";

// Helper to look up human label from path
function getPageLabel(pathname) {
  if (pathname === "/" || pathname === "") return "MERITON";

  // Check nav links
  for (const item of siteConfig.nav) {
    if (item.to && item.to.split("?")[0] === pathname) return item.label;
    if (item.children) {
      for (const child of item.children) {
        if (child.to && child.to.split("?")[0] === pathname) return child.label;
      }
    }
  }

  // Check footer links
  const allFooter = [
    ...(siteConfig.footerLinks.academy || []),
    ...(siteConfig.footerLinks.support || []),
    ...(siteConfig.footerLinks.policies || [])
  ];
  for (const item of allFooter) {
    if (item.to && item.to.split("?")[0] === pathname) return item.label;
  }

  if (pathname.startsWith("/courses/")) return "Course Details";
  return "MERITON";
}

export function PageTransition({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [destLabel, setDestLabel] = useState("MERITON");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);
  const stripsRef = useRef([]);
  const labelRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const prevPathnameRef = useRef(location.pathname);

  const addToStrips = (el) => {
    if (el && !stripsRef.current.includes(el)) {
      stripsRef.current.push(el);
    }
  };

  const runEnterAnimation = useCallback(() => {
    const strips = stripsRef.current;
    const overlay = overlayRef.current;
    const labelEl = labelRef.current;

    if (!strips.length || !overlay) {
      isNavigatingRef.current = false;
      setIsTransitioning(false);
      return;
    }

    gsap.set(strips, { transformOrigin: "top center" });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { pointerEvents: "none" });
        isNavigatingRef.current = false;
        setIsTransitioning(false);
        ScrollTrigger.refresh();
      }
    });

    if (labelEl) {
      tl.to(labelEl, { opacity: 0, y: -16, duration: DUR.fast, ease: EASE.out });
    }

    tl.to(strips, {
      scaleY: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: EASE.inOut
    });
  }, []);

  const runLeaveAndNavigate = useCallback((targetPathname, fullTarget) => {
    try {
      isNavigatingRef.current = true;
      setIsTransitioning(true);
      try {
        sessionStorage.setItem("meriton_has_seen_reveal", "true");
      } catch {
        // Fallback
      }
      const label = getPageLabel(targetPathname);
      setDestLabel(label);

      const strips = stripsRef.current;
      const overlay = overlayRef.current;
      const labelEl = labelRef.current;

      if (!strips.length || !overlay) {
        navigate(fullTarget);
        isNavigatingRef.current = false;
        setIsTransitioning(false);
        return;
      }

      // Leave: scale from 0 to 1 from bottom
      gsap.set(overlay, { pointerEvents: "auto", opacity: 1 });
      gsap.set(strips, { scaleY: 0, transformOrigin: "bottom center" });
      if (labelEl) gsap.set(labelEl, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        onComplete: () => {
          navigate(fullTarget);
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }

          // Enter animation after navigate
          setTimeout(() => {
            runEnterAnimation();
          }, 30);
        }
      });

      tl.to(strips, {
        scaleY: 1,
        duration: DUR.curtain,
        stagger: 0.05,
        ease: EASE.inOut
      });

      if (labelEl) {
        tl.to(
          labelEl,
          { opacity: 1, y: 0, duration: DUR.fast, ease: EASE.out },
          "-=0.2"
        );
      }
    } catch (err) {
      console.error("Transition failed, navigating directly:", err);
      navigate(fullTarget);
      isNavigatingRef.current = false;
      setIsTransitioning(false);
    }
  }, [navigate, runEnterAnimation]);

  // Intercept same-origin link clicks
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (prefersReducedMotion()) return;
      if (isNavigatingRef.current) return;

      const anchor = e.target.closest("a");
      if (!anchor) return;

      // Ensure it is an internal link
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return;
      }

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      let targetUrl;
      try {
        targetUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (targetUrl.origin !== window.location.origin) return;

      // If same page and no hash change, ignore
      const targetPath = targetUrl.pathname + targetUrl.search + targetUrl.hash;
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      if (targetPath === currentPath) return;

      e.preventDefault();
      runLeaveAndNavigate(targetUrl.pathname, targetPath);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [runLeaveAndNavigate]);

  // Browser back/forward navigation support
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      prevPathnameRef.current = location.pathname;
      if (!isNavigatingRef.current && !prefersReducedMotion()) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        ScrollTrigger.refresh();
      }
    }
  }, [location.pathname]);

  return (
    <>
      {/* 5-Strip Curtain Overlay */}
      <div
        ref={overlayRef}
        className={`page-transition-overlay ${isTransitioning ? "page-transition-overlay--active" : ""}`}
        aria-hidden="true"
      >
        <div className="page-transition-strips">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} ref={addToStrips} className="page-transition-strip" />
          ))}
        </div>
        <div ref={labelRef} className="page-transition-label label">
          {destLabel}
        </div>
      </div>

      <div className="page-content">{children}</div>
    </>
  );
}

export default PageTransition;
