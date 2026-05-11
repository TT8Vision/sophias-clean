import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Phone, CalendarCheck, Sparkles, ThumbsUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';

const STEPS = [
  {
    icon: Phone,
    number: '01',
    title: 'Get in Touch',
    desc: 'Fill our quote form or give us a call. We\'ll respond within 2 hours and discuss your needs.',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Book a Date',
    desc: 'Choose a time that suits you — mornings, afternoons, weekends. We work around your schedule.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'We Clean',
    desc: 'Our team arrives fully equipped with premium eco-products. Thorough, professional, and careful.',
  },
  {
    icon: ThumbsUp,
    number: '04',
    title: 'You Enjoy',
    desc: 'Walk into a spotless home. If anything misses the mark, we\'ll fix it free — guaranteed.',
  },
];

// ─────────────────────────────────────────────────────────────
// Process section — numbered timeline with connecting line
// ─────────────────────────────────────────────────────────────
export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  // Animate the connecting line as the section scrolls into view
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%']);

  const { ref: headRef, isInView } = useScrollReveal();
  const { ref: stepsRef, isInView: stepsVisible } = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
      style={{ background: 'var(--color-charcoal)', borderRadius: '2rem', margin: '0 1rem' }}
      id="results"
    >
      {/* Header */}
      <motion.div
        ref={headRef}
        className="text-center mb-16 max-w-2xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
          style={{ color: 'var(--color-sage-light)', background: 'rgba(248,187,208,0.15)' }}
        >
          How It Works
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display font-bold text-white leading-tight mb-4 text-balance"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Spotless in{' '}
          <em style={{ color: 'var(--color-sage-light)', fontStyle: 'italic' }}>four easy steps</em>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-base leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          We've streamlined the entire experience so getting a professional clean
          takes less than 5 minutes to arrange.
        </motion.p>
      </motion.div>

      {/* Steps */}
      <div className="relative" ref={stepsRef}>
        {/* Desktop connecting line */}
        <div
          className="absolute top-10 left-0 right-0 h-px hidden lg:block pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.08)', marginInline: '12.5%' }}
        >
          <motion.div
            className="h-full"
            style={{
              width: lineWidth,
              background: 'linear-gradient(90deg, var(--color-sage) 0%, var(--color-gold) 100%)',
            }}
          />
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={stepsVisible ? 'visible' : 'hidden'}
        >
          {STEPS.map(({ icon: Icon, number, title, desc }, i) => (
            <motion.div
              key={number}
              variants={staggerItem}
              className="relative text-center group"
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              {/* Number circle */}
              <div className="relative flex justify-center mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  whileHover={{
                    background: 'var(--color-sage)',
                    borderColor: 'var(--color-sage)',
                    transition: { type: 'spring', stiffness: 200, damping: 18 },
                  }}
                >
                  <Icon size={24} color="white" />
                </motion.div>

                {/* Step number badge */}
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold z-20"
                  style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)' }}
                >
                  {i + 1}
                </div>
              </div>

              <h3
                className="font-display font-semibold text-lg text-white mb-2"
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
