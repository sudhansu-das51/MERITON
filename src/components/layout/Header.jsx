import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu } from "lucide-react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Button from "../common/Button";
import { siteConfig } from "../../data/siteConfig.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import "./Header.css";

export function Header() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isMobileMenuOpen) {
        setIsScrolledDown(false);
        return;
      }

      if (currentScrollY > 300 && currentScrollY > lastScrollYRef.current) {
        // Scrolling down past 300px -> hide header
        setIsScrolledDown(true);
      } else if (currentScrollY < lastScrollYRef.current) {
        // Scrolling up -> show header
        setIsScrolledDown(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`site-header ${isScrolledDown ? "site-header--hidden" : ""}`}
        role="banner"
      >
        <div className="container site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="MERITON Home">
            <img src="/meriton.svg" alt="MERITON" className="site-header__logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="site-header__nav-wrapper">
            <Navbar />
          </div>

          {/* Header Actions */}
          <div className="site-header__actions">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="site-header__phone-link"
              aria-label={`Call academy at ${siteConfig.contact.phone}`}
            >
              <Phone size={18} aria-hidden="true" />
            </a>

            <div className="site-header__enquire-btn">
              <Button
                variant="primary"
                size="sm"
                onClick={() => openEnquiry()}
              >
                Enquire now
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="site-header__hamburger"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Header;
