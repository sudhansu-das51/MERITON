import { Phone, FileText } from "lucide-react";
import WhatsAppIcon from "../common/WhatsAppIcon";
import { siteConfig } from "../../data/siteConfig.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import "./StickyEnquireBar.css";

export function StickyEnquireBar() {
  const { openEnquiry } = useEnquiry();
  const phoneClean = siteConfig.contact.phone.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi MERITON, I would like to enquire about courses and admissions.")}`;

  return (
    <div className="sticky-bar" role="toolbar" aria-label="Quick mobile enquiry actions">
      <div className="sticky-bar__inner">
        {/* Action 1: Call */}
        <a
          href={`tel:${phoneClean}`}
          className="sticky-bar__action"
          aria-label={`Call academy at ${siteConfig.contact.phone}`}
        >
          <Phone size={18} aria-hidden="true" />
          <span className="label">Call</span>
        </a>

        {/* Action 2: WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-bar__action"
          aria-label="Chat with MERITON on WhatsApp"
        >
          <WhatsAppIcon size={18} />
          <span className="label">WhatsApp</span>
        </a>

        {/* Action 3: Enquire */}
        <button
          type="button"
          onClick={() => openEnquiry()}
          className="sticky-bar__action sticky-bar__action--highlight"
          aria-label="Open admission enquiry form"
        >
          <FileText size={18} aria-hidden="true" />
          <span className="label">Enquire</span>
        </button>
      </div>
    </div>
  );
}

export default StickyEnquireBar;
