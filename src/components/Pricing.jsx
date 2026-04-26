import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';
import MagneticButton from './MagneticButton';

const PLANS = [
  {
    name: 'Essential',
    tagline: 'Great for regular upkeep',
    priceMonthly: 'R 650',
    priceOnce: 'R 850',
    color: 'var(--color-charcoal)',
    accent: 'var(--color-sage)',
    popular: false,
    features: [
      'Up to 2-bedroom home',
      'Kitchen & bathroom deep wipe',
      'Vacuuming & mopping',
      'Eco-friendly products',
      'Same cleaner each visit',
    ],
  },
  {
    name: 'Premium',
    tagline: 'Our most popular plan',
    priceMonthly: 'R 1,100',
    priceOnce: 'R 1,450',
    color: 'var(--color-sage)',
    accent: 'white',
    popular: true,
    features: [
      'Up to 4-bedroom home',
      'Inside oven & fridge',
      'Window sills & skirting boards',
      'Laundry folding',
      'Priority scheduling',
      'Monthly quality check call',
    ],
  },
  {
    name: 'Elite',
    tagline: 'White-glove, full service',
    priceMonthly: 'R 2,200',
    priceOnce: 'R 2,800',
    color: 'var(--color-charcoal)',
    accent: 'var(--color-gold)',
    popular: false,
    features: [
      'Unlimited size home',
      'Full deep clean every visit',
      'Carpet & upholstery steam',
      'Balcony & outdoor areas',
      'Dedicated team of 2+',
      'Same-day rebook guarantee',
      'Concierge support line',
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Pricing section — toggle monthly/once-off, spring card reveal
// ─────────────────────────────────────────────────────────────
export default function Pricing() {
  const [monthly, setMonthly] = useState(true);

  const { ref: headRef, isInView } = useScrollReveal();
  const { ref: cardsRef, isInView: cardsVisible } = useScrollReveal();

  return (
    <section
      id="pricing"
      className="section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        ref={headRef}
        className="text-center mb-14 max-w-xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
          style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
        >
          Transparent Pricing
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-display font-bold leading-tight mb-4 text-balance"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-charcoal)' }}
        >
          Honest rates,{' '}
          <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>exceptional</em>{' '}
          value.
        </motion.h2>

        {/* Toggle */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-3 p-1.5 rounded-full mt-6"
          style={{ background: 'var(--color-cream-warm)', border: '1px solid var(--color-cream-border)' }}
        >
          {['Monthly', 'Once-Off'].map((label) => (
            <button
              key={label}
              onClick={() => setMonthly(label === 'Monthly')}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
              style={{
                color: (monthly ? label === 'Monthly' : label === 'Once-Off')
                  ? 'white'
                  : 'rgba(26,8,18,0.6)',
                background: 'transparent',
                border: 'none',
                zIndex: 1,
              }}
            >
              {(monthly ? label === 'Monthly' : label === 'Once-Off') && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  layoutId="pricing-toggle"
                  style={{ background: 'var(--color-sage)', zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              {label}
            </button>
          ))}
        </motion.div>

        {monthly && (
          <motion.p
            className="text-xs font-medium mt-3"
            style={{ color: 'var(--color-sage)' }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Save up to 20% with a monthly plan
          </motion.p>
        )}
      </motion.div>

      {/* Cards */}
      <motion.div
        ref={cardsRef}
        className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        variants={staggerContainer}
        initial="hidden"
        animate={cardsVisible ? 'visible' : 'hidden'}
      >
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} plan={plan} monthly={monthly} />
        ))}
      </motion.div>

      {/* Footnote */}
      <motion.p
        className="text-center text-xs mt-10"
        style={{ color: 'rgba(26,8,18,0.45)' }}
        initial={{ opacity: 0 }}
        animate={cardsVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        All prices in South African Rand. VAT included. Free quote for commercial spaces.
      </motion.p>
    </section>
  );
}

function PricingCard({ plan, monthly }) {
  const { name, tagline, priceMonthly, priceOnce, color, accent, popular, features } = plan;
  const price = monthly ? priceMonthly : priceOnce;

  const isPopular = popular;
  const cardBg = isPopular ? 'var(--color-sage)' : 'white';
  const textColor = isPopular ? 'white' : 'var(--color-charcoal)';
  const subColor = isPopular ? 'rgba(255,255,255,0.65)' : 'rgba(26,8,18,0.6)';
  const borderColor = isPopular ? 'transparent' : 'var(--color-cream-border)';
  const checkColor = isPopular ? 'rgba(255,255,255,0.9)' : 'var(--color-sage)';
  const checkBg    = isPopular ? 'rgba(255,255,255,0.15)' : 'rgba(194,24,91,0.08)';

  return (
    <motion.div
      variants={staggerItem}
      className="relative rounded-3xl p-8 flex flex-col"
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        boxShadow: isPopular ? '0 24px 80px rgba(194,24,91,0.28)' : '0 4px 24px rgba(0,0,0,0.05)',
        marginTop: isPopular ? 0 : 16,
      }}
      whileHover={{
        y: -6,
        boxShadow: isPopular
          ? '0 36px 100px rgba(194,24,91,0.38)'
          : '0 20px 60px rgba(0,0,0,0.12)',
        transition: { type: 'spring', stiffness: 250, damping: 20 },
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'var(--color-gold)', color: 'var(--color-charcoal)' }}
        >
          <Zap size={10} fill="currentColor" />
          Most Popular
        </div>
      )}

      {/* Plan name */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: subColor }}>
          {name}
        </p>
        <p className="text-sm" style={{ color: subColor }}>
          {tagline}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={price}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="font-display font-bold"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 2.8rem)', color: textColor }}
          >
            {price}
          </motion.div>
        </AnimatePresence>
        <p className="text-xs mt-1" style={{ color: subColor }}>
          {monthly ? 'per month · 2 visits/month' : 'single visit'}
        </p>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: checkBg }}
            >
              <Check size={11} style={{ color: checkColor }} />
            </div>
            <span className="text-sm leading-relaxed" style={{ color: subColor }}>
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <MagneticButton
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-full py-3.5 rounded-xl font-semibold text-sm"
        style={{
          background: isPopular ? 'white' : 'var(--color-sage)',
          color: isPopular ? 'var(--color-sage)' : 'white',
          border: 'none',
        }}
      >
        Get Started
      </MagneticButton>
    </motion.div>
  );
}
