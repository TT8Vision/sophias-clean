import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// useMagneticHover
// Returns motion values (x, y) that follow cursor with spring
// physics when hovered, creating a magnetic pull effect.
// ─────────────────────────────────────────────────────────────
export function useMagneticHover(strength = 0.4) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring config — stiff enough to feel snappy, soft enough to feel organic
  const x = useSpring(rawX, { stiffness: 200, damping: 15, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 15, mass: 0.5 });

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      rawX.set((e.clientX - centerX) * strength);
      rawY.set((e.clientY - centerY) * strength);
    },
    [rawX, rawY, strength]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}
