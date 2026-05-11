import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, CheckCircle2, Quote } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import About from '../components/About';
import AIAssistantCTA from '../components/AIAssistantCTA';
import { fadeUp, staggerContainer, staggerItem } from '../animations/variants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { openQuoteForm } from '../lib/quoteForm';

// ─── Services (from sophiasclean.co.za) ────────────────────────
const SERVICES = [
  { icon: '🏠', label: 'Regular House Cleaning', desc: 'A spotless home, every time.'             },
  { icon: '✨', label: 'Deep Cleaning',           desc: 'Every corner sparkles and shines.'         },
  { icon: '📦', label: 'Move In / Move Out',      desc: 'Start fresh — feels brand new.'            },
  { icon: '🏢', label: 'Commercial Cleaning',     desc: 'A clean office for a productive day.'      },
  { icon: '🛋️', label: 'Carpet & Upholstery',     desc: 'Refresh carpets, revive your space.'       },
  { icon: '🪟', label: 'Window Cleaning',         desc: 'Clear views, inside and out.'              },
  { icon: '🍳', label: 'Restaurant Kitchens',     desc: 'Spotless service, healthier kitchens.'     },
  { icon: '🌿', label: 'Eco-Friendly Cleaning',   desc: 'Plant-based products, healthier planet.'   },
  { icon: '🧹', label: 'Post-Construction',       desc: 'From dust to dazzling.'                    },
];

