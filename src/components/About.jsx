import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Leaf, Shield, Clock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, slideLeft, slideRight, fadeUp } from '../animations/variants';

const PILLARS = [
  { icon: Leaf,         label: 'Eco-Friendly',       desc: 'Only biodegradable, non-toxic products safe for children and pets.' },
  { icon: Shield,       label: 'Fully Insured',       desc: 'Comprehensive liability cover on every job. Zero risk to you.' },
  { icon: CheckCircle2, label: '100% Happiness',      desc: 'Not satisfied? We\'ll re-clean for free — no questions asked.' },
  { icon: Clock,        label: 'Punctual & Reliable', desc: 'We arrive on time, every time. SMS reminders before each visit.' },
];

const VALUES = [
  { number: 'Cape Town', label: 'Where we serve'    },
  { number: 'Owner-led', label: 'How we operate'    },
  { number: 'Eco-First', label: 'Products we use'   },
  { number: 'Vetted',    label: 'Every team member' },
];

// ─────────────────────────────────────────────────────────────
// About section — split layout with parallax image panel
// ─────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Subtle parallax on the image panel
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const { ref: leftRef, isInView: leftVisible }   = useScrollReveal();
  const { ref: rightRef, isInView: rightVisible } = useScrollReveal();
  const { ref: statsRef, isInView: statsVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left: visual panel ── */}
        <motion.div
          ref={leftRef}
          variants={slideLeft}
          initial="hidden"
          animate={leftVisible ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Main image block */}
          <div
            className="relative rounded-3xl overflow-hidden aspect-[4/5]"
            style={{ maxHeight: 560 }}
          >
            <motion.img
              src="/gallery/about/sophia-portrait.jpg"
              alt="Sophia, founder of Sophia's Clean"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                y: imgY,
                objectPosition: 'center 25%',
                filter: 'contrast(1.04) saturate(1.06)',
              }}
              loading="lazy"
            />

            {/* Subtle bottom darken for badge legibility */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(26,8,18,0.35) 0%, transparent 100%)',
              }}
            />

            {/* Sparkle overlay */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
                style={{
                  top:  `${20 + i * 13}%`,
                  left: `${15 + (i % 3) * 30}%`,
                  filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Floating tagline card */}
          <motion.div
            className="absolute -right-6 bottom-10 rounded-2xl px-6 py-5 shadow-xl"
            style={{
              background: 'white',
              border: '1px solid var(--color-cream-border)',
              minWidth: 200,
            }}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={leftVisible ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 16 }}
          >
            <div className="font-display italic text-xl" style={{ color: 'var(--color-sage)' }}>
              Save time,
            </div>
            <div className="font-display italic text-xl -mt-0.5" style={{ color: 'var(--color-sage)' }}>
              enjoy life!
            </div>
            <div className="text-[11px] mt-2 font-medium tracking-wide" style={{ color: 'rgba(26,8,18,0.55)' }}>
              — Sophia's promise
            </div>
          </motion.div>

          {/* Founder badge */}
          <motion.div
            className="absolute -left-4 top-8 rounded-2xl px-5 py-4 shadow-lg"
            style={{
              background: 'var(--color-charcoal)',
              minWidth: 160,
            }}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={leftVisible ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ delay: 0.7, type: 'spring', stiffness: 100, damping: 16 }}
          >
            <div className="text-sm font-semibold text-white">Founder & Owner</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Cape Town
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: content ── */}
        <motion.div
          ref={rightRef}
          variants={staggerContainer}
          initial="hidden"
          animate={rightVisible ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
          >
            Our Story
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold leading-tight mb-6 text-balance"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: 'var(--color-charcoal)' }}
          >
            Cleaning is{' '}
            <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>care</em>{' '}
            — and we take it personally.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-4"
            style={{ color: 'rgba(26,8,18,0.65)' }}
          >
            Sophia's Clean started with a single online promo and a simple belief: a clean home is a calm mind. What began with managing Airbnb properties grew into a true passion for creating spaces people feel comfortable and happy in.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-10"
            style={{ color: 'rgba(26,8,18,0.65)' }}
          >
            Today, we serve homes and businesses across Cape Town with a hand-picked team of trained professionals who share Sophia's standards — and treat every space like their own.
          </motion.p>

          {/* Pillars */}
          <motion.div className="grid sm:grid-cols-2 gap-5" variants={staggerContainer}>
            {PILLARS.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="flex gap-3 p-4 rounded-2xl"
                style={{ background: 'rgba(194,24,91,0.05)', border: '1px solid rgba(194,24,91,0.10)' }}
                whileHover={{
                  background: 'rgba(194,24,91,0.08)',
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(194,24,91,0.12)' }}
                >
                  <Icon size={16} style={{ color: 'var(--color-sage)' }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: 'var(--color-charcoal)' }}>
                    {label}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(26,8,18,0.55)' }}>
                    {desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Values strip */}
      <motion.div
        ref={statsRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16"
        style={{ borderTop: '1px solid var(--color-cream-border)' }}
        variants={staggerContainer}
        initial="hidden"
        animate={statsVisible ? 'visible' : 'hidden'}
      >
        {VALUES.map(({ number, label }) => (
          <motion.div key={label} variants={staggerItem} className="text-center">
            <div
              className="font-display font-semibold mb-1"
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', color: 'var(--color-sage)' }}
            >
              {number}
            </div>
            <div className="text-sm font-medium" style={{ color: 'rgba(26,8,18,0.55)' }}>
              {label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
