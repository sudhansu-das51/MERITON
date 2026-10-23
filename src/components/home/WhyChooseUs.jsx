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

      // 1. Heading reveals first
      if (title) {
        gsap.from(title, {
          y: MOTION.yHeading,
          opacity: 0,
          duration: DUR.textHeading,
          ease: EASE.focus,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: secEl,
            start: "top 85%",
            once: true
          }
        });
      }

      // 2. Ledger rows stagger in
      if (rows.length) {
        gsap.from(rows, {
          y: MOTION.yCard,
          opacity: 0,
          duration: DUR.card,
          stagger: 0.08,
          ease: EASE.focus,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: listEl,
            start: "top 85%",
            once: true
          }
        });
      }

      // 3. Vertical progress bar scrub
      if (progressLine) {
        ScrollTrigger.create({
          trigger: listEl,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(progressLine, { scaleY: self.progress });
          }
        });
      }

      // 4. Highlight active subsection as user scrolls through
      rows.forEach((row) => {
        const node = row.querySelector(".why-choose-us__node");
        const thumb = row.querySelector(".why-choose-us__thumb");

        ScrollTrigger.create({
          trigger: row,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) => {
            if (self.isActive) {
              row.classList.add("is-active");
              if (node) {
                gsap.to(node, {
                  scale: 1.3,
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
