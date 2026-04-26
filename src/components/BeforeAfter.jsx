import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';

// ─── Service offerings ───────────────────────────────────────────
const SERVICES = [
  { label: 'Residential',        icon: '🏠', desc: 'Homes & apartments'         },
  { label: 'Commercial',         icon: '🏢', desc: 'Offices & workspaces'        },
  { label: 'Deep Clean',         icon: '✨', desc: 'Top-to-bottom refresh'       },
  { label: 'Move In / Out',      icon: '📦', desc: 'Deposit-back guaranteed'     },
  { label: 'Short-Term Letting', icon: '🛎️', desc: 'Airbnb & holiday properties' },
  { label: 'Eco Cleaning',       icon: '🌿', desc: 'Non-toxic, pet-safe products'},
];

// ─── Portfolio jobs ─────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    image: '/gallery/ba-before-1.jpg',
    label: 'Restaurant Kitchen',
    location: 'Cape Town CBD',
    tag: 'Commercial',
    duration: '4 hrs',
    result: 'Full kitchen sanitation to hospitality standard',
    size: 'large',
  },
  {
    id: 2,
    image: '/gallery/g5.jpg',
    label: 'Eco Product Clean',
    location: 'Stellenbosch',
    tag: 'Eco Clean',
    duration: '2.5 hrs',
    result: 'Non-toxic, pet-safe, biodegradable throughout',
    size: 'small',
  },
  {
    id: 3,
    image: '/gallery/g7.jpg',
    label: 'Office Workspace',
    location: 'Century City, CPT',
    tag: 'Commercial',
    duration: '3 hrs',
    result: 'Full-office deep clean, all surfaces sanitised',
    size: 'small',
  },
  {
    id: 4,
    image: '/gallery/ba-after-2.jpg',
    label: 'Commercial Kitchen',
    location: 'Claremont, CPT',
    tag: 'Deep Clean',
    duration: '3.5 hrs',
    result: 'Grease-free, health-inspection ready',
    size: 'small',
  },
  {
    id: 5,
    image: '/gallery/g8.jpg',
    label: 'Short-Term Let',
    location: 'Sea Point, CPT',
    tag: 'Short-Term Letting',
    duration: '2 hrs',
    result: 'Airbnb turnover — guest-ready in 2 hours',
    size: 'small',
  },
  {
    id: 6,
    image: '/gallery/brand-3.jpg',
    label: 'Winery Restaurant',
    location: 'De Grendel Wines, CPT',
    tag: 'Commercial',
    duration: '6 hrs',
    result: 'Monthly deep-clean contract, ongoing relationship',
    size: 'large',
  },
];

export default function Portfolio() {
  const { ref: headRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridVisible } = useScrollReveal();

  return (
    <section
      className="section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
      style={{ background: 'white' }}
    >
      {/* ── Header ── */}
      <motion.div
        ref={headRef}
        className="text-center mb-14 max-w-2xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
          style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
        >
          Our Work
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display font-bold leading-tight mb-4 text-balance"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-charcoal)' }}
        >
          Every job.{' '}
          <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>Done right.</em>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-base leading-relaxed"
          style={{ color: 'rgba(26,8,18,0.55)' }}
        >
          From Cape Town homes to commercial kitchens — real results across every service we offer.
        </motion.p>
      </motion.div>

      {/* ── Services We Offer ── */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 80, damping: 18 }}
      >
        <p className="text-xs font-bold tracking-[0.18em] uppercase mb-5 text-center" style={{ color: 'rgba(26,8,18,0.35)' }}>
          Services We Cover
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICES.map((s) => (
            <motion.div
              key={s.label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{
                background: 'rgba(194,24,91,0.05)',
                border: '1px solid rgba(194,24,91,0.12)',
              }}
              whileHover={{
                background: 'rgba(194,24,91,0.10)',
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <span className="text-base leading-none">{s.icon}</span>
              <div>
                <p className="text-xs font-bold" style={{ color: 'var(--color-charcoal)' }}>{s.label}</p>
                <p className="text-[10px]" style={{ color: 'rgba(26,8,18,0.45)' }}>{s.desc}</p>
              </div>
              <CheckCircle2 size={12} style={{ color: 'var(--color-sage)', opacity: 0.7 }} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Portfolio Bento Grid ── */}
      <motion.div
        ref={gridRef}
        variants={staggerContainer}
        initial="hidden"
        animate={gridVisible ? 'visible' : 'hidden'}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        style={{ gridAutoRows: '220px' }}
      >
        {JOBS.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} />
        ))}
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={gridVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, type: 'spring', stiffness: 80, damping: 18 }}
      >
        {[
          { value: '500+', label: 'Jobs Completed' },
          { value: '6',    label: 'Service Types' },
          { value: '98%',  label: 'Client Retention' },
          { value: '4.9★', label: 'Average Rating' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center py-6 px-4 rounded-2xl"
            style={{ background: 'rgba(194,24,91,0.04)', border: '1px solid rgba(194,24,91,0.08)' }}
          >
            <p className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--color-sage)' }}>
              {stat.value}
            </p>
            <p className="text-xs font-medium" style={{ color: 'rgba(26,8,18,0.5)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Job Card ───────────────────────────────────────────────────
function JobCard({ job }) {
  const [hovered, setHovered] = useState(false);

  const isLarge = job.size === 'large';
  const colSpan = isLarge ? 'md:col-span-2' : '';
  const rowSpan = isLarge ? 'row-span-2' : '';

  return (
    <motion.div
      variants={staggerItem}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${colSpan} ${rowSpan}`}
      style={{
        minHeight: 220,
        border: '1px solid rgba(194,24,91,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <motion.img
        src={job.image}
        alt={job.label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Permanent dark gradient at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(26,8,18,0.82) 0%, rgba(26,8,18,0.2) 45%, transparent 100%)',
        }}
      />

      {/* Tag pill */}
      <div
        className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full z-10"
        style={{ background: 'rgba(194,24,91,0.88)', color: 'white', backdropFilter: 'blur(6px)' }}
      >
        {job.tag}
      </div>

      {/* Always-visible job info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="font-semibold text-white text-sm leading-tight mb-1">{job.label}</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-white/70 text-[11px]">
            <MapPin size={9} />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-white/70 text-[11px]">
            <Clock size={9} />
            {job.duration}
          </span>
        </div>

        {/* Result — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              className="text-white/85 text-[11px] leading-relaxed mt-2 border-t border-white/15 pt-2"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22 }}
            >
              ✓ {job.result}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
