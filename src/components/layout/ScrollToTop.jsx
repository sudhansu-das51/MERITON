import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../../lib/smoothScroll.js";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL has a hash anchor, let native browser scroll or anchor handling proceed
    if (hash) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
