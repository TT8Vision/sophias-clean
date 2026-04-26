import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, Send } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { staggerContainer, staggerItem, fadeUp, slideLeft, slideRight } from '../animations/variants';
import MagneticButton from './MagneticButton';

const SERVICES_LIST = [
  'Residential Cleaning',
  'Commercial Cleaning',
  'Deep Clean',
  'Move In / Move Out',
  'Post-Construction',
  'Upholstery & Carpet',
];

// ─────────────────────────────────────────────────────────────
// Contact section — split layout, animated form with success state
// ─────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref: leftRef, isInView: leftVisible }   = useScrollReveal();
  const { ref: rightRef, isInView: rightVisible } = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submit (replace with real endpoint)
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1600);
  };

  const inputBase = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '0.875rem',
    border: '1px solid var(--color-cream-border)',
    background: 'white',
    color: 'var(--color-charcoal)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section
      id="contact"
      className="section px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* ── Left: info panel ── */}
        <motion.div
          ref={leftRef}
          variants={staggerContainer}
          initial="hidden"
          animate={leftVisible ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
          >
            Book a Clean
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold leading-tight mb-4 text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-charcoal)' }}
          >
            Ready for a{' '}
            <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>spotless</em>{' '}
            home?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-10"
            style={{ color: 'rgba(26,8,18,0.6)' }}
          >
            Send us a message and we'll get back to you within 2 hours.
            Or reach us directly on WhatsApp for instant booking.
          </motion.p>

          {/* Contact info cards */}
          <motion.div className="space-y-4" variants={staggerContainer}>
            {[
              { icon: MessageCircle, label: 'WhatsApp', value: '+27 79 123 4567', href: 'https://wa.me/27791234567', color: '#25D366' },
              { icon: Phone,         label: 'Call Us',  value: '+27 79 123 4567', href: 'tel:+27791234567',         color: 'var(--color-sage)' },
              { icon: Mail,          label: 'Email',    value: 'hello@sophiasclean.co.za', href: 'mailto:hello@sophiasclean.co.za', color: 'var(--color-gold)' },
              { icon: MapPin,        label: 'Areas',    value: 'Johannesburg · Pretoria · Midrand', href: null, color: '#e05c5c' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href || '#'}
                variants={staggerItem}
                className="flex items-center gap-4 p-4 rounded-2xl group no-underline"
                style={{
                  background: 'white',
                  border: '1px solid var(--color-cream-border)',
                  cursor: href ? 'pointer' : 'default',
                }}
                whileHover={href ? {
                  borderColor: color,
                  y: -2,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                } : {}}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(26,8,18,0.5)' }}>
                    {label}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--color-charcoal)' }}>
                    {value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: form ── */}
        <motion.div
          ref={rightRef}
          variants={slideRight}
          initial="hidden"
          animate={rightVisible ? 'visible' : 'hidden'}
        >
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: 'white',
              border: '1px solid var(--color-cream-border)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.06)',
            }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(194,24,91,0.08)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
                  >
                    <CheckCircle2 size={36} style={{ color: 'var(--color-sage)' }} />
                  </motion.div>
                  <h3
                    className="font-display font-bold text-2xl"
                    style={{ color: 'var(--color-charcoal)' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm max-w-xs" style={{ color: 'rgba(26,8,18,0.6)' }}>
                    Sophia's team will be in touch within 2 hours. Check your inbox or WhatsApp.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                    className="text-sm font-semibold mt-2"
                    style={{ color: 'var(--color-sage)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <h3
                    className="font-display font-semibold text-xl mb-6"
                    style={{ color: 'var(--color-charcoal)' }}
                  >
                    Get a Free Quote
                  </h3>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.6)' }}>
                        Your Name
                      </label>
                      <input
                        required
                        placeholder="Sophia van der Berg"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        style={inputBase}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--color-sage)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(194,24,91,0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--color-cream-border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.6)' }}>
                        Email Address
                      </label>
                      <input
                        required type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        style={inputBase}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--color-sage)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(194,24,91,0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--color-cream-border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.6)' }}>
                      Phone / WhatsApp
                    </label>
                    <input
                      placeholder="+27 79 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      style={inputBase}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-sage)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(194,24,91,0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-cream-border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Service select */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.6)' }}>
                      Service Needed
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      style={{ ...inputBase, appearance: 'none' }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-sage)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(194,24,91,0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-cream-border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.6)' }}>
                      Tell us about your space
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Number of rooms, specific areas of concern, preferred dates..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      style={{ ...inputBase, resize: 'vertical', minHeight: 100 }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-sage)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(194,24,91,0.08)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-cream-border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <MagneticButton
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2.5"
                    style={{ background: loading ? 'var(--color-sage-dark)' : 'var(--color-sage)' }}
                  >
                    {loading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        Send My Booking Request
                        <Send size={15} />
                      </>
                    )}
                  </MagneticButton>

                  <p className="text-center text-xs" style={{ color: 'rgba(26,8,18,0.4)' }}>
                    No commitment. Free quote. Response within 2 hours.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
