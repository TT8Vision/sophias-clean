import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Heart, MessageCircle, Expand } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';
import MagneticButton from './MagneticButton';

// Instagram icon — not exported in this lucide-react version
const InstagramIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Gallery image data — served from /public/gallery/
// TO REPLACE WITH REAL INSTAGRAM PHOTOS:
//   1. Save photos from @sophiasclean_ (right-click > Save Image)
//   2. Rename to g1.jpg … g9.jpg
//   3. Drop into public/gallery/ — done, no code changes needed
// ─────────────────────────────────────────────────────────────
const GALLERY = [
  {
    id: 1,
    src: '/gallery/g1.jpg',
    alt: 'Professional residential clean — sparkling kitchen',
    caption: '✨ Before vs After — Sandton kitchen transformation. 3 hours, zero shortcuts.',
    likes: 214,
    comments: 18,
    span: 'row-span-2',
    tag: 'Kitchen Deep Clean',
  },
  {
    id: 2,
    src: '/gallery/g2.jpg',
    alt: 'Spotless bathroom after professional cleaning',
    caption: 'Bathroom gleaming. Our clients call this the "hotel feeling" ✨',
    likes: 187,
    comments: 23,
    span: '',
    tag: 'Bathroom Refresh',
  },
  {
    id: 3,
    src: '/gallery/g3.jpg',
    alt: 'Eco-friendly cleaning products we use',
    caption: '🌿 Only the best — all our products are non-toxic, biodegradable & pet-safe.',
    likes: 302,
    comments: 41,
    span: '',
    tag: 'Eco Products',
  },
  {
    id: 4,
    src: '/gallery/g4.jpg',
    alt: 'Team member cleaning a living room',
    caption: 'Our team treats every home like their own 🏠 — because they genuinely care.',
    likes: 268,
    comments: 31,
    span: 'row-span-2',
    tag: 'Our Team',
  },
  {
    id: 5,
    src: '/gallery/g5.jpg',
    alt: 'Pristine clean oven after deep clean',
    caption: 'Yes, we do the oven too 😅 Inside, outside, spotless.',
    likes: 445,
    comments: 62,
    span: '',
    tag: 'Deep Clean',
  },
  {
    id: 6,
    src: '/gallery/g6.jpg',
    alt: 'Clean organised bedroom after service',
    caption: 'A clean bedroom is a peaceful mind. Good morning, Pretoria 🌸',
    likes: 193,
    comments: 14,
    span: '',
    tag: 'Residential',
  },
  {
    id: 7,
    src: '/gallery/g7.jpg',
    alt: 'Cleaning supplies arranged neatly',
    caption: '🧴 Every product carefully chosen. Every surface cared for.',
    likes: 156,
    comments: 9,
    span: '',
    tag: 'Products',
  },
  {
    id: 8,
    src: '/gallery/g8.jpg',
    alt: 'Professional mop and clean floors',
    caption: 'Floors so clean you could eat off them 🫧 Johannesburg, done.',
    likes: 321,
    comments: 28,
    span: '',
    tag: 'Floor Care',
  },
  {
    id: 9,
    src: '/gallery/g9.jpg',
    alt: 'After move-out clean — empty flat gleaming',
    caption: 'Move-out clean ✅ Full deposit returned ✅ Happy client ✅',
    likes: 511,
    comments: 74,
    span: 'row-span-2',
    tag: 'Move Out',
  },
];

