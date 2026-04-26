import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// useScrollReveal
// Returns a ref and a boolean that becomes true when the
// element enters the viewport. Triggers once by default.
// ─────────────────────────────────────────────────────────────
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,          // animate once — no jank on scroll-back
    margin: '-10% 0px', // trigger slightly before centre
    ...options,
  });

  return { ref, isInView };
}
