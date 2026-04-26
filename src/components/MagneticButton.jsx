import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// MagneticButton
// The cursor magnetically attracts the button toward it on hover.
// On click, a quick compress-and-release spring gives tactile feedback.
// ─────────────────────────────────────────────────────────────
export default function MagneticButton({
  children,
  className = '',
  style = {},
  strength = 0.35,
  onClick,
  type = 'button',
}) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring physics — snappy enough to feel magnetic
  const x = useSpring(rawX, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`btn-magnetic ${className}`}
      style={{ ...style, x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {children}
    </motion.button>
  );
}