// ─────────────────────────────────────────────────────────────
// Gallery — masonry CSS grid, hover overlay, lightbox, parallax
// ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const { ref: headRef, isInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridVisible } = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section relative overflow-hidden"
      style={{ background: 'white' }}
    >
      {/* Decorative background parallax blob */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(248,187,208,0.25) 0%, rgba(248,187,208,0) 70%)',
          y: bgY,
          filter: 'blur(60px)',
          translateX: '30%',
          translateY: '-20%',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(194,24,91,0.08) 0%, rgba(194,24,91,0) 70%)',
          filter: 'blur(80px)',
          translateX: '-20%',
          translateY: '20%',
        }}
      />

      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="text-center mb-14 max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.a
            href="https://www.instagram.com/sophiasclean_/"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-2 rounded-full no-underline"
            style={{
              color: 'var(--color-sage)',
              background: 'rgba(194,24,91,0.08)',
              border: '1px solid rgba(194,24,91,0.18)',
            }}
            whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
          >
            <InstagramIcon size={13} />
            @sophiasclean_
          </motion.a>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold leading-tight mb-4 text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-charcoal)' }}
          >
            See the{' '}
            <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>transformation</em>{' '}
            for yourself.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed"
            style={{ color: 'rgba(26,8,18,0.55)' }}
          >
            Real homes, real results. Every photo is an actual job — no staging, no filters.
            Just Sophia's team doing what they do best.
          </motion.p>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          style={{ gridAutoRows: '200px' }}
          variants={staggerContainer}
          initial="hidden"
          animate={gridVisible ? 'visible' : 'hidden'}
        >
          {GALLERY.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setLightbox(item)}
            />
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-14 flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={gridVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, type: 'spring', stiffness: 80, damping: 18 }}
        >
          <p className="text-sm" style={{ color: 'rgba(26,8,18,0.5)' }}>
            See 200+ more before/afters, client reactions, and team moments
          </p>
          <MagneticButton
            onClick={() => window.open('https://www.instagram.com/sophiasclean_/', '_blank')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm text-white"
            style={{
              background: 'linear-gradient(135deg, #c2185b 0%, #880e4f 100%)',
              boxShadow: '0 8px 32px rgba(194,24,91,0.35)',
            }}
          >
            <InstagramIcon size={17} />
            Follow @sophiasclean_
            <ExternalLink size={13} />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// GalleryCard — hover overlay with caption + social counts
// ─────────────────────────────────────────────────────────────
function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
      style={{ minHeight: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 280, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <motion.img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'block' }}
      />

      {/* Tag pill — always visible */}
      <div
        className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
        style={{
          background: 'rgba(194,24,91,0.85)',
          color: 'white',
          backdropFilter: 'blur(6px)',
        }}
      >
        {item.tag}
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background: 'linear-gradient(to top, rgba(136,14,79,0.85) 0%, rgba(136,14,79,0.3) 50%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Caption */}
            <p className="text-white text-xs leading-relaxed mb-2.5 line-clamp-3 font-medium">
              {item.caption}
            </p>

            {/* Social counts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-white/80 text-xs">
                  <Heart size={11} fill="white" color="white" />
                  {item.likes}
                </span>
                <span className="flex items-center gap-1 text-white/80 text-xs">
                  <MessageCircle size={11} fill="white" color="white" />
                  {item.comments}
                </span>
              </div>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
              >
                <Expand size={12} color="white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Lightbox — full-screen image viewer with spring entrance
// ─────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(26,8,18,0.92)', backdropFilter: 'blur(16px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full object-cover"
          style={{ maxHeight: '70vh' }}
        />

        {/* Caption bar */}
        <div
          className="px-6 py-5"
          style={{ background: 'white' }}
        >
          <div
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
            style={{ background: 'rgba(194,24,91,0.08)', color: 'var(--color-sage)' }}
          >
            {item.tag}
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-charcoal)' }}>
            {item.caption}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'rgba(26,8,18,0.6)' }}>
                <Heart size={14} style={{ color: 'var(--color-sage)' }} />
                {item.likes} likes
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'rgba(26,8,18,0.6)' }}>
                <MessageCircle size={14} style={{ color: 'var(--color-sage)' }} />
                {item.comments} comments
              </span>
            </div>
            <a
              href="https://www.instagram.com/sophiasclean_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold no-underline"
              style={{ color: 'var(--color-sage)' }}
            >
              <InstagramIcon size={13} />
              View on Instagram
            </a>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'rgba(0,0,0,0.4)', border: 'none', backdropFilter: 'blur(8px)' }}
          whileHover={{ scale: 1.1, background: 'rgba(194,24,91,0.8)' }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
