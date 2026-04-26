import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { useCursorTrack } from '../hooks/useCursorTrack';
import MagneticButton from './MagneticButton';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';

// Floating sparkle particles
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 4,
  left: `${Math.random() * 90 + 5}%`,
  delay: Math.random() * 10,
  duration: Math.random() * 12 + 10,
  color: i % 2 === 0 ? 'var(--color-sage-light)' : 'var(--color-cream-border)',
}));

// ─────────────────────────────────────────────────────────────
// Hero
// Full-viewport hero with:
//   • Cursor-tracking parallax layers
//   • Staggered word-by-word headline entrance
//   • Animated trust badge + CTA buttons
//   • Scroll-triggered fade-out
//   • Floating particles
// ─────────────────────────────────────────────────────────────
export default function Hero() {
  const { containerRef, onMouseMove, layer1X, layer1Y, layer2X, layer2Y, layer3X, layer3Y } =
    useCursorTrack();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  // Parallax scroll on hero content
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
      onMouseMove={onMouseMove}
    >
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

      {/* ── Background grid dots ── */}
      <div className="absolute inset-0 grid-dots opacity-60" />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '-10%',
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* ── Parallax blobs (depth layers) ── */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-72 h-72 md:w-96 md:h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(194,24,91,0.18) 0%, rgba(194,24,91,0) 70%)',
          x: layer3X,
          y: layer3Y,
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-60 h-60 md:w-80 md:h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(212,100,122,0.15) 0%, rgba(212,100,122,0) 70%)',
          x: layer2X,
          y: layer2Y,
          filter: 'blur(50px)',
        }}
      />

      {/* ── Hero image floating card (parallax layer 1) ── */}
      <motion.div
        className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2
                   hidden lg:block w-80 xl:w-96 rounded-3xl overflow-hidden shadow-2xl"
        style={{ x: layer1X, y: layer1Y }}
        initial={{ opacity: 0, x: 80, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 2 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.8 }}
      >
        {/* Illustration card using CSS art */}
        <div
          className="relative h-[420px] xl:h-[480px] flex flex-col items-center justify-end pb-8"
          style={{
            background: 'linear-gradient(160deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
          }}
        >
          {/* Big clean icon illustration */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2">
            <motion.div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                {/* Cleaning spray illustration */}
                <rect x="20" y="28" width="28" height="22" rx="4" fill="white" fillOpacity="0.9"/>
                <rect x="20" y="22" width="10" height="8" rx="2" fill="white" fillOpacity="0.7"/>
                <circle cx="44" cy="20" r="5" fill="white" fillOpacity="0.5"/>
                <path d="M30 22 L40 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="36" r="2.5" fill="white" fillOpacity="0.6"/>
                <circle cx="8"  cy="26" r="1.5" fill="white" fillOpacity="0.4"/>
                <circle cx="14" cy="20" r="2"   fill="white" fillOpacity="0.5"/>
              </svg>
            </motion.div>
          </div>

          {/* Stats chips on the card */}
          <div className="flex gap-3 mb-4">
            {[['500+', 'Happy Clients'], ['5★', 'Average Rating']].map(([num, label]) => (
              <div
                key={num}
                className="rounded-2xl px-4 py-3 text-center"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
              >
                <div className="text-xl font-bold text-white">{num}</div>
                <div className="text-xs text-white/70 font-medium">{label}</div>
              </div>
            ))}
          </div>

          <p className="text-white/60 text-xs font-medium tracking-widest uppercase">
            Trusted Across South Africa
          </p>
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 lg:pr-[28rem] xl:pr-[32rem] text-left"
        style={{ y: contentY, opacity }}
      >
        {/* Trust badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: 'rgba(194,24,91,0.08)',
            border: '1px solid rgba(194,24,91,0.22)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 18 }}
        >
          <span className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="var(--color-gold)" color="var(--color-gold)" />
            ))}
          </span>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-sage)' }}>
            Rated #1 Cleaning Service in Gauteng
          </span>
        </motion.div>

        {/* Headline — word by word stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h1
            className="font-display font-bold leading-[1.05] tracking-tight text-balance"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              color: 'var(--color-charcoal)',
            }}
          >
            {['Your Home,', 'Spotless &', 'Serene.'].map((line, li) => (
              <motion.span
                key={li}
                className="block"
                variants={staggerItem}
                style={{
                  color: li === 2 ? 'var(--color-sage)' : 'var(--color-charcoal)',
                  fontStyle: li === 2 ? 'italic' : 'normal',
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
          style={{ color: 'rgba(26,8,18,0.65)' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          Premium residential & commercial cleaning tailored to your life.
          Eco-friendly products, trained professionals, and a happiness guarantee.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 80, damping: 18 }}
        >
          <MagneticButton
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl text-white font-semibold text-base gap-2"
            style={{ background: 'var(--color-sage)' }}
          >
            Book Your Clean
            <ArrowRight size={16} className="ml-2" />
          </MagneticButton>

          <MagneticButton
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl font-semibold text-base"
            style={{
              background: 'transparent',
              border: '1.5px solid var(--color-cream-border)',
              color: 'var(--color-charcoal)',
            }}
          >
            View Services
          </MagneticButton>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2.5">
            {['#880e4f', '#c2185b', '#d4647a', '#f8bbd0'].map((c, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ background: c }}
              >
                {['S', 'A', 'L', 'K'][i]}
              </div>
            ))}
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: 'var(--color-charcoal)' }}>
              500+ happy clients
            </div>
            <div className="text-xs" style={{ color: 'rgba(26,8,18,0.5)' }}>
              across Johannesburg & Pretoria
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ background: 'none', border: 'none', color: 'rgba(26,8,18,0.4)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
