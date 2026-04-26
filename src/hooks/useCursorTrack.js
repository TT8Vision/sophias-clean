import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// useCursorTrack
// Returns normalised cursor position (-0.5 to 0.5) as spring
// motion values. Perfect for parallax hero sections.
// ─────────────────────────────────────────────────────────────
export function useCursorTrack() {
  const containerRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Lazy spring — slower follow creates depth feeling
  const x = useSpring(rawX, { stiffness: 40, damping: 20, mass: 1 });
  const y = useSpring(rawY, { stiffness: 40, damping: 20, mass: 1 });

  // Parallax layers — multiply for different depths
  const layer1X = useTransform(x, (v) => v * 20);   // foreground
  const layer1Y = useTransform(y, (v) => v * 20);
  const layer2X = useTransform(x, (v) => v * 10);   // midground
  const layer2Y = useTransform(y, (v) => v * 10);
  const layer3X = useTransform(x, (v) => v * 5);    // background
  const layer3Y = useTransform(y, (v) => v * 5);

  const onMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalise to -0.5 → 0.5
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY]
  );

  return {
    containerRef,
    onMouseMove,
    x,
    y,
    layer1X, layer1Y,
    layer2X, layer2Y,
    layer3X, layer3Y,
  };
}
