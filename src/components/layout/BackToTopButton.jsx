import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { getLenis } from "../../lib/smoothScroll.js";
import "./BackToTopButton.css";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}

export default BackToTopButton;
