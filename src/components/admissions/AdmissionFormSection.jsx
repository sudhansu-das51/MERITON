import { Phone, Mail } from "lucide-react";
import WhatsAppIcon from "../common/WhatsAppIcon";
import SectionHeading from "../common/SectionHeading";
import AdmissionForm from "../forms/AdmissionForm";
import { admissions } from "../../data/admissions.js";
import { siteConfig } from "../../data/siteConfig.js";
import "./AdmissionFormSection.css";

export function AdmissionFormSection({ className = "" }) {
  const { sections } = admissions.page;
  const { contact } = siteConfig;

  // Clean phone for tel: link
  const phoneTel = contact.phone ? contact.phone.replace(/[^\d+]/g, "") : "";
  const waUrl = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : "#";

  return (
    <div className={`admission-form-section ${className}`} id="admission-form-section">
      <div className="admission-form-section__grid">
        {/* Left Column on Lichen */}
        <div className="admission-form-section__info">
          <SectionHeading
            index={sections.apply.index}
            label={sections.apply.label}
            title={sections.apply.title}
          />

          <p className="admission-form-section__line body">{sections.apply.line}</p>

          <div className="admission-form-section__contacts" role="list">
            <a
              href={`tel:${phoneTel}`}
              className="admission-form-section__contact-link"
              role="listitem"
            >
              <span className="admission-form-section__contact-icon" aria-hidden="true">
                <Phone size={18} />
              </span>
              <div className="admission-form-section__contact-text">
                <span className="admission-form-section__contact-label label">Call Admissions</span>
                <span className="admission-form-section__contact-val numeral">{contact.phone}</span>
              </div>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="admission-form-section__contact-link"
              role="listitem"
            >
              <span className="admission-form-section__contact-icon" aria-hidden="true">
                <WhatsAppIcon size={18} />
              </span>
              <div className="admission-form-section__contact-text">
                <span className="admission-form-section__contact-label label">WhatsApp Desk</span>
                <span className="admission-form-section__contact-val numeral">Quick chat & questions</span>
              </div>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="admission-form-section__contact-link"
              role="listitem"
            >
              <span className="admission-form-section__contact-icon" aria-hidden="true">
                <Mail size={18} />
              </span>
              <div className="admission-form-section__contact-text">
                <span className="admission-form-section__contact-label label">Email Office</span>
                <span className="admission-form-section__contact-val">{contact.email}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Dark Panel hosting AdmissionForm */}
        <div className="admission-form-section__panel">
          <div className="admission-form-section__panel-header">
            <h3 className="admission-form-section__panel-title h3">Application Details</h3>
            <span className="admission-form-section__panel-badge label">Step 1 of 5</span>
          </div>
          <AdmissionForm />
        </div>
      </div>
    </div>
  );
}

export default AdmissionFormSection;
