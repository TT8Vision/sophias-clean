import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// WhatsApp Floating Action Button
// Appears after 3s with a pulse ring, expands to chat bubble on click
// ─────────────────────────────────────────────────────────────
export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Chat bubble */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                className="rounded-2xl p-5 shadow-2xl w-72"
                style={{
                  background: 'white',
                  border: '1px solid var(--color-cream-border)',
                  transformOrigin: 'bottom right',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-display"
                    style={{ background: 'var(--color-sage)' }}
                  >
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-charcoal)' }}>
                      Sophia's Clean
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#25D366' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                      Typically replies in minutes
                    </div>
                  </div>
                </div>
                <div
                  className="rounded-xl p-3 mb-4 text-sm leading-relaxed"
                  style={{
                    background: 'var(--color-cream-warm)',
                    color: 'var(--color-charcoal)',
                  }}
                >
                  👋 Hi there! Ready to book a clean or have a question? Chat with us now — we're here to help!
                </div>
                <a
                  href="https://wa.me/27833999974?text=Hi%20Sophia%27s%20Clean%2C%20I%27d%20like%20to%20book%20a%20clean!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl font-semibold text-sm text-white no-underline"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle size={16} />
                  Start WhatsApp Chat
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
            className="relative"
          >
            {/* Pulse ring */}
            {!open && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: '#25D366' }}
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            <motion.button
              onClick={() => setOpen((p) => !p)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: '#25D366', border: 'none' }}
              whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
                  >
                    <X size={22} color="white" />
                  </motion.span>
                ) : (
                  <motion.span key="chat"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
                  >
                    <MessageCircle size={22} color="white" fill="white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
