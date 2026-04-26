import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// ─────────────────────────────────────────────────────────────
// useLenis
// Initialises Lenis smooth scroll and ties it to GSAP ticker
// so ScrollTrigger stays in sync.
// ─────────────────────────────────────────────────────────────
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll duration multiplier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 0.8,   // slightly slower than default for luxury feel
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
