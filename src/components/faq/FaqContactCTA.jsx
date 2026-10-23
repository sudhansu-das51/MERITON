import { useRef } from "react";
import { Phone } from "lucide-react";
import { animate } from "animejs";
import Button from "../common/Button";
import WhatsAppIcon from "../common/WhatsAppIcon";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import { faqsPage } from "../../data/faqsPage.js";
import { siteConfig } from "../../data/siteConfig.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./FaqContactCTA.css";

export function FaqContactCTA({
  title = faqsPage.cta.title,
  line = faqsPage.cta.line,
  className = ""
}) {
  const { openEnquiry } = useEnquiry();
  const { contact } = siteConfig;
  const enquireBtnRef = useRef(null);

  const phoneTel = contact?.phone ? contact.phone.replace(/[^\d+]/g, "") : "+910000000000";
  const whatsappNum = contact?.whatsapp || "910000000000";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(faqsPage.cta.whatsappText)}`;

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !enquireBtnRef.current) return;
    const arrow = enquireBtnRef.current.querySelector(".btn__arrow");
    if (!arrow) return;
    animate(arrow, {
      translateX: [0, 4],
      duration: 200,
      ease: "outQuad"
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !enquireBtnRef.current) return;
    const arrow = enquireBtnRef.current.querySelector(".btn__arrow");
    if (!arrow) return;
    animate(arrow, {
      translateX: 0,
      duration: 200,
      ease: "outQuad"
    });
  };

  return (
    <div className={`faq-contact-cta ${className}`}>
      <div className="faq-contact-cta__inner">
        <div className="faq-contact-cta__text">
          <h2 className="faq-contact-cta__title display-l">
            {title}
          </h2>
          <p className="faq-contact-cta__line body">
            {line}
          </p>
        </div>

        <div className="faq-contact-cta__actions">
          <Button
            href={`tel:${phoneTel}`}
            variant="secondary"
            size="md"
            icon={<Phone size={16} />}
            className="faq-contact-cta__btn"
          >
            {faqsPage.cta.call}
          </Button>

          <Button
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            icon={<WhatsAppIcon size={16} />}
            className="faq-contact-cta__btn"
          >
            {faqsPage.cta.whatsapp}
          </Button>

          <div
            ref={enquireBtnRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="faq-contact-cta__enquire-wrap"
          >
            <Button
              variant="primary"
              size="md"
              onClick={() => openEnquiry({ message: "Question from FAQs page" })}
              showArrow
              className="faq-contact-cta__btn"
            >
              {faqsPage.cta.enquire}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqContactCTA;
