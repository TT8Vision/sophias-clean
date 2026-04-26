import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, fadeUp } from '../animations/variants';

const REVIEWS = [
  {
    name: 'Anika van der Berg',
    location: 'Sandton, Johannesburg',
    rating: 5,
    text: 'Sophia\'s team transformed my home before my parents\' visit. Every single corner was spotless — even the grout in the bathroom. I was genuinely emotional. Best R1,100 I\'ve ever spent.',
    avatar: '#c2185b',     // deep rose
    initials: 'AB',
    service: 'Premium Monthly Plan',
    date: 'March 2025',
  },
  {
    name: 'Thabo Mokoena',
    location: 'Centurion, Pretoria',
    rating: 5,
    text: 'I\'ve tried 4 different cleaning companies over the years. Sophia\'s is in a completely different league. They noticed things other cleaners had ignored for months. Worth every cent.',
    avatar: '#880e4f',     // burgundy rose
    initials: 'TM',
    service: 'Deep Clean',
    date: 'February 2025',
  },
  {
    name: 'Priya Naidoo',
    location: 'Randburg, Johannesburg',
    rating: 5,
    text: 'Move-out clean after 3 years in the flat. I got my full deposit back AND the landlord asked who cleaned it so he could use them too. Absolutely incredible service.',
    avatar: '#d4647a',     // rose gold
    initials: 'PN',
    service: 'Move Out Clean',
    date: 'January 2025',
  },
  {
    name: 'Madeleine Rousseau',
    location: 'Morningside, Sandton',
    rating: 5,
    text: 'My nanny has been with us for years but we needed professional deep cleans quarterly. Sophia\'s team are so professional, discreet and thorough. Our home feels brand new every time.',
    avatar: '#f48fb1',     // blush pink
    initials: 'MR',
    service: 'Elite Quarterly',
    date: 'December 2024',
  },
  {
    name: 'Kevin Dlamini',
    location: 'Menlyn, Pretoria',
    rating: 5,
    text: 'Office space for 20 people. Been using them for 6 months now. The team is reliable, professional, and the office always smells incredible on Monday mornings. Clients notice.',
    avatar: '#560027',     // darkest rose
    initials: 'KD',
    service: 'Commercial Weekly',
    date: 'April 2025',
  },
];

// ─────────────────────────────────────────────────────────────
// Testimonials — draggable horizontal carousel with dot nav
// ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const { ref: headRef, isInView } = useScrollReveal();

  const go = (dir) => {
    setDirection(dir);
    setActive((p) => (p + dir + REVIEWS.length) % REVIEWS.length);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit:  (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96, transition: { duration: 0.2 } }),
  };

  const review = REVIEWS[active];

  return (
    <section
      id="reviews"
      className="section px-6 md:px-10 lg:px-16"
      style={{ background: 'var(--color-cream-warm)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.1)' }}
          >
            Client Stories
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold leading-tight text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-charcoal)' }}
          >
            Real homes.{' '}
            <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>Real results.</em>
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) go(1);
                else if (info.offset.x > 50) go(-1);
              }}
              className="rounded-3xl p-8 md:p-12 select-none"
              style={{
                background: 'white',
                border: '1px solid var(--color-cream-border)',
                boxShadow: '0 8px 48px rgba(194,24,91,0.07)',
                cursor: 'grab',
              }}
              whileDrag={{ cursor: 'grabbing', scale: 0.995 }}
            >
              {/* Quote icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(194,24,91,0.08)' }}
              >
                <Quote size={22} style={{ color: 'var(--color-sage)' }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>

              {/* Review text */}
              <p
                className="font-display text-xl md:text-2xl leading-relaxed mb-8 text-balance"
                style={{ color: 'var(--color-charcoal)' }}
              >
                "{review.text}"
              </p>

              {/* Author row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: review.avatar }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-charcoal)' }}>
                      {review.name}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(26,8,18,0.5)' }}>
                      {review.location}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(194,24,91,0.08)', color: 'var(--color-sage)' }}
                  >
                    {review.service}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(26,8,18,0.4)' }}>
                    {review.date}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {[
            { dir: -1, icon: ChevronLeft,  className: '-left-5 md:-left-8' },
            { dir:  1, icon: ChevronRight, className: '-right-5 md:-right-8' },
          ].map(({ dir, icon: Icon, className: cls }) => (
            <motion.button
              key={dir}
              onClick={() => go(dir)}
              className={`absolute top-1/2 -translate-y-1/2 ${cls} w-11 h-11 rounded-full flex items-center justify-center`}
              style={{
                background: 'white',
                border: '1px solid var(--color-cream-border)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
              whileHover={{
                background: 'var(--color-sage)',
                color: 'white',
                scale: 1.08,
                transition: { type: 'spring', stiffness: 300, damping: 18 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className="rounded-full"
              animate={{
                width: i === active ? 24 : 8,
                background: i === active ? 'var(--color-sage)' : 'var(--color-sage-light)',
              }}
              style={{ height: 8, border: 'none' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            />
          ))}
        </div>

        {/* Aggregate rating */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm" style={{ color: 'rgba(26,8,18,0.5)' }}>
            Based on 500+ verified reviews across Google and Facebook
          </p>
        </motion.div>
      </div>
    </section>
  );
}
