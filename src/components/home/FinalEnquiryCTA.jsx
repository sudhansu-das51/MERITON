import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Phone } from "lucide-react";
import { homeContent } from "../../data/home.js";
import { siteConfig } from "../../data/siteConfig.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import { gsap, prefersReducedMotion } from "../../lib/motion.js";
import Button from "../common/Button";
import WhatsAppIcon from "../common/WhatsAppIcon";
import FocusReveal from "../animations/FocusReveal";
import "./FinalEnquiryCTA.css";

export function FinalEnquiryCTA() {
  const { finalCta } = homeContent;
  const { contact } = siteConfig;
  const { openEnquiry } = useEnquiry();

  const sectionRef = useRef(null);
  const bgWordRef = useRef(null);

  const phoneClean = contact.phone.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi MERITON, I would like to enquire about the upcoming batch.")}`;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const wordEl = bgWordRef.current;
      const secEl = sectionRef.current;
      if (!wordEl || !secEl) return;

      gsap.fromTo(
        wordEl,
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: secEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="final-cta section section--main"
      aria-label="Final Admission Call to Action"
    >
      {/* Oversized Outlined MERITON Parallax Background */}
      <div
        ref={bgWordRef}
        className="final-cta__bg-word"
        aria-hidden="true"
      >
        MERITON
      </div>

      <div className="container final-cta__container">
        <FocusReveal className="final-cta__content">
          <span className="final-cta__tick" aria-hidden="true" />

          <h2 className="final-cta__title display-l focus-heading">
            {finalCta.title}
          </h2>

          <p className="final-cta__line body focus-subtext">
            {finalCta.line}
          </p>

          <div className="final-cta__actions focus-cta">
            <Button
              variant="primary"
              size="lg"
              showArrow
              onClick={() => openEnquiry()}
            >
              Enquire now
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={`tel:${phoneClean}`}
              icon={<Phone size={18} />}
            >
              Call {contact.phone}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={18} />}
            >
              WhatsApp
            </Button>
          </div>
        </FocusReveal>

        {/* Right side relatable admissions & batch guidance image */}
        <div className="final-cta__media-frame focus-card">
          <div className="final-cta__media-card">
            <img
              src="/images/about/doubt-desk.jpg"
              alt="Admissions desk academic counseling at MERITON"
              className="final-cta__image"
              loading="lazy"
            />
            <div className="final-cta__media-overlay">
              <div className="final-cta__media-badge label">
                <span className="final-cta__badge-dot" aria-hidden="true" />
                Admissions Open &bull; 1-on-1 Guidance
              </div>
              <span className="final-cta__media-caption">
                Talk to our academic counselors today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalEnquiryCTA;
