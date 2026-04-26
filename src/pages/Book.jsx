import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, CheckCircle2, Send, Star } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';

const SERVICES = [
  'Regular House Cleaning',
  'Deep Cleaning',
  'Move In / Move Out',
  'Post-Construction Cleaning',
  'Commercial Cleaning',
  'Carpet & Upholstery Cleaning',
  'Window Cleaning',
  'Restaurant / Kitchen Cleaning',
  'Eco-Friendly Cleaning',
  'Organizing & Decluttering',
  'Blind & Shutter Cleaning',
  'Pre / Post-Event Cleaning',
];

const inputStyle = {
  width: '100%',
  padding: '0.9rem 1rem',
  borderRadius: '0.875rem',
  border: '1px solid var(--color-cream-border)',
  background: 'white',
  color: 'var(--color-charcoal)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit',
};

const focusStyle = {
  borderColor: 'var(--color-sage)',
  boxShadow: '0 0 0 3px rgba(194,24,91,0.08)',
};

export default function Book() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1600);
  };

  const inp = (field) => ({
    style: focused === field ? { ...inputStyle, ...focusStyle } : inputStyle,
    onFocus: () => setFocused(field),
    onBlur: () => setFocused(null),
  });

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ background: 'var(--color-cream-warm)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
          >
            Get a Free Quote
          </span>
          <h1
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: 'var(--color-charcoal)' }}
          >
            Reserve your{' '}
            <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>spot today.</em>
          </h1>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: 'rgba(26,8,18,0.55)' }}>
            Tell us about your cleaning needs and we'll get back to you with a detailed, tailored quote — usually within 2 hours during business hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: contact info ── */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Sophia photo card */}
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden mb-6"
              style={{ height: 280, border: '1px solid rgba(194,24,91,0.1)' }}
            >
              <img
                src="/gallery/sophia-hero.jpg"
                alt="Sophia — founder of Sophia's Clean"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 20%', filter: 'contrast(1.05) saturate(1.08)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,8,18,0.75) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="font-display font-bold text-xl">Hi, I'm Sophia.</p>
                <p className="text-sm text-white/70">I'll personally oversee your clean.</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="var(--color-sage-light)" color="var(--color-sage-light)" />
                  ))}
                  <span className="text-xs text-white/60 ml-2">4.9 · 500+ clients</span>
                </div>
              </div>
            </motion.div>

            {[
              { icon: MessageCircle, label: 'WhatsApp',       value: '083 399 9974',               href: 'https://wa.me/27833999974',              color: '#25D366' },
              { icon: Phone,         label: 'Call Us',        value: '083 399 9974',               href: 'tel:+27833999974',                       color: 'var(--color-sage)' },
              { icon: Mail,          label: 'Email',          value: 'info@sophiasclean.co.za',    href: 'mailto:info@sophiasclean.co.za',         color: 'var(--color-gold)' },
              { icon: MapPin,        label: 'Based in',       value: 'Raats Drive, Table View · CPT 7441', href: null,                              color: '#e05c5c' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href || undefined}
                target={href ? '_blank' : undefined}
                rel="noopener noreferrer"
                variants={staggerItem}
                className="flex items-center gap-4 p-4 rounded-2xl no-underline"
                style={{
                  background: 'white',
                  border: '1px solid var(--color-cream-border)',
                  cursor: href ? 'pointer' : 'default',
                  display: 'flex',
                }}
                whileHover={href ? {
                  borderColor: color,
                  y: -2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                } : {}}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={17} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgba(26,8,18,0.45)' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-charcoal)' }}>{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Business hours */}
            <motion.div
              variants={staggerItem}
              className="p-4 rounded-2xl"
              style={{ background: 'white', border: '1px solid var(--color-cream-border)' }}
            >
              <p className="text-xs font-bold tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--color-sage)' }}>
                Business Hours
              </p>
              <div className="space-y-1.5 text-sm" style={{ color: 'var(--color-charcoal)' }}>
                <div className="flex justify-between"><span>Mon – Fri</span><span className="font-medium">8:00 – 17:00</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="font-medium">By appointment</span></div>
                <div className="flex justify-between" style={{ color: 'rgba(26,8,18,0.45)' }}>
                  <span>Sun &amp; Public Holidays</span><span>Closed</span>
                </div>
              </div>
              <p className="text-[11px] mt-3 leading-relaxed" style={{ color: 'rgba(26,8,18,0.5)' }}>
                After-hours enquiries are answered the next business day.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: booking form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 18 }}
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
                    className="flex flex-col items-center text-center py-14 gap-5"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(194,24,91,0.08)' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
                    >
                      <CheckCircle2 size={38} style={{ color: 'var(--color-sage)' }} />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl" style={{ color: 'var(--color-charcoal)' }}>
                      Booking Request Sent!
                    </h3>
                    <p className="text-sm max-w-xs" style={{ color: 'rgba(26,8,18,0.6)' }}>
                      Sophia's team will be in touch within 2 hours with your free quote.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                      className="text-sm font-semibold mt-2"
                      style={{ color: 'var(--color-sage)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-display font-semibold text-xl mb-2" style={{ color: 'var(--color-charcoal)' }}>
                      Your Details
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.55)' }}>Name</label>
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          {...inp('name')}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.55)' }}>Email</label>
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          {...inp('email')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.55)' }}>Phone / WhatsApp</label>
                      <input
                        placeholder="+27 79 000 0000"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        {...inp('phone')}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.55)' }}>Service Needed</label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                        {...inp('service')}
                        style={{ ...(focused === 'service' ? { ...inputStyle, ...focusStyle } : inputStyle), appearance: 'none' }}
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(26,8,18,0.55)' }}>Tell us about your space</label>
                      <textarea
                        rows={4}
                        placeholder="Number of rooms, location, preferred date..."
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        {...inp('message')}
                        style={{ ...(focused === 'message' ? { ...inputStyle, ...focusStyle } : inputStyle), resize: 'vertical', minHeight: 110 }}
                      />
                    </div>

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
                        <>Send Booking Request <Send size={14} /></>
                      )}
                    </MagneticButton>

                    <p className="text-center text-xs" style={{ color: 'rgba(26,8,18,0.38)' }}>
                      Free quote · No commitment · Reply within 2 hours
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
