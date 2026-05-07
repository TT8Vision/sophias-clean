import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Clock, Shield, Leaf } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { fadeUp, staggerContainer, staggerItem } from '../animations/variants';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfRG8sAAw50nBfMs4c6m-2libX88m2oNaz5SnyjK06vetvIEw/viewform';

const REASSURANCE = [
  { icon: Clock,  label: 'Quick reply',    desc: 'We aim to respond within 2 hours during business hours.' },
  { icon: Shield, label: 'No commitment',  desc: 'A quote is just a quote — no obligation, no pressure.' },
  { icon: Leaf,   label: 'Honest pricing', desc: 'A clear, fair price based on your space and needs.' },
];

const STEPS = [
  { n: '1', title: 'Tell us about your space', desc: 'Fill out the short form — takes about 2 minutes.' },
  { n: '2', title: 'We reply with a quote',    desc: 'Sophia reviews and sends back a clear, fair price.' },
  { n: '3', title: 'Book your clean',          desc: 'Confirm the date and we handle the rest.' },
];

const openForm = () => {
  window.open(FORM_URL, '_blank', 'noopener,noreferrer');
};

export default function Quote() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO  — value prop + huge CTA
      ════════════════════════════════════════ */}
      <section
        className="relative pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(248,187,208,0.4) 0%, rgba(253,240,247,1) 60%, rgba(255,255,255,1) 100%)',
        }}
      >
        {/* Decorative pink wash */}
        <div
          className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(194,24,91,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-6 px-3 py-1.5 rounded-full"
              style={{
                color: 'var(--color-sage)',
                background: 'rgba(194,24,91,0.08)',
                border: '1px solid rgba(194,24,91,0.18)',
              }}
            >
              <Sparkles size={12} /> Free Quote · No Commitment
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold leading-[1.05] tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                color: 'var(--color-charcoal)',
              }}
            >
              Get your{' '}
              <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>
                free quote
              </em>{' '}
              in 2 minutes.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(26,8,18,0.65)' }}
            >
              Tell us a bit about your space and what you'd like cleaned. Sophia replies personally — usually within a couple of hours.
            </motion.p>

            {/* Primary CTA — opens form in new tab */}
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
              <MagneticButton
                onClick={openForm}
                className="inline-flex items-center justify-center gap-2.5 px-9 py-5 rounded-2xl text-white font-bold"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
                  boxShadow: '0 12px 40px rgba(194,24,91,0.35)',
                  fontSize: '1.05rem',
                }}
              >
                Open the Quote Form
                <ExternalLink size={17} />
              </MagneticButton>

              <p className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(26,8,18,0.45)' }}>
                <ExternalLink size={11} />
                Opens in a new tab · powered by Google Forms
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS — 3 steps
      ════════════════════════════════════════ */}
      <section
        className="px-5 sm:px-6 md:px-10 lg:px-16 py-20 md:py-24"
        style={{ background: 'white' }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1.5 rounded-full"
              style={{
                color: 'var(--color-sage)',
                background: 'rgba(194,24,91,0.08)',
              }}
            >
              How it works
            </span>
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: 'var(--color-charcoal)',
              }}
            >
              Three short steps —{' '}
              <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>
                that's it.
              </em>
            </h2>
          </motion.div>

          <motion.ol
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            {STEPS.map((step) => (
              <motion.li
                key={step.n}
                variants={staggerItem}
                className="relative p-6 rounded-2xl flex flex-col"
                style={{
                  background: 'var(--color-cream-warm)',
                  border: '1px solid var(--color-cream-border)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
                    color: 'white',
                  }}
                >
                  {step.n}
                </div>
                <h3
                  className="font-display font-semibold text-lg mb-2"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(26,8,18,0.6)' }}
                >
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REASSURANCE strip
      ════════════════════════════════════════ */}
      <section
        className="px-5 sm:px-6 md:px-10 lg:px-16 pb-20"
        style={{ background: 'white' }}
      >
        <motion.div
          className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {REASSURANCE.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="flex gap-3 p-5 rounded-2xl"
              style={{
                background: 'rgba(194,24,91,0.05)',
                border: '1px solid rgba(194,24,91,0.10)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(194,24,91,0.12)' }}
              >
                <Icon size={17} style={{ color: 'var(--color-sage)' }} />
              </div>
              <div>
                <div
                  className="font-semibold text-sm mb-1"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  {label}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(26,8,18,0.55)' }}
                >
                  {desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA — repeat the primary action
      ════════════════════════════════════════ */}
      <section
        className="px-5 sm:px-6 md:px-14 lg:px-20 py-20 md:py-28"
        style={{ background: 'white' }}
      >
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
            boxShadow: '0 24px 80px rgba(194,24,91,0.3)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.08)',
              transform: 'translate(30%, -30%)',
              filter: 'blur(40px)',
            }}
          />

          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-white/60">
            Ready when you are
          </p>
          <h2
            className="font-display font-bold text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Two minutes now.
            <br />
            <em className="font-normal" style={{ opacity: 0.85 }}>
              A spotless home this week.
            </em>
          </h2>

          <MagneticButton
            onClick={openForm}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-base"
            style={{
              background: 'white',
              color: 'var(--color-sage)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            Open the Quote Form
            <ExternalLink size={15} />
          </MagneticButton>
        </motion.div>
      </section>
    </>
  );
}
