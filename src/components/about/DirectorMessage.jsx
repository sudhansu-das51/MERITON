import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import ImageWithFallback from "../common/ImageWithFallback";
import Reveal from "../animations/Reveal";
import { gsap, EASE, prefersReducedMotion } from "../../lib/motion";
import { about } from "../../data/about";
import "./DirectorMessage.css";

export function DirectorMessage({
  director = about.director,
  heading = about.page.sections.director,
  className = ""
}) {
  const imageFrameRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = imageFrameRef.current;
      if (!el) return;

      const img = el.querySelector(".img-frame__image");
      if (!img) return;

      gsap.fromTo(
        img,
        { scale: 1.05 },
        {
          scale: 1,
          duration: 1.2,
          ease: EASE.out,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true
          }
        }
      );
    },
    { scope: imageFrameRef }
  );

  return (
    <div className={`director-message ${className}`}>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              index={heading.index}
              label={heading.label}
              title={heading.title}
              id="director-heading"
            />
          </Reveal>
        )}

        <div className="director-message__grid">
          {/* Portrait Image Column */}
          <div ref={imageFrameRef} className="director-message__portrait">
            <Reveal delay={0.1}>
              <ImageWithFallback
                src={director.photo}
                alt={`${director.name}, ${director.role}`}
                ratio="4/5"
                duotone={false}
                label="DIRECTOR ARCHIVE"
              />
            </Reveal>
          </div>

          {/* Editorial Content Column */}
          <div className="director-message__content">
            <Reveal delay={0.15}>
              <blockquote className="director-message__quote">
                &ldquo;{director.quote}&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="director-message__text body">
                {director.message}
              </p>
            </Reveal>

            <Reveal delay={0.35} className="director-message__meta">
              <div className="director-message__author label">
                <span className="director-message__name">{director.name}</span>
                <span className="director-message__meta-sep" aria-hidden="true">&bull;</span>
                <span className="director-message__role">{director.role}</span>
              </div>
              <div className="director-message__credentials label">
                {director.credentials}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default DirectorMessage;
