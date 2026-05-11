import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Quote } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { fadeUp, staggerContainer, staggerItem } from '../animations/variants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfRG8sAAw50nBfMs4c6m-2libX88m2oNaz5SnyjK06vetvIEw/viewform';

const openForm = () => {
  window.open(FORM_URL, '_blank', 'noopener,noreferrer');
};

// Origin story content sourced verbatim (with light formatting) from
// https://www.sophiasclean.co.za/about
const STORY_PARAGRAPHS = [
  "Sophia's Clean was born out of a spark of opportunity, and it wasn't an easy journey. I started by managing my brother's Airbnb properties, handling everything from cleaning to guest services. This worked wonderfully, and I quickly saw how cleanliness could make or break a guest's experience. But during quieter periods when bookings were low, I faced a challenge: I needed something more consistent to support me year-round.",
  "That's when I decided to venture into residential cleaning. I posted my first promotion online, and to my surprise, the support was overwhelming. It was in that moment I realised I had a true passion for cleaning — not just for the work itself, but for creating spaces that people felt comfortable and happy in. This gave me the confidence to push further.",
  "Today, Sophia's Clean continues to grow and thrive. The work is harder than any corporate job I've ever had, but the sense of fulfilment and pride I feel every day is unmatched. There are moments when I get my hands dirty — literally — but it's all worth it. Every challenge has made me stronger, and there are no regrets.",
  "Looking ahead, I see my business expanding even more, serving clients across Cape Town, and continuing to provide exceptional cleaning services that make a real difference in people's lives. My goal is to hire more passionate people, foster a supportive community, and build my network further. Most importantly, I want to inspire others to take that leap of faith, just as I did. If I can do it, so can anyone with the courage to pursue their dreams.",
];

