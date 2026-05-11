import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { staggerContainer, staggerItem } from '../animations/variants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { openQuoteForm } from '../lib/quoteForm';

// Only real job photos — no text graphics, no video thumbnails
const JOBS = [
  {
    id: 1,
    src: '/gallery/brand-3.jpg',
    label: 'De Grendel Winery',
    location: 'Cape Town',
    tag: 'Commercial',
    duration: '6 hrs',
    desc: 'Monthly deep-clean contract — full restaurant and kitchen sanitation.',
    size: 'large',
  },
  {
    id: 2,
    src: '/gallery/ba-before-1.jpg',
    label: 'Commercial Kitchen',
    location: 'Cape Town CBD',
    tag: 'Deep Clean',
    duration: '4 hrs',
    desc: 'Full kitchen strip-down, degreasing, and health-inspection ready finish.',
    size: 'small',
  },
  {
    id: 3,
    src: '/gallery/ba-after-2.jpg',
    label: 'Kitchen — After',
    location: 'Claremont, CPT',
    tag: 'Deep Clean',
    duration: '3.5 hrs',
    desc: 'Grease-free surfaces, sanitised equipment, spotless result.',
    size: 'small',
  },
  {
    id: 4,
    src: '/gallery/g7.jpg',
    label: 'Workspace Clean',
    location: 'Century City, CPT',
    tag: 'Commercial',
    duration: '3 hrs',
    desc: 'Full-office refresh — all surfaces, floors, and bathrooms.',
    size: 'small',
  },
  {
    id: 5,
    src: '/gallery/g8.jpg',
    label: 'Short-Term Let',
    location: 'Sea Point, CPT',
    tag: 'Airbnb',
    duration: '2 hrs',
    desc: 'Guest-ready turnover — linen, bathrooms, kitchen, all rooms.',
    size: 'small',
  },
  {
    id: 6,
    src: '/gallery/g5.jpg',
    label: 'Eco Home Clean',
    location: 'Stellenbosch',
    tag: 'Eco Clean',
    duration: '2.5 hrs',
    desc: 'Non-toxic, biodegradable products — safe for kids and pets.',
    size: 'large',
  },
  {
    id: 7,
    src: '/gallery/ba-after-1.jpg',
    label: 'Restaurant After',
    location: 'Cape Town CBD',
    tag: 'Commercial',
    duration: '4 hrs',
    desc: 'Post-service clean, ready for next health inspection.',
    size: 'small',
  },
  {
    id: 8,
    src: '/gallery/ba-before-2.jpg',
    label: 'Kitchen — During',
    location: 'Claremont, CPT',
    tag: 'Deep Clean',
    duration: '3 hrs',
    desc: 'Our team works systematically through every surface.',
    size: 'small',
  },
];

export default function Work() {
  const { ref: gridRef, isInView: gridVisible } = useScrollReveal();

  return (
    <div className="pt-24" style={{ background: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <motion.div
        className="text-center px-6 mb-16 pt-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      >
        <span
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
          style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
        >
          Our Portfolio
        </span>
        <h1
          className="font-display font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: 'var(--color-charcoal)' }}
        >
          Real jobs.{' '}
          <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>Real results.</em>
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(26,8,18,0.55)' }}>
          Every photo is an actual job by Sophia's team — no staging, no stock images.
        </p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        ref={gridRef}
        className="px-5 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        style={{ gridAutoRows: '240px' }}
        variants={staggerContainer}
        initial="hidden"
        animate={gridVisible ? 'visible' : 'hidden'}
      >
        {JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </motion.div>

      {/* CTA */}
      <div
        className="px-6 pb-24 text-center"
      >
        <p className="text-sm mb-5" style={{ color: 'rgba(26,8,18,0.5)' }}>
          Like what you see? Let's do the same for your space.
        </p>
        <MagneticButton
          onClick={() => openQuoteForm()}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-white font-semibold"
          style={{
            background: 'linear-gradient(135deg, var(--color-sage), var(--color-sage-dark))',
            boxShadow: '0 8px 32px rgba(194,24,91,0.3)',
          }}
        >
          Book a Clean <ArrowRight size={15} />
        </MagneticButton>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const [hovered, setHovered] = useState(false);
  const colSpan = job.size === 'large' ? 'md:col-span-2' : '';
  const rowSpan = job.size === 'large' ? 'row-span-2' : '';

  return (
    <motion.div
      variants={staggerItem}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${colSpan} ${rowSpan}`}
      style={{ minHeight: 240, border: '1px solid rgba(194,24,91,0.08)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
    >
      <motion.img
        src={job.src}
        alt={job.label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,8,18,0.8) 0%, rgba(26,8,18,0.1) 50%, transparent 100%)' }}
      />

      <div
        className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(194,24,91,0.88)', color: 'white', backdropFilter: 'blur(6px)' }}
      >
        {job.tag}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-semibold text-white text-sm">{job.label}</p>
        <div className="flex gap-3 mt-1">
          <span className="flex items-center gap-1 text-white/65 text-[11px]">
            <MapPin size={9} /> {job.location}
          </span>
          <span className="flex items-center gap-1 text-white/65 text-[11px]">
            <Clock size={9} /> {job.duration}
          </span>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.p
              className="text-white/80 text-[11px] leading-relaxed border-t border-white/15 pt-2 mt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {job.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
