import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// CustomCursor
// Dual-ring cursor: small dot snaps instantly, outer ring
// follows with a spring lag for a trailing feel.
// Hidden on touch devices via CSS.
// ─────────────────────────────────────────────────────────────
export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Outer ring springs behind the dot
  const ringX = useSpring(dotX, { stiffness: 120, damping: 18, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 120, damping: 18, mass: 0.6 });

  // Scale state for hover / click
  const scaleRef = useRef(1);
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onDown = () => scale.set(0.75);
    const onUp   = () => scale.set(scaleRef.current);

    // Expand ring when hovering interactive elements
    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor="expand"]')) {
        scaleRef.current = 2;
        scale.set(2);
      }
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor="expand"]')) {
        scaleRef.current = 1;
        scale.set(1);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [dotX, dotY, scale]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          scale: springScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="w-9 h-9 rounded-full border border-sage-500 opacity-60"
          style={{ borderColor: 'var(--color-sage)' }}
        />
      </motion.div>

      {/* Inner dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--color-sage)' }}
        />
      </motion.div>
    </>
  );
}
