import { useRef } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactPage } from "../../data/contactPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./MapEmbed.css";

gsap.registerPlugin(ScrollTrigger);

export function MapEmbed({
  embedUrl = "",
  address = "",
  title = "MERITON Campus",
  className = ""
}) {
  const containerRef = useRef(null);
  const { map } = contactPage;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      gsap.from(containerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
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

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div ref={containerRef} className={`map-embed ${className}`}>
      <div className="map-embed__frame-wrap">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-embed__iframe"
          />
        ) : (
          <div className="map-embed__placeholder" role="img" aria-label={`Location placeholder for ${title}`}>
            <div className="map-embed__grid-pattern" aria-hidden="true" />
            <div className="map-embed__placeholder-content">
              <div className="map-embed__pin-wrap" aria-hidden="true">
                <MapPin size={28} className="map-embed__pin-icon" />
              </div>
              <span className="map-embed__address display-l">{address}</span>
              <span className="map-embed__note label">{map.placeholder}</span>
            </div>
          </div>
        )}
      </div>

      <div className="map-embed__action-wrap">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-embed__action-link label"
        >
          <span>{map.openLabel}</span>
          <ArrowRight size={14} className="map-embed__action-arrow" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default MapEmbed;
