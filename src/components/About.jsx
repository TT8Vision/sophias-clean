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

const STATS = [
  { number: '500+', label: 'Happy Clients' },
  { number: '8+',   label: 'Years Experience' },
  { number: '98%',  label: 'Satisfaction Rate' },
  { number: '0',    label: 'Toxic Chemicals' },
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
      className="section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
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
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
                y: imgY,
              }}
            >
              {/* CSS illustration of a clean, bright room */}
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none" opacity="0.85">
                {/* Window */}
                <rect x="40" y="30" width="140" height="100" rx="8" fill="white" fillOpacity="0.15"/>
                <line x1="110" y1="30" x2="110" y2="130" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
                <line x1="40"  y1="80" x2="180" y2="80"  stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
                {/* Sun */}
                <circle cx="155" cy="55" r="14" fill="white" fillOpacity="0.5"/>
                {/* Floor */}
                <rect x="20" y="150" width="180" height="6" rx="3" fill="white" fillOpacity="0.25"/>
                {/* Cleaning bucket */}
                <rect x="80" y="155" width="60" height="40" rx="4" fill="white" fillOpacity="0.3"/>
                <path d="M90 155 C90 140 130 140 130 155" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" strokeOpacity="0.4"/>
                {/* Bubbles */}
                <circle cx="60"  cy="140" r="6"   fill="white" fillOpacity="0.4"/>
                <circle cx="160" cy="145" r="4.5" fill="white" fillOpacity="0.3"/>
                <circle cx="150" cy="130" r="3"   fill="white" fillOpacity="0.25"/>
              </svg>

              {/* Sparkle overlay */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{
                    top:  `${20 + i * 13}%`,
                    left: `${15 + (i % 3) * 30}%`,
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
            </motion.div>
          </div>

          {/* Floating stat card */}
          <motion.div
            className="absolute -right-6 bottom-10 rounded-2xl px-6 py-5 shadow-xl"
            style={{
              background: 'white',
              border: '1px solid var(--color-cream-border)',
              minWidth: 180,
            }}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={leftVisible ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 16 }}
          >
            <div className="text-3xl font-display font-bold" style={{ color: 'var(--color-sage)' }}>
              98%
            </div>
            <div className="text-sm font-medium mt-0.5" style={{ color: 'rgba(26,8,18,0.7)' }}>
              Customer Satisfaction
            </div>
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12">
                  <polygon points="6,1 7.8,4.5 12,5.2 9,8 9.7,12.2 6,10.2 2.3,12.2 3,8 0,5.2 4.2,4.5"
                    fill="var(--color-gold)" />
                </svg>
              ))}
            </div>
          </motion.div>

          {/* Sophia badge */}
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
            <div className="text-sm font-semibold text-white">Founded by Sophia</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Cleaning since 2016
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
            Sophia started this business with a simple belief: a clean home is a calm mind.
            After years of seeing families overwhelmed by mess and time pressure, she built
            a team that treats every client's space like their own.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-10"
            style={{ color: 'rgba(26,8,18,0.65)' }}
          >
            Today, we operate across Johannesburg and Pretoria with a hand-picked team
            of trained, background-checked professionals who share her standards.
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

      {/* Stats strip */}
      <motion.div
        ref={statsRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16"
        style={{ borderTop: '1px solid var(--color-cream-border)' }}
        variants={staggerContainer}
        initial="hidden"
        animate={statsVisible ? 'visible' : 'hidden'}
      >
        {STATS.map(({ number, label }) => (
          <motion.div key={label} variants={staggerItem} className="text-center">
            <div
              className="font-display font-bold mb-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-sage)' }}
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
