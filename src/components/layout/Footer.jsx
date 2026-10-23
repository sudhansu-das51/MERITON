import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "../../data/siteConfig.js";
import SocialLinks from "../common/SocialLinks";
import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { brand, contact, hours, footerLinks, nav } = siteConfig;

  const coursesNav = nav.find((item) => item.label === "Courses")?.children || [];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container site-footer__container">
        {/* Top Branding Section */}
        <div className="site-footer__brand-block">
          <Link to="/" className="site-footer__brand-link" aria-label="MERITON Home">
            <img src="/meriton.svg" alt="MERITON" className="site-footer__logo" />
          </Link>
          <p className="site-footer__descriptor body">{brand.descriptor}</p>
        </div>

        {/* 4-Column Navigation Matrix */}
        <div className="site-footer__grid">
          {/* Column 1: Courses */}
          <div className="site-footer__col">
            <span className="site-footer__heading label">Courses</span>
            <ul className="site-footer__list">
              {coursesNav.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="site-footer__link small">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Academy */}
          <div className="site-footer__col">
            <span className="site-footer__heading label">Academy</span>
            <ul className="site-footer__list">
              {footerLinks.academy.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="site-footer__link small">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="site-footer__col">
            <span className="site-footer__heading label">Support</span>
            <ul className="site-footer__list">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="site-footer__link small">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Desk */}
          <div className="site-footer__col">
            <span className="site-footer__heading label">Academy Desk</span>
            <div className="site-footer__contact-info small">
              <div className="site-footer__contact-item">
                <MapPin size={16} aria-hidden="true" className="site-footer__icon" />
                <span>{contact.address}</span>
              </div>
              <div className="site-footer__contact-item">
                <Phone size={16} aria-hidden="true" className="site-footer__icon" />
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                  {contact.phone}
                </a>
              </div>
              <div className="site-footer__contact-item">
                <Mail size={16} aria-hidden="true" className="site-footer__icon" />
                <a href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
              <div className="site-footer__contact-item">
                <Clock size={16} aria-hidden="true" className="site-footer__icon" />
                <span>{hours[0].days}, {hours[0].time}</span>
              </div>
            </div>

            <div className="site-footer__socials">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Legal & Copyright Row */}
        <div className="site-footer__bottom">
          <div className="site-footer__copyright label">
            &copy; {CURRENT_YEAR} MERITON. All rights reserved.
          </div>
          <ul className="site-footer__policies">
            {footerLinks.policies.map((p) => (
              <li key={p.label}>
                <Link to={p.to} className="site-footer__policy-link label">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
