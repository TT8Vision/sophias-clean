import { motion } from 'framer-motion';
import { Home, Building2, Sparkles, Truck, Wind, Sofa } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';

const SERVICES = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    desc: 'Thorough top-to-bottom cleans for apartments, townhouses, and family homes. Weekly, bi-weekly, or monthly.',
    tag: 'Most Popular',
    color: 'var(--color-sage)',          // deep rose
    bg: 'rgba(194,24,91,0.06)',
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    desc: 'Office spaces, retail stores, and co-working spaces. Flexible scheduling to minimise disruption.',
    tag: null,
    color: 'var(--color-gold)',          // rose gold
    bg: 'rgba(212,100,122,0.07)',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    desc: 'Intensive clean of every surface — inside ovens, fridges, cupboards, grout, and more.',
    tag: 'Recommended First',
    color: '#9b59b6',                    // soft plum — intentional contrast accent
    bg: 'rgba(155,89,182,0.07)',
  },
  {
    icon: Truck,
    title: 'Move In / Move Out',
    desc: 'Leave the old place spotless or arrive to a perfectly prepared home. We handle the full handover clean.',
    tag: null,
    color: 'var(--color-sage-dark)',     // burgundy rose
    bg: 'rgba(136,14,79,0.07)',
  },
  {
    icon: Wind,
    title: 'Post-Construction',
    desc: 'Dust, debris, and residue removal after renovations or construction. We restore spaces to show-home condition.',
    tag: null,
    color: '#e07b93',                    // warm dusty pink
    bg: 'rgba(224,123,147,0.07)',
  },
  {
    icon: Sofa,
    title: 'Upholstery & Carpet',
    desc: 'Steam cleaning and stain treatment for sofas, chairs, mattresses, and carpets. Fresh-smelling, deeply clean.',
    tag: null,
    color: 'var(--color-sage)',
    bg: 'rgba(194,24,91,0.06)',
  },
];

// ─────────────────────────────────────────────────────────────
// Services section — staggered card grid with hover spring lift
// ─────────────────────────────────────────────────────────────
export default function Services() {
  const { ref: headRef, isInView: headVisible } = useScrollReveal();
  const { ref: gridRef, isInView: gridVisible } = useScrollReveal();

  return (
    <section id="services" className="section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        ref={headRef}
        className="mb-16 max-w-2xl"
        variants={staggerContainer}
        initial="hidden"
        animate={headVisible ? 'visible' : 'hidden'}
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
          style={{
            color: 'var(--color-sage)',
            background: 'rgba(194,24,91,0.08)',
          }}
        >
          What We Offer
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display font-bold leading-tight text-balance mb-4"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-charcoal)',
          }}
        >
          Every clean, tailored{' '}
          <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>perfectly</em>{' '}
          to your space.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-lg leading-relaxed"
          style={{ color: 'rgba(26,8,18,0.6)' }}
        >
          From quick refreshes to intensive deep cleans, we cover every corner
          with professional-grade equipment and eco-conscious products.
        </motion.p>
      </motion.div>

      {/* Card grid */}
      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={gridVisible ? 'visible' : 'hidden'}
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </motion.div>
    </section>
  );
}

function ServiceCard({ service }) {
  const { icon: Icon, title, desc, tag, color, bg } = service;

  return (
    <motion.div
      variants={staggerItem}
      className="relative group p-7 rounded-3xl cursor-default overflow-hidden"
      style={{
        background: 'white',
        border: '1px solid var(--color-cream-border)',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
        borderColor: color,
        transition: { type: 'spring', stiffness: 280, damping: 20 },
      }}
    >
      {/* Background blob on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: bg }}
      />

      {/* Tag pill */}
      {tag && (
        <span
          className="absolute top-5 right-5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
          style={{ background: bg, color }}
        >
          {tag}
        </span>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative z-10"
        style={{ background: bg }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      {/* Content */}
      <h3
        className="font-display font-semibold text-xl mb-3 relative z-10"
        style={{ color: 'var(--color-charcoal)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed relative z-10"
        style={{ color: 'rgba(26,8,18,0.6)' }}
      >
        {desc}
      </p>

      {/* Arrow */}
      <motion.div
        className="mt-6 flex items-center gap-1.5 text-sm font-semibold relative z-10"
        style={{ color }}
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        Learn more
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M1 7h12M8 3l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
