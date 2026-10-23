import { Phone, Mail } from "lucide-react";
import { siteConfig } from "../../data/siteConfig.js";
import "./TopBar.css";

export function TopBar() {
  const { contact, announcement } = siteConfig;

  return (
    <div className="top-bar" role="region" aria-label="Academy announcement and contact">
      <div className="container top-bar__inner">
        <div className="top-bar__announcement label">
          <span className="top-bar__tick" aria-hidden="true" />
          <span>{announcement}</span>
        </div>

        <div className="top-bar__contacts">
          <a
            href={`tel:${contact.phone.replace(/\s+/g, "")}`}
            className="top-bar__link label"
            aria-label={`Call us at ${contact.phone}`}
          >
            <Phone size={13} aria-hidden="true" />
            <span>{contact.phone}</span>
          </a>

          <span className="top-bar__sep" aria-hidden="true">/</span>

          <a
            href={`mailto:${contact.email}`}
            className="top-bar__link label"
            aria-label={`Email us at ${contact.email}`}
          >
            <Mail size={13} aria-hidden="true" />
            <span>{contact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
