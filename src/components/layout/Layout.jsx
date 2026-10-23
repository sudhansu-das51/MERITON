import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { EnquiryProvider } from "../../lib/EnquiryContext.jsx";
import { startSmoothScroll, stopSmoothScroll } from "../../lib/smoothScroll.js";
import { ScrollTrigger } from "../../lib/motion.js";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";
import StickyEnquireBar from "./StickyEnquireBar";
import BackToTopButton from "./BackToTopButton";
import ScrollToTop from "./ScrollToTop";
import EnquiryModal from "../forms/EnquiryModal";
import PageTransition from "../animations/PageTransition";
import "./Layout.css";

export function Layout() {
  useEffect(() => {
    // Start Lenis smooth scroll
    startSmoothScroll();

    // Refresh ScrollTrigger once fonts load
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      stopSmoothScroll();
    };
  }, []);

  return (
    <EnquiryProvider>
      <div className="layout">
        {/* Accessible Skip Link */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        {/* Global Route Scroll Reset */}
        <ScrollToTop />

        {/* Layout Shell */}
        <Header />

        <main id="main" className="layout__main">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>

        <Footer />

        {/* Utility / Floating Actions */}
        <FloatingWhatsAppButton />
        <StickyEnquireBar />
        <BackToTopButton />

        {/* Global Enquiry Modal */}
        <EnquiryModal />
      </div>
    </EnquiryProvider>
  );
}

export default Layout;
