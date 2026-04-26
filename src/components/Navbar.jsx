import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Our Work', href: '/work'     },
  { label: 'Products', href: '/products' },
  { label: 'Book',     href: '/book'     },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-6 md:px-10 lg:px-16"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
        style={{
          paddingTop: scrolled ? '0.85rem' : '1.25rem',
          paddingBottom: scrolled ? '0.85rem' : '1.25rem',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          background: scrolled ? 'rgba(255,255,255,0.93)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(252,228,236,0.7)' : '1px solid transparent',
          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline"
          style={{ textDecoration: 'none' }}
        >
          <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-sage)' }}
              >
                <Sparkles size={15} color="white" />
              </div>
              <span
                className="font-display text-xl font-semibold tracking-tight"
                style={{ color: 'var(--color-charcoal)' }}
              >
                Sophia's Clean
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.href;
            return (
              <motion.div key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm font-medium tracking-wide relative no-underline"
                  style={{
                    color: active ? 'var(--color-sage)' : 'var(--color-charcoal)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ background: 'var(--color-sage)' }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <MagneticButton
            onClick={() => navigate('/book')}
            className="px-5 py-2.5 text-sm font-semibold rounded-full text-white"
            style={{ background: 'var(--color-sage)' }}
          >
            Book a Clean
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--color-charcoal)', background: 'none', border: 'none' }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 md:hidden"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div key={link.label}>
                <Link
                  to={link.href}
                  className="block w-full py-4 text-2xl font-display font-semibold no-underline"
                  style={{
                    color: 'var(--color-charcoal)',
                    borderBottom: '1px solid var(--color-cream-border)',
                    textDecoration: 'none',
                  }}
                  onClick={() => setOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 100, damping: 18 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            >
              <Link
                to="/book"
                className="block w-full py-4 rounded-2xl text-white font-semibold text-lg text-center no-underline"
                style={{ background: 'var(--color-sage)', textDecoration: 'none' }}
                onClick={() => setOpen(false)}
              >
                Book a Clean
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
