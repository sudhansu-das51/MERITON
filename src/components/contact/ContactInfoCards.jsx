import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "../../data/siteConfig.js";
import { contactPage } from "../../data/contactPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./ContactInfoCards.css";

gsap.registerPlugin(ScrollTrigger);

export function ContactInfoCards({ className = "" }) {
  const containerRef = useRef(null);
  const cellsRef = useRef([]);
  const { contact } = siteConfig;
  const { info } = contactPage;

  const addCell = (el) => {
    if (el && !cellsRef.current.includes(el)) {
      cellsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!cellsRef.current.length) return;

      gsap.from(cellsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    },
    { scope: containerRef }
  );

  // Link URLs
  const phoneTel = contact.phone ? `tel:${contact.phone.replace(/[\s-]/g, "")}` : "#";
  const waText = encodeURIComponent(info.whatsapp.text || "Hi MERITON, I have a question.");
  const waUrl = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${waText}` : "#";
  const emailMailto = contact.email ? `mailto:${contact.email}` : "#";
  const addressQuery = encodeURIComponent(contact.address);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

  const cards = [
    {
      id: "call",
      label: info.call.label,
      value: contact.phone,
      action: info.call.action,
      href: phoneTel,
      external: false
    },
    {
      id: "whatsapp",
      label: info.whatsapp.label,
      value: info.whatsapp.value,
      action: info.whatsapp.action,
      href: waUrl,
      external: true
    },
    {
      id: "email",
      label: info.email.label,
      value: contact.email,
      action: info.email.action,
      href: emailMailto,
      external: false
    },
    {
      id: "visit",
      label: info.visit.label,
      value: contact.address.replace(/^MERITON Academy,\s*/, ""),
      action: info.visit.action,
      href: mapUrl,
      external: true
    }
  ];

  return (
    <div ref={containerRef} className={`contact-info-strip ${className}`} role="list">
      {cards.map((card) => (
        <a
          key={card.id}
          ref={addCell}
          href={card.href}
          target={card.external ? "_blank" : undefined}
          rel={card.external ? "noopener noreferrer" : undefined}
          className="contact-info-cell"
          role="listitem"
        >
          <div className="contact-info-cell__top">
            <span className="contact-info-cell__label label">{card.label}</span>
          </div>

          <div className="contact-info-cell__main">
            <span className="contact-info-cell__value display-l">{card.value}</span>
          </div>

          <div className="contact-info-cell__bottom">
            <span className="contact-info-cell__action label">
              <span>{card.action}</span>
              <ArrowRight size={14} className="contact-info-cell__arrow" aria-hidden="true" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ContactInfoCards;
