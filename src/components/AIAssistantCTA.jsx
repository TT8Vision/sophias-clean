import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { openAIAgent } from '../lib/aiAgent';

export default function AIAssistantCTA({ className = '', style }) {
  const [opening, setOpening] = useState(false);

  const handleClick = async () => {
    if (opening) return;
    setOpening(true);

    const minDuration = new Promise((r) => setTimeout(r, 1100));
    const openCall = openAIAgent();
    await Promise.all([minDuration, openCall]);

    setTimeout(() => setOpening(false), 350);
  };

  return (
    <>
      <div className="relative inline-block">
        <motion.span
          aria-hidden
          className="absolute -inset-1 rounded-2xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(248,187,208,0.55), transparent 65%), radial-gradient(circle at 70% 70%, rgba(194,24,91,0.45), transparent 65%)',
            filter: 'blur(14px)',
          }}
          animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <MagneticButton
          onClick={handleClick}
          className={`relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white font-semibold text-sm sm:text-base w-full sm:w-auto ${className}`}
          style={{
            background:
              'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
            boxShadow:
              '0 8px 32px rgba(194,24,91,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            ...style,
          }}
        >
          <span className="relative flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }}>
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255,255,255,0.35)' }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <Sparkles size={13} />
          </span>
          Talk to Sophia's AI
          <span
            className="text-[9px] font-bold tracking-[0.18em] uppercase px-1.5 py-0.5 rounded-md"
            style={{ background: 'rgba(255,255,255,0.22)', color: 'white' }}
          >
            Live
          </span>
        </MagneticButton>
      </div>

      <AnimatePresence>{opening && <ImmersiveOverlay />}</AnimatePresence>
    </>
  );
}

function ImmersiveOverlay() {
  return (
    <motion.div
      key="ai-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background:
          'radial-gradient(circle at center, rgba(64,12,38,0.78) 0%, rgba(20,4,12,0.92) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 520,
          height: 520,
          background:
            'radial-gradient(circle, rgba(248,187,208,0.7) 0%, rgba(194,24,91,0.45) 35%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.05, 0.95, 1], opacity: [0, 1, 0.85, 1] }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            border: '1.5px solid rgba(255,255,255,0.45)',
            mixBlendMode: 'screen',
          }}
          initial={{ width: 80, height: 80, opacity: 0 }}
          animate={{
            width: [80, 560],
            height: [80, 560],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 1.6,
            delay: i * 0.35,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.22)',
          }}
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Mic size={22} className="text-white" />
        </motion.div>

        <p className="text-[11px] font-bold tracking-[0.32em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
          AI Concierge
        </p>
        <h2
          className="font-display font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.6rem)' }}
        >
          Connecting you to{' '}
          <em style={{ color: '#FBC8DA', fontStyle: 'italic' }}>Sophia's AI</em>
        </h2>
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
              transition={{ duration: 1.2, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
