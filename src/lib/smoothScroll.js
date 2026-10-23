import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion.js";

let lenisInstance = null;
let tickerCallback = null;

export const getLenis = () => lenisInstance;

export const startSmoothScroll = () => {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    respectReducedMotion: true
  });

  // Sync with GSAP ScrollTrigger
  lenisInstance.on("scroll", () => {
    ScrollTrigger.update();
  });

  tickerCallback = (time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const pauseSmoothScroll = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const resumeSmoothScroll = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

export const stopSmoothScroll = () => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
