// ─────────────────────────────────────────────────────────────
// Reusable Framer Motion variants for Sophia's Clean
// ─────────────────────────────────────────────────────────────

// Fade up — primary entrance for text & sections
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,   // soft spring — feels organic
      damping: 20,
      mass: 0.8,
    },
  },
};

// Fade in only — for overlays and subtle reveals
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Scale up — cards, images, modals
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
    },
  },
};

// Slide in from left
export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 18,
    },
  },
};

// Slide in from right
export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 18,
    },
  },
};

// Stagger container — wraps staggered children
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,   // 120ms between each child
      delayChildren: 0.1,
    },
  },
};

// Stagger item — use inside staggerContainer
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 18,
    },
  },
};

// Clip reveal — text wipe effect from bottom
export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Magnetic button spring config
export const magneticSpring = {
  type: 'spring',
  stiffness: 200,   // snappy return
  damping: 15,
  mass: 0.5,
};

// Card hover — lift and brighten
export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Number counter spring
export const counterSpring = {
  type: 'spring',
  stiffness: 50,
  damping: 12,
};
