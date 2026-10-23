import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TableOfContents from "./TableOfContents";
import LegalSection from "./LegalSection";
import { getLenis } from "../../lib/smoothScroll.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./LegalPageLayout.css";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 88; // 72px header + 16px spacing

export function LegalPageLayout({ documents = [], className = "" }) {
  const location = useLocation();
  const containerRef = useRef(null);

  const initialHash = location.hash.replace(/^#/, "");
  const defaultId =
    initialHash && documents.some((d) => d.id === initialHash)
      ? initialHash
      : documents[0]?.id || "privacy";

  const [activeId, setActiveId] = useState(defaultId);
  const [prevHash, setPrevHash] = useState(location.hash);

  if (location.hash !== prevHash) {
    setPrevHash(location.hash);
    const raw = location.hash.replace(/^#/, "");
    if (raw && documents.some((d) => d.id === raw)) {
      setActiveId(raw);
    }
  }

  // Active section tracking via ScrollTrigger
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const sections = containerRef.current.querySelectorAll(".legal-document");
      if (!sections.length) return;

      const triggers = [];

      sections.forEach((sec) => {
        const trigger = ScrollTrigger.create({
          trigger: sec,
          start: `top ${HEADER_OFFSET + 40}px`,
          end: `bottom ${HEADER_OFFSET + 40}px`,
          onEnter: () => setActiveId(sec.id),
          onEnterBack: () => setActiveId(sec.id)
        });
        triggers.push(trigger);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [documents] }
  );

  // Scroll function using Lenis or native fallback
  const scrollToTarget = (targetId, isImmediate = false) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    ScrollTrigger.refresh();
    const lenis = getLenis();
    const immediate = isImmediate || prefersReducedMotion();

    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(target, {
        offset: -HEADER_OFFSET,
        immediate
      });
    } else {
      target.scrollIntoView({
        behavior: immediate ? "auto" : "smooth"
      });
    }

    // Move focus to heading
    const heading = target.querySelector("h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  };

  const handleNavigate = (targetId) => {
    setActiveId(targetId);
    scrollToTarget(targetId);
    window.history.replaceState(null, "", `#${targetId}`);
  };

  // Hash handling on mount and location.hash change (wait for layout to settle)
  useEffect(() => {
    const rawHash = location.hash.replace(/^#/, "");
    if (!rawHash) return;

    const validIds = documents.map((d) => d.id);
    if (!validIds.includes(rawHash)) return;

    const performScroll = () => {
      scrollToTarget(rawHash, prefersReducedMotion());
    };

    let r2 = null;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        if (document.fonts?.ready) {
          document.fonts.ready.then(performScroll).catch(performScroll);
        } else {
          performScroll();
        }
      });
    });

    return () => {
      cancelAnimationFrame(r1);
      if (r2) cancelAnimationFrame(r2);
    };
  }, [location.hash, documents]);

  return (
    <div ref={containerRef} className={`legal-layout ${className}`}>
      {/* Table of contents column */}
      <aside className="legal-layout__sidebar">
        <TableOfContents
          documents={documents}
          activeId={activeId}
          onNavigate={handleNavigate}
        />
      </aside>

      {/* Main legal document content column */}
      <main className="legal-layout__content">
        {documents.map((doc) => (
          <section
            key={doc.id}
            id={doc.id}
            className="legal-document"
            style={{ scrollMarginTop: `${HEADER_OFFSET}px` }}
            aria-labelledby={`heading-${doc.id}`}
          >
            <header className="legal-document__header">
              <h2
                id={`heading-${doc.id}`}
                className="legal-document__title display-l"
              >
                {doc.title}
              </h2>
              {doc.intro && (
                <p className="legal-document__intro body">{doc.intro}</p>
              )}
            </header>

            <div className="legal-document__clauses">
              {doc.clauses.map((clause) => (
                <LegalSection key={clause.id} clause={clause} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default LegalPageLayout;
