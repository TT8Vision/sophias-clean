import { motion } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';

// Custom SVG social icons (Facebook & Instagram removed from lucide-react v0.400+)
const FacebookIcon = ({ size = 18, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 18, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
  </svg>
);
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LINKS = {
  Services: ['Regular House Cleaning', 'Deep Cleaning', 'Move In / Move Out', 'Commercial Cleaning', 'Carpet & Upholstery', 'Window Cleaning'],
  Company: ['About Sophia', 'Our Work', 'Eco Products', 'Book a Clean'],
  Areas: ['Table View', 'Cape Town CBD', 'Sea Point', 'Century City', 'Claremont', 'Stellenbosch'],
};

// ─────────────────────────────────────────────────────────────
// Footer — dark themed with link columns and social icons
// ─────────────────────────────────────────────────────────────
export default function Footer() {
  const { ref, isInView } = useScrollReveal();

  return (
    <footer
      className="mt-8 px-5 sm:px-6 md:px-10 lg:px-16 pt-14 sm:pt-16 pb-8"
      style={{ background: 'var(--color-charcoal)' }}
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 mb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Brand col */}
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-sage)' }}
              >
                <Sparkles size={15} color="white" />
              </div>
              <span className="font-display text-xl font-semibold text-white tracking-tight">
                Sophia's Clean
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-3 max-w-xs italic font-display" style={{ color: 'rgba(255,255,255,0.7)' }}>
              "Save time, enjoy life!"
            </p>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Trusted home & commercial cleaning experts based in Table View, Cape Town. Serving since 2017.
            </p>
            <div className="text-sm space-y-1.5 mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <p>📞 <a href="tel:+27833999974" className="no-underline hover:text-white" style={{ color: 'inherit' }}>083 399 9974</a></p>
              <p>✉️ <a href="mailto:info@sophiasclean.co.za" className="no-underline hover:text-white" style={{ color: 'inherit' }}>info@sophiasclean.co.za</a></p>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: FacebookIcon,   href: 'https://facebook.com/sophiasclean',          label: 'Facebook' },
                { icon: InstagramIcon,  href: 'https://instagram.com/sophiasclean_',        label: 'Instagram' },
                { icon: MessageCircle,  href: 'https://wa.me/27833999974',                  label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                  whileHover={{
                    background: 'var(--color-sage)',
                    y: -2,
                    transition: { type: 'spring', stiffness: 300, damping: 18 },
                  }}
                >
                  <Icon size={15} color="white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <motion.div key={heading} variants={staggerItem}>
              <h4
                className="text-xs font-bold tracking-[0.15em] uppercase mb-4"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="text-sm no-underline"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      whileHover={{ color: 'white', x: 2, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <p>© {new Date().getFullYear()} Sophia's Clean (Pty) Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'POPIA Compliance'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors duration-200 no-underline"
                style={{ color: 'inherit' }}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
