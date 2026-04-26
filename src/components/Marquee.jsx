import { motion } from 'framer-motion';
import { Star, Sparkles, Leaf, Shield, Clock, ThumbsUp } from 'lucide-react';

const ITEMS = [
  { icon: Star,      text: '5-Star Rated Service' },
  { icon: Sparkles,  text: 'Eco-Friendly Products' },
  { icon: Shield,    text: 'Fully Insured & Bonded' },
  { icon: Leaf,      text: 'Non-Toxic Formulas' },
  { icon: Clock,     text: 'Punctual Every Time' },
  { icon: ThumbsUp,  text: '100% Satisfaction Guarantee' },
];

// Double the items for seamless loop
const DOUBLED = [...ITEMS, ...ITEMS];

// ─────────────────────────────────────────────────────────────
// Marquee — infinite horizontal scroll trust strip
// Pauses on hover.
// ─────────────────────────────────────────────────────────────
export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-5 border-y"
      style={{
        borderColor: 'var(--color-cream-border)',
        background: 'var(--color-cream-warm)',
      }}
    >
      <div className="marquee-track flex items-center gap-12 w-max">
        {DOUBLED.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap"
            style={{ color: 'var(--color-charcoal)' }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(194,24,91,0.10)' }}
            >
              <Icon size={12} style={{ color: 'var(--color-sage)' }} />
            </div>
            {text}

            {/* Separator dot */}
            <span
              className="w-1.5 h-1.5 rounded-full ml-6"
              style={{ background: 'var(--color-cream-border)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