// ─── Real testimonial from sophiasclean.co.za ──────────────────
const TESTIMONIAL = {
  text: "Lovely team! So friendly. Our place was left quite grimy after maintenance (due to some damage during a storm) and Sophia's Cleaning Co left our place looking brand new.",
  author: 'Tiffany Ann',
  location: 'Cape Town client',
  rating: 5,
};

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { ref: servRef, isInView: servVisible } = useScrollReveal();
  const { ref: testRef, isInView: testVisible } = useScrollReveal();

  return (
    <>
      {/* ════════════════════════════════════════
          HERO — fully responsive split / stack
            • Mobile (<lg): photo card on top, content below
            • Desktop (lg+): side-by-side, photo right
      ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative lg:min-h-screen flex flex-col lg:flex-row overflow-hidden"
        style={{ background: 'white' }}
      >
        {/* ── MOBILE / TABLET — Sophia photo card on top ── */}
        <motion.div
          className="lg:hidden relative w-full overflow-hidden flex-shrink-0"
          style={{ height: 'min(58vh, 420px)' }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/gallery/sophia-hero.jpg"
            alt="Sophia, founder of Sophia's Clean"
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 22%',
              filter: 'contrast(1.05) saturate(1.08)',
            }}
          />
          {/* Soft fade into white at the bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
            }}
          />

          {/* Pill badge floating on photo */}
          <motion.div
            className="absolute top-24 left-4 inline-flex items-center gap-2 px-3 py-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          >
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={9} fill="var(--color-sage)" color="var(--color-sage)" />
              ))}
            </span>
            <span className="text-[10px] font-bold" style={{ color: 'var(--color-charcoal)' }}>
              4.9 · 500+ clients
            </span>
          </motion.div>

          {/* Sophia's name on photo */}
          <motion.div
            className="absolute bottom-20 left-5 text-charcoal-900"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 80 }}
            style={{ color: 'var(--color-charcoal)' }}
          >
            <p className="font-display font-bold text-xl leading-tight" style={{ textShadow: '0 2px 12px rgba(255,255,255,0.7)' }}>Sophia</p>
            <p className="text-xs font-medium" style={{ color: 'rgba(26,8,18,0.7)', textShadow: '0 2px 12px rgba(255,255,255,0.7)' }}>Founder, Sophia's Clean</p>
          </motion.div>
        </motion.div>

        {/* Left — content (desktop) / below photo (mobile) */}
        <motion.div
          className="relative z-10 flex flex-col justify-center px-5 sm:px-8 md:px-14 lg:px-20 w-full lg:w-1/2 pt-6 lg:pt-28 pb-12 lg:pb-16"
          style={{ y: contentY, opacity }}
        >
          {/* Rating badge — desktop only (mobile shows it on photo) */}
          <motion.div
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 self-start"
            style={{ background: 'rgba(194,24,91,0.07)', border: '1px solid rgba(194,24,91,0.18)' }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 18 }}
          >
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="var(--color-sage)" color="var(--color-sage)" />
              ))}
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-sage)' }}>
              Trusted Cleaning Experts in Cape Town
            </span>
          </motion.div>

          {/* Mobile sub-badge */}
          <motion.span
            className="lg:hidden inline-block self-start text-[10px] font-bold tracking-[0.18em] uppercase mb-3 px-3 py-1.5 rounded-full"
            style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            Trusted in Cape Town
          </motion.span>

          {/* Headline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h1
              className="font-display font-bold leading-[1.02] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', color: 'var(--color-charcoal)' }}
            >
              <motion.span className="block" variants={fadeUp}>Save time,</motion.span>
              <motion.em
                className="block"
                variants={fadeUp}
                style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}
              >
                enjoy life.
              </motion.em>
            </h1>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md"
            style={{ color: 'rgba(26,8,18,0.6)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, type: 'spring', stiffness: 80, damping: 18 }}
          >
            Secure your booking with the most trusted cleaning experts in Cape Town.
            Plant-based products, professional team, and a clean you'll feel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 80, damping: 18 }}
          >
            <AIAssistantCTA />

            <MagneticButton
              onClick={() => navigate('/work')}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base w-full sm:w-auto"
              style={{
                border: '1.5px solid var(--color-cream-border)',
                color: 'var(--color-charcoal)',
                background: 'transparent',
              }}
            >
              See Our Work
            </MagneticButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap gap-x-4 gap-y-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {['Plant-based eco products', 'Insured professional team'].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium"
                style={{ color: 'rgba(26,8,18,0.55)' }}
              >
                <CheckCircle2 size={12} style={{ color: 'var(--color-sage)' }} />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Sophia hero portrait */}
        <motion.div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] overflow-hidden"
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative pink wash behind image */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(248,187,208,0.4) 0%, rgba(194,24,91,0.15) 100%)',
            }}
          />

          {/* Sophia portrait — high quality, full bleed */}
          <img
            src="/gallery/sophia-hero.jpg"
            alt="Sophia, founder of Sophia's Clean"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              imageRendering: 'auto',
              filter: 'contrast(1.05) saturate(1.08)',
            }}
          />

          {/* Soft white bleed into left content */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 12%)',
            }}
          />

          {/* Subtle bottom darken for badge legibility */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(26,8,18,0.55) 0%, transparent 100%)',
            }}
          />

          {/* Sophia name + role badge */}
          <motion.div
            className="absolute bottom-10 left-10 text-white z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: 'spring', stiffness: 80 }}
          >
            <div
              className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase">Meet the founder</span>
            </div>
            <p className="font-display font-bold text-3xl leading-tight">Sophia</p>
            <p className="text-sm text-white/80 font-medium">Founder, Sophia's Clean</p>
          </motion.div>

          {/* Floating rating chip */}
          <motion.div
            className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2.5 rounded-2xl z-10"
            style={{
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 120, damping: 16 }}
          >
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="var(--color-sage)" color="var(--color-sage)" />
              ))}
            </span>
            <span className="text-xs font-bold" style={{ color: 'var(--color-charcoal)' }}>4.9 · 500+ clients</span>
          </motion.div>
        </motion.div>

        {/* Mobile hero photo is now the dedicated card above content (lg:hidden block) */}
      </section>

      {/* ════════════════════════════════════════
          SERVICES GRID
      ════════════════════════════════════════ */}
      <section
        className="px-5 sm:px-6 md:px-14 lg:px-20 py-20 md:py-28"
        style={{ background: 'var(--color-cream-warm)' }}
      >
        <motion.div
          ref={servRef}
          variants={staggerContainer}
          initial="hidden"
          animate={servVisible ? 'visible' : 'hidden'}
        >
          <motion.div className="text-center mb-12" variants={fadeUp}>
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
              style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
            >
              Our Services
            </span>
            <h2
              className="font-display font-bold mb-3"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--color-charcoal)' }}
            >
              Transform your space with our{' '}
              <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>cleaning magic.</em>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(26,8,18,0.55)' }}>
              From regular housekeeping to deep cleans, restaurants and post-construction — we cover it all.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {SERVICES.map((s) => (
              <motion.button
                key={s.label}
                variants={staggerItem}
                onClick={() => openQuoteForm()}
                className="text-left p-5 rounded-2xl group"
                style={{
                  background: 'white',
                  border: '1px solid rgba(194,24,91,0.1)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 12px 32px rgba(194,24,91,0.12)',
                  borderColor: 'rgba(194,24,91,0.3)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
              >
                <span className="text-2xl block mb-3">{s.icon}</span>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-charcoal)' }}>
                  {s.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(26,8,18,0.5)' }}>
                  {s.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--color-sage)' }}
                >
                  Book now <ArrowRight size={10} />
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT — Meet Sophia + trust pillars
      ════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: 'white' }}>
        <About />
      </section>

      {/* ════════════════════════════════════════
          WORK TEASER — 3 best photos
      ════════════════════════════════════════ */}
      <section className="px-5 sm:px-6 md:px-14 lg:px-20 py-20 md:py-28" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1.5 rounded-full"
                style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
              >
                Real Results
              </span>
              <h2
                className="font-display font-bold"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--color-charcoal)' }}
              >
                The work speaks{' '}
                <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>for itself.</em>
              </h2>
            </div>
            <button
              onClick={() => navigate('/work')}
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--color-sage)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View all work <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4" style={{ gridAutoRows: '280px' }}>
            {[
              { src: '/gallery/brand-3.jpg', label: 'De Grendel Winery', tag: 'Commercial' },
              { src: '/gallery/ba-after-2.jpg', label: 'Commercial Kitchen', tag: 'Deep Clean' },
              { src: '/gallery/g7.jpg', label: 'Workspace Refresh', tag: 'Commercial' },
            ].map((img) => (
              <motion.div
                key={img.src}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
                onClick={() => navigate('/work')}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(26,8,18,0.7) 0%, transparent 50%)' }}
                />
                <div
                  className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(194,24,91,0.88)', color: 'white' }}
                >
                  {img.tag}
                </div>
                <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">{img.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIAL
      ════════════════════════════════════════ */}
      <section
        className="px-5 sm:px-6 md:px-14 lg:px-20 py-20 md:py-28"
        style={{ background: 'var(--color-charcoal)' }}
        ref={testRef}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={testVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <Quote size={40} style={{ color: 'var(--color-sage)', margin: '0 auto 1.5rem' }} />
          <p
            className="font-display italic leading-relaxed mb-8"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: 'rgba(255,255,255,0.9)' }}
          >
            "{TESTIMONIAL.text}"
          </p>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'var(--color-sage)' }}
            >
              {TESTIMONIAL.author[0]}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white text-sm">{TESTIMONIAL.author}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{TESTIMONIAL.location}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA BANNER
      ════════════════════════════════════════ */}
      <section className="px-5 sm:px-6 md:px-14 lg:px-20 py-20 md:py-28" style={{ background: 'white' }}>
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
            boxShadow: '0 24px 80px rgba(194,24,91,0.3)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          {/* Decorative blob */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              transform: 'translate(30%, -30%)',
              filter: 'blur(40px)',
            }}
          />

          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-white/60"
          >
            Ready to get started?
          </p>
          <h2
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Book your clean today.
            <br />
            <em className="font-normal" style={{ opacity: 0.85 }}>Free quote, no commitment.</em>
          </h2>
          <MagneticButton
            onClick={() => openQuoteForm()}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-base"
            style={{
              background: 'white',
              color: 'var(--color-sage)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            Book a Clean
            <ArrowRight size={16} />
          </MagneticButton>
        </motion.div>
      </section>
    </>
  );
}
