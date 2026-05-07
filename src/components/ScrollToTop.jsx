import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../hooks/useLenis';

// Resets scroll to the top whenever the route path changes.
// Uses Lenis if available so the jump respects the smooth-scroll engine;
// falls back to native window.scrollTo otherwise.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
