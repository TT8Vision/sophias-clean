import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// BrandStrip — full-bleed parallax photo strip between sections.
// Three overlapping images with depth parallax on scroll.
// Replace URLs with actual @sophiasclean_ photos.
// ─────────────────────────────────────────────────────────────

// TO REPLACE: drop brand-1.jpg, brand-2.jpg, brand-3.jpg into public/gallery/
const IMAGES = [
  {
    src: '/gallery/brand-1.jpg',
    alt: "Sophia's Clean team at work — professional floor clean",
    parallaxFactor: 0.15,
    rotate: -2,
    zIndex: 3,
  },
  {
    src: '/gallery/brand-2.jpg',
    alt: 'Sparkling clean kitchen result',
    parallaxFactor: 0.08,
    rotate: 1.5,
    zIndex: 2,
  },
  {
    src: '/gallery/brand-3.jpg',
    alt: "Pristine bathroom after Sophia's clean",
    parallaxFactor: 0.05,
    rotate: -1,
    zIndex: 1,
  },
];

export default function BrandStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: 'var(--color-charcoal)' }}
      aria-label="Our work in pictures"
    >
      {/* Pink glow behind images */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(194,24,91,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Decorative text watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-[10vw] md:text-[8vw] whitespace-nowrap tracking-tight opacity-[0.04] text-white"
        >
          Sophia's Clean
        </span>
      </div>

      {/* Stacked image cluster */}
      <div className="relative flex items-center justify-center" style={{ height: 360 }}>
        {IMAGES.map((img, i) => (
          <ParallaxImage key={i} img={img} scrollYProgress={scrollYProgress} index={i} />
        ))}
      </div>

      {/* Caption strip */}
      <motion.div
        className="text-center mt-12 px-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 80, damping: 18 }}
      >
        <p
          className="font-display italic text-xl md:text-2xl text-white/70 mb-2 text-balance"
        >
          "We don't just clean — we restore the feeling of home."
        </p>
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-sage-light)' }}>
          — Sophia, Founder
        </p>
      </motion.div>
    </section>
  );
}

function ParallaxImage({ img, scrollYProgress, index }) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-img.parallaxFactor * 100}px`, `${img.parallaxFactor * 100}px`]
  );

  // Offset cards so they fan out
  const offsets = [
    { left: '50%', translateX: '-50%' },
    { left: '30%', translateX: '-60%' },
    { left: '70%', translateX: '-40%' },
  ];

  const { left, translateX } = offsets[index] || offsets[0];

  return (
    <motion.div
      className="absolute rounded-2xl overflow-hidden shadow-2xl"
      style={{
        y,
        left,
        translateX,
        rotate: img.rotate,
        zIndex: img.zIndex,
        width: index === 0 ? 280 : 220,
        height: index === 0 ? 340 : 280,
        border: '3px solid rgba(255,255,255,0.1)',
      }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 200, damping: 18 },
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Subtle pink tint overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(136,14,79,0.35) 100%)' }}
      />
    </motion.div>
  );
}
