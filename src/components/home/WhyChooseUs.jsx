import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { homeContent } from "../../data/home.js";
import { gsap, DUR, EASE, MOTION, ScrollTrigger, prefersReducedMotion } from "../../lib/motion.js";
import "./WhyChooseUs.css";

export function WhyChooseUs() {
  const { sections, why } = homeContent;
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const progressLineRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const secEl = sectionRef.current;
      const listEl = listRef.current;
      const progressLine = progressLineRef.current;
      if (!secEl || !listEl) return;

      const title = secEl.querySelector(".why-choose-us__title");
      const rows = listEl.querySelectorAll(".why-choose-us__row");

      const mm = gsap.matchMedia();

      // -----------------------------------------------------------------------
      // MOBILE (< 900px): CUT ALL ANIMATIONS COMPLETELY
      // Content, numbers, and images remain immediately visible, fast, and static.
      // -----------------------------------------------------------------------
      mm.add("(max-width: 899px)", () => {
        // No ScrollTriggers or tween offsets on mobile. Pure static layout.
      });

      // -----------------------------------------------------------------------
      // DESKTOP (>= 900px): RICH SUBSECTION-BY-SUBSECTION SCROLL REVEAL
      // Text and images reveal distinctly as the user scrolls into each row.
      // -----------------------------------------------------------------------
      mm.add("(min-width: 900px)", () => {
        // 1. Heading reveals smoothly
        if (title) {
          gsap.from(title, {
            y: MOTION.yHeading,
            opacity: 0,
            duration: DUR.textHeading,
            ease: EASE.focus,
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: secEl,
              start: "top 82%",
              once: true
            }
          });
        }

        // 2. Individual sub-section scroll reveal (Text & Image reveal on scroll into each row)
        rows.forEach((row) => {
          const num = row.querySelector(".why-choose-us__num");
          const content = row.querySelector(".why-choose-us__content");
          const thumb = row.querySelector(".why-choose-us__thumb");
          const node = row.querySelector(".why-choose-us__node");

          // Row reveal timeline: triggers as each individual row enters reading zone
          const rowTl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play none none reverse"
            }
          });

          // Text & numeral reveal smoothly from bottom
          if (num && content) {
            rowTl.fromTo(
              [num, content],
              { y: 36, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: "power2.out"
              }
            );
          }

          // Relatable square image slides in smoothly from the right
          if (thumb) {
            rowTl.fromTo(
              thumb,
              { x: 52, opacity: 0, scale: 0.92 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                ease: "power2.out"
              },
              "-=0.45"
            );
          }

          // 3. Highlight active subsection & checkpoint node as user reads through
          ScrollTrigger.create({
            trigger: row,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) {
                row.classList.add("is-active");
                if (node) {
                  gsap.to(node, {
                    scale: 1.4,
                    backgroundColor: "#06201A",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              } else {
                row.classList.remove("is-active");
                if (node) {
                  gsap.to(node, {
                    scale: 1,
                    backgroundColor: "rgba(6, 32, 26, 0.25)",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }
            }
          });
        });

        // 4. Vertical progress bar scrub along the rail
        if (progressLine) {
          ScrollTrigger.create({
            trigger: listEl,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
            onUpdate: (self) => {
              gsap.set(progressLine, { scaleY: self.progress });
            }
          });
        }

        // Refresh triggers once mounted to ensure accurate page offsets
        ScrollTrigger.refresh();
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="why-choose-us section section--light" aria-labelledby="why-heading">
      <div className="container why-choose-us__inner">
        {/* Sticky Left Column */}
        <div className="why-choose-us__left">
          <div className="why-choose-us__sticky">
            <h2 id="why-heading" className="why-choose-us__title h2">
              {sections.why.title}
            </h2>
          </div>
        </div>

        {/* Right Column: Ledger List with Vertical Progress Track & Relatable Square Images */}
        <div className="why-choose-us__right">
          <div className="why-choose-us__rail" aria-hidden="true">
            <div ref={progressLineRef} className="why-choose-us__rail-fill" />
          </div>

          <div ref={listRef} className="why-choose-us__list" role="list">
            {why.map((item) => (
              <div key={item.n} className="why-choose-us__row" role="listitem">
                {/* Node dot on progress rail */}
                <span className="why-choose-us__node" aria-hidden="true" />

                {/* Huge Serif Numeral */}
                <div className="why-choose-us__num display-l numeral" aria-hidden="true">
                  {item.n}
                </div>

                {/* Content: Title, Description, and Metric Badge */}
                <div className="why-choose-us__content">
                  <div className="why-choose-us__content-top">
                    <h3 className="why-choose-us__row-title h3">
                      {item.title}
                    </h3>
                    <div className="why-choose-us__metric label">
                      {item.metric}
                    </div>
                  </div>
                  <p className="why-choose-us__row-line small">
                    {item.line}
                  </p>
                </div>

                {/* Relatable Square Image at the End of Section */}
                <div className="why-choose-us__thumb" aria-hidden="true">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="why-choose-us__thumb-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="why-choose-us__thumb-overlay" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