export default function AboutPage() {
  const { ref: storyRef, isInView: storyVisible } = useScrollReveal();
  const { ref: teamRef, isInView: teamVisible } = useScrollReveal();

  return (
    <>
      {/* ════════════════════════════════════════
          PAGE HERO — Meet Sophia
      ════════════════════════════════════════ */}
      <section
        className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(248,187,208,0.35) 0%, rgba(253,240,247,1) 60%, rgba(255,255,255,1) 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-5 px-3 py-1.5 rounded-full"
                style={{
                  color: 'var(--color-sage)',
                  background: 'rgba(194,24,91,0.08)',
                  border: '1px solid rgba(194,24,91,0.18)',
                }}
              >
                <Sparkles size={12} /> About
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="font-display font-bold leading-[1.05] tracking-tight mb-6"
                style={{
                  fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
                  color: 'var(--color-charcoal)',
                }}
              >
                Your home,{' '}
                <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>
                  cleaner than ever
                </em>{' '}
                — we make it shine.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-display italic text-lg sm:text-xl leading-relaxed mb-6"
                style={{ color: 'rgba(26,8,18,0.7)' }}
              >
                Founder. Cleaner. Standards-setter.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
                style={{ color: 'rgba(26,8,18,0.65)' }}
              >
                Sophia's journey from corporate life to entrepreneurship is a story of courage, resilience, and passion. Below you'll learn how Sophia's Clean was born — from its modest start managing Airbnb properties to growing into a successful business serving homes and businesses throughout Cape Town.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3"
              >
                <MagneticButton
                  onClick={openForm}
                  className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl text-white font-semibold text-sm sm:text-base"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
                    boxShadow: '0 8px 32px rgba(194,24,91,0.3)',
                  }}
                >
                  Get a Free Quote
                  <ExternalLink size={16} />
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right — portrait card */}
            <motion.div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl"
                style={{ boxShadow: '0 30px 80px rgba(194,24,91,0.18)' }}
              >
                <img
                  src="/gallery/about/sophia-portrait.jpg"
                  alt="Sophia, founder of Sophia's Clean"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: 'center 25%',
                    filter: 'contrast(1.04) saturate(1.06)',
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(26,8,18,0.45) 0%, transparent 100%)',
                  }}
                />
                <div
                  className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 16px rgba(26,8,18,0.12)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--color-sage)' }}
                  />
                  <span
                    className="text-[11px] font-bold tracking-[0.15em] uppercase"
                    style={{ color: 'var(--color-charcoal)' }}
                  >
                    Founder & Owner
                  </span>
                </div>
              </div>

              <motion.div
                className="hidden sm:flex items-center gap-3 mt-6 px-5 py-3 rounded-2xl shadow-md w-fit"
                style={{
                  background: 'white',
                  border: '1px solid var(--color-cream-border)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, type: 'spring', stiffness: 100, damping: 16 }}
              >
                <div
                  className="font-display italic text-lg leading-none"
                  style={{ color: 'var(--color-sage)' }}
                >
                  — Sophia
                </div>
                <div
                  className="w-px h-5"
                  style={{ background: 'var(--color-cream-border)' }}
                />
                <div
                  className="text-xs font-medium"
                  style={{ color: 'rgba(26,8,18,0.6)' }}
                >
                  Cape Town
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STORY — How Sophia's Clean came to life
      ════════════════════════════════════════ */}
      <section
        ref={storyRef}
        className="relative py-24 md:py-32 px-5 sm:px-6 md:px-10 lg:px-16"
        style={{ background: 'white' }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={storyVisible ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
              style={{
                color: 'var(--color-sage)',
                background: 'rgba(194,24,91,0.08)',
              }}
            >
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display font-bold leading-tight mb-8"
              style={{
                fontSize: 'clamp(2rem, 4.2vw, 3rem)',
                color: 'var(--color-charcoal)',
              }}
            >
              How Sophia's Clean{' '}
              <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>
                came to life.
              </em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-display italic mb-10 leading-snug"
              style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                color: 'var(--color-sage)',
              }}
            >
              It was a battle of comfort vs. growth.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed mb-7"
              style={{ color: 'rgba(26,8,18,0.75)' }}
            >
              {STORY_PARAGRAPHS[0]}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(26,8,18,0.75)' }}
            >
              {STORY_PARAGRAPHS[1]}
            </motion.p>

            {/* Pull-quote */}
            <motion.figure
              variants={fadeUp}
              className="relative my-12 py-10 px-6 sm:px-10 rounded-3xl"
              style={{
                background: 'var(--color-cream-warm)',
                border: '1px solid var(--color-cream-border)',
              }}
            >
              <Quote
                size={36}
                style={{
                  color: 'var(--color-sage)',
                  position: 'absolute',
                  top: -18,
                  left: 28,
                  background: 'white',
                  padding: 4,
                  borderRadius: '50%',
                }}
              />
              <blockquote
                className="font-display italic leading-snug"
                style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                  color: 'var(--color-charcoal)',
                }}
              >
                "Better to try and fail than never to try at all. If I didn't take that step, I knew I'd regret it forever."
              </blockquote>
              <figcaption
                className="mt-5 text-sm font-medium"
                style={{ color: 'rgba(26,8,18,0.55)' }}
              >
                — Sophia
              </figcaption>
            </motion.figure>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed mb-7"
              style={{ color: 'rgba(26,8,18,0.75)' }}
            >
              {STORY_PARAGRAPHS[2]}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(26,8,18,0.75)' }}
            >
              {STORY_PARAGRAPHS[3]}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-display italic text-center"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: 'var(--color-sage)',
              }}
            >
              Save time, enjoy life!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          THE TEAM — full-bleed photo + caption
      ════════════════════════════════════════ */}
      <section
        ref={teamRef}
        className="relative py-20 md:py-28 px-5 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
        style={{ background: 'var(--color-cream-warm)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={teamVisible ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
              style={{
                color: 'var(--color-sage)',
                background: 'rgba(194,24,91,0.08)',
              }}
            >
              The Team
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
                color: 'var(--color-charcoal)',
              }}
            >
              The hands behind every{' '}
              <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>
                spotless space.
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
              style={{ color: 'rgba(26,8,18,0.6)' }}
            >
              Hand-picked, trained, and held to Sophia's standards. The same friendly faces show up every visit.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={teamVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 30px 80px rgba(194,24,91,0.18)' }}
          >
            <img
              src="/gallery/about/sophia-secondary.jpg"
              alt="Sophia and the Sophia's Clean team in their pink uniforms by the company van"
              className="w-full h-auto block"
              style={{ filter: 'contrast(1.03) saturate(1.05)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA
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
            Ready to meet the team?
          </p>
          <h2
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Let's get your home sparkling.
            <br />
            <em className="font-normal" style={{ opacity: 0.85 }}>
              Free quote, no commitment.
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
            Get a Free Quote
            <ExternalLink size={16} />
          </MagneticButton>
        </motion.div>
      </section>
    </>
  );
}
