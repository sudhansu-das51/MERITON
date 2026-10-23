import WhatsAppIcon from "../common/WhatsAppIcon";
import { siteConfig } from "../../data/siteConfig.js";
import "./FloatingWhatsAppButton.css";

export function FloatingWhatsAppButton() {
  const whatsappNumber = siteConfig.contact.whatsapp;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi MERITON, I would like to enquire about courses and admissions.")}`;

  return (
    <aside aria-label="Quick contact" className="floating-wa">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa__btn"
        aria-label="Chat with MERITON Admissions on WhatsApp (opens in new tab)"
      >
        <WhatsAppIcon size={22} className="floating-wa__icon" />
        <span className="floating-wa__text label">WhatsApp</span>
      </a>
    </aside>
  );
}

export default FloatingWhatsAppButton;
