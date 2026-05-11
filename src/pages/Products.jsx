import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Search, ExternalLink, Plus, Check, Sparkles, ShoppingBag } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { staggerContainer, staggerItem } from '../animations/variants';
import { useCart } from '../lib/CartContext';
import { openQuoteForm } from '../lib/quoteForm';

// ─── Real product catalogue from sophiasclean.co.za/products ────
// Astonish — plant-based, cruelty-free, no harmful chemicals
// Featured promo bundle — rendered as a hero banner above the grid
const BUNDLE = {
  name: 'Astonish Cleaning Bundle',
  price: '300.00',
  originalPrice: '317.40',
  image: '/products/00-astonish-bundle.jpg',
  category: 'Bundle',
  includes: [
    'Window & Glass Cleaner',
    'Toilet Fresh Peony',
    'Kitchen Cleaner Zesty Lemon',
    'Floor Cleaner Peony Bloom',
    'Antibacterial Surface Cleanser',
    'Bathroom Cleaner',
  ],
  saving: '17.40',
};

const PRODUCTS = [
  { name: 'Astonish Multi-Purpose Bicarbonate of Soda 750ml',                  price: '52.90',  image: '/products/03-astonish-multi-purpose-bicarbonate-of-soda-750ml.jpg',          category: 'Everyday'    },
  { name: 'Astonish Fabric Refresher Cotton Fresh 750ml',                      price: '52.90',  image: '/products/04-astonish-fabric-refresher-cotton-fresh-750ml.jpg',              category: 'Everyday'    },
  { name: 'Astonish Oxy Active Fabric Stain Remover 750ml',                    price: '52.90',  image: '/products/05-astonish-oxy-active-fabric-stain-remover-750ml.jpg',            category: 'Everyday'    },
  { name: 'Astonish Kitchen Cleaner Zesty Lemon 750ml',                        price: '52.90',  image: '/products/06-astonish-kitchen-cleaner-zesty-lemon-750ml.jpg',                category: 'Everyday'    },
  { name: 'Astonish Daily Shower Shine White Lilies 750ml',                    price: '52.90',  image: '/products/07-astonish-daily-shower-shine-white-lilies-750ml.jpg',            category: 'Everyday'    },
  { name: 'Astonish Multi-Surface Cleaner Orange Grove 750ml',                 price: '52.90',  image: '/products/08-astonish-multi-surface-cleaner-orange-grove-750ml.jpg',         category: 'Everyday'    },
  { name: 'Astonish Bathroom Cleaner White Jasmine & Basil 750ml',             price: '52.90',  image: '/products/09-astonish-bathroom-cleaner-white-jasmine-basil-750m.jpg',        category: 'Everyday'    },
  { name: 'Astonish Floor Cleaner Zesty Lemon 1L',                             price: '52.90',  image: '/products/10-astonish-floor-cleaner-zesty-lemon1-lt.jpg',                    category: 'Floor'       },
  { name: 'Astonish Floor Cleaner Peony Bloom 1L',                             price: '52.90',  image: '/products/12-astonish-floor-cleaner-peony-bloom-1-lt.jpg',                   category: 'Floor'       },
  { name: 'Astonish Floor Cleaner Lavender Blossom 1L',                        price: '52.90',  image: '/products/13-astonish-floor-cleaner-lavender-blossom-1-lt.jpg',              category: 'Floor'       },
  { name: 'Astonish Toilet Fresh Ocean',                                       price: '52.90',  image: '/products/14-astonish-toilet-fresh-ocean.jpg',                               category: 'Toilet'      },
  { name: 'Astonish Toilet Fresh Lemon',                                       price: '52.90',  image: '/products/15-astonish-toilet-fresh-lemon.jpg',                               category: 'Toilet'      },
  { name: 'Astonish Toilet Fresh Peony',                                       price: '52.90',  image: '/products/16-astonish-toilet-fresh-peony.jpg',                               category: 'Toilet'      },
  { name: 'Astonish Toilet Fresh Eucalyptus',                                  price: '52.90',  image: '/products/17-astonish-toilet-fresh-eucalyptus.jpg',                           category: 'Toilet'      },
  { name: 'Astonish Shake & Fresh Carpet Freshener Pink Blossom',              price: '52.90',  image: '/products/18-astonish-shake-fresh-carpet-freshener-pink-blossom.jpg',         category: 'Carpet'      },
  { name: 'Astonish Shake & Fresh Carpet Freshener Lemon',                     price: '92.00',  image: '/products/19-astonish-shake-fresh-carpet-freshener-lemon.jpg',                category: 'Carpet'      },
  { name: 'Astonish The Good One Natural Power Cleaning Paste 500g',           price: '145.90', image: '/products/20-astonish-the-good-one-natural-power-cleaning-paste.jpg',         category: 'Specialist'  },
  { name: "Astonish All in 1 Dishwasher Tablets 42's",                         price: '289.90', image: '/products/21-astonish-all-in-1-dishwasher-tablets-42s.jpg',                   category: 'Dishwasher'  },
  { name: 'Astonish All in 1 Dishwasher Tablets 100s',                         price: '52.90',  image: '/products/22-astonish-all-in-1-dishwasher-tablets-100s.jpg',                  category: 'Dishwasher'  },
  { name: 'Astonish Specialist Stainless Steel & Shine 750ml',                 price: '52.90',  image: '/products/23-astonish-specialist-stainless-steel-and-shine-clea.jpg',         category: 'Specialist'  },
  { name: 'Astonish Specialist Mould Blast Stain Remover 750ml',               price: '52.90',  image: '/products/24-astonish-specialist-mould-blast-stain-remover-750m.jpg',         category: 'Specialist'  },
  { name: 'Astonish Window & Glass Cleaner Eucalyptus & Lemon 750ml',          price: '52.90',  image: '/products/25-astonish-window-glass-cleaner-eucalyptus-lemon-750.jpg',         category: 'Specialist'  },
  { name: 'Astonish Specialist Extra Strength Antibacterial Cleanser 750ml',   price: '52.90',  image: '/products/26-astonish-specialist-extra-strength-antibacterial-s.jpg',         category: 'Specialist'  },
  { name: 'Astonish Oxy Active Foaming Carpet Stain Remover 750ml',            price: '52.90',  image: '/products/27-astonish-oxy-active-foaming-carpet-stain-remover-7.jpg',         category: 'Carpet'      },
  { name: 'Astonish Specialist Air Fryer Cleaner 750ml',                       price: '52.90',  image: '/products/28-astonish-specialist-air-fryer-cleaner-750ml.jpg',                category: 'Specialist'  },
  { name: 'Astonish Specialist Lime Blast Limescale Remover 750ml',            price: '52.90',  image: '/products/29-astonish-specialist-lime-blast-limescale-remover-7.jpg',         category: 'Specialist'  },
  { name: 'Astonish Specialist Extra Strength Grease Lifter 750ml',            price: '52.90',  image: '/products/30-astonish-specialist-extra-strength-grease-lifter-7.jpg',         category: 'Specialist'  },
];

const CATEGORIES = ['All', 'Everyday', 'Floor', 'Toilet', 'Carpet', 'Specialist', 'Dishwasher'];

export default function Products() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ background: 'var(--color-cream-warm)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12 pt-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{ color: 'var(--color-sage)', background: 'rgba(194,24,91,0.08)' }}
          >
            <Leaf size={11} />
            Plant-Based · Cruelty-Free
          </span>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: 'var(--color-charcoal)' }}
          >
            Astonish{' '}
            <em style={{ color: 'var(--color-sage)', fontStyle: 'italic' }}>cleaning products.</em>
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(26,8,18,0.55)' }}>
            The same eco-conscious products our team uses on every job. Plant-based, cruelty-free, and made without harmful chemicals.
          </p>
        </motion.div>

        {/* ── Promo Bundle Banner ── */}
        <PromoBundleBanner bundle={BUNDLE} onAdd={() => addItem(BUNDLE)} />

        {/* ── Filters + Search ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 18 }}
        >
          <div className="relative max-w-md mx-auto mb-6">
            <Search size={16} style={{ position: 'absolute', left: 14, top: 14, color: 'rgba(26,8,18,0.4)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full"
              style={{
                paddingLeft: 40, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                background: 'white',
                border: '1px solid var(--color-cream-border)',
                borderRadius: '0.875rem',
                fontSize: '0.9rem',
                color: 'var(--color-charcoal)',
                outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-sage)'; e.target.style.boxShadow = '0 0 0 3px rgba(194,24,91,0.08)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--color-cream-border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full"
                  style={{
                    background: active ? 'var(--color-sage)' : 'white',
                    color: active ? 'white' : 'var(--color-charcoal)',
                    border: active ? '1px solid var(--color-sage)' : '1px solid var(--color-cream-border)',
                    cursor: 'pointer',
                  }}
                  whileHover={!active ? { borderColor: 'var(--color-sage)', color: 'var(--color-sage)' } : {}}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Product grid ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard
                key={p.name}
                product={p}
                onAdd={() => addItem(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center py-16 text-sm"
            style={{ color: 'rgba(26,8,18,0.5)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            No products match your search.
          </motion.p>
        )}

        {/* ── Order via form banner ── */}
        <motion.div
          className="mt-16 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
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
              transform: 'translate(30%,-30%)',
              filter: 'blur(40px)',
            }}
          />
          <Leaf size={32} color="white" style={{ margin: '0 auto 1rem', opacity: 0.9 }} />
          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Order any product via our form
          </h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-7">
            Tell us which products you'd like and we'll arrange delivery in Cape Town or include them in your next clean.
          </p>
          <MagneticButton
            onClick={openQuoteForm}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm"
            style={{ background: 'white', color: 'var(--color-sage)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
          >
            <ExternalLink size={15} />
            Order via Form
            <ArrowRight size={14} />
          </MagneticButton>
        </motion.div>

        {/* Brand strip */}
        <p className="text-center text-xs mt-10" style={{ color: 'rgba(26,8,18,0.4)' }}>
          Astonish is known for its environmentally conscious approach — plant-based, cruelty-free, made without harmful chemicals.
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd();
    setAdded(true);
  };

  const isPromo = !!product.promo;
  const hasOriginalPrice = product.originalPrice && product.originalPrice !== product.price;
  const savePercent = hasOriginalPrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <motion.div
      layout
      variants={staggerItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="rounded-2xl overflow-hidden group flex flex-col"
      style={{
        background: 'white',
        border: isPromo ? '1.5px solid rgba(212,100,122,0.5)' : '1px solid var(--color-cream-border)',
        boxShadow: isPromo
          ? '0 6px 24px rgba(212,100,122,0.18)'
          : '0 2px 12px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -4,
        boxShadow: '0 14px 36px rgba(194,24,91,0.13)',
        borderColor: 'rgba(194,24,91,0.3)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      {/* Image */}
      <div
        className="relative w-full aspect-square overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #fdf0f7 0%, #ffffff 100%)' }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4"
          loading="lazy"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full"
          style={{
            background: isPromo
              ? 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-sage) 100%)'
              : 'rgba(194,24,91,0.88)',
            color: 'white',
            boxShadow: isPromo ? '0 4px 14px rgba(212,100,122,0.35)' : 'none',
          }}
        >
          {isPromo ? 'Promo · Bundle' : product.category}
        </div>
        {hasOriginalPrice && (
          <div
            className="absolute top-2.5 right-2.5 text-[10px] font-extrabold tracking-wide px-2 py-1 rounded-full"
            style={{
              background: 'white',
              color: 'var(--color-sage)',
              border: '1px solid rgba(194,24,91,0.25)',
            }}
          >
            Save {savePercent}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p
          className="font-medium text-xs leading-snug mb-2 line-clamp-2"
          style={{ color: 'var(--color-charcoal)', minHeight: '2.4em' }}
        >
          {product.name}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <p className="font-display font-bold text-base" style={{ color: 'var(--color-sage)' }}>
              R{product.price}
            </p>
            {hasOriginalPrice && (
              <p
                className="text-xs font-medium"
                style={{
                  color: 'rgba(26,8,18,0.4)',
                  textDecoration: 'line-through',
                }}
              >
                R{product.originalPrice}
              </p>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            disabled={added}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full"
            style={{
              background: added ? 'var(--color-sage)' : 'rgba(194,24,91,0.08)',
              color: added ? 'white' : 'var(--color-sage)',
              border: 'none',
              cursor: added ? 'default' : 'pointer',
              transition: 'background 0.25s, color 0.25s',
            }}
            whileHover={!added ? { background: 'var(--color-sage)', color: 'white' } : {}}
            whileTap={!added ? { scale: 0.94 } : {}}
            aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Check size={11} /> Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <Plus size={11} /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// Promo bundle banner — featured CTA above the product grid
// ──────────────────────────────────────────────────────────────
function PromoBundleBanner({ bundle, onAdd }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
  };

  const savePercent = Math.round(
    (1 - parseFloat(bundle.price) / parseFloat(bundle.originalPrice)) * 100,
  );

  return (
    <motion.section
      className="relative rounded-3xl overflow-hidden mb-10"
      style={{
        background:
          'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
        boxShadow: '0 20px 60px rgba(194,24,91,0.28)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, type: 'spring', stiffness: 80, damping: 18 }}
      aria-label="Featured promo bundle"
    >
      {/* Decorative wash */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(244,160,181,0.35) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div className="relative grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-6 md:gap-10 items-center p-6 sm:p-8 md:p-10">
        {/* Left — bundle image */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mx-auto w-full max-w-sm md:max-w-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          <img
            src={bundle.image}
            alt={bundle.name}
            className="w-full h-full object-contain"
            style={{ display: 'block', maxHeight: 460 }}
            loading="eager"
          />
          <div
            className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full"
            style={{
              background:
                'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)',
              color: 'var(--color-charcoal)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            }}
          >
            <Sparkles size={11} />
            Promo · Bundle
          </div>
          <div
            className="absolute top-3 right-3 inline-flex items-center text-[11px] font-extrabold tracking-wide px-2.5 py-1.5 rounded-full"
            style={{
              background: 'white',
              color: 'var(--color-sage-dark)',
            }}
          >
            Save {savePercent}%
          </div>
        </motion.div>

        {/* Right — copy + CTA */}
        <div className="text-white">
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/70 mb-3">
            Featured Promo
          </p>
          <h2
            className="font-display font-bold leading-[1.05] mb-3 text-white"
            style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)' }}
          >
            {bundle.name}
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed mb-5"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Six Astonish bestsellers — everything you need to keep your home spotless. Save R{bundle.saving} when you grab the bundle.
          </p>

          {/* What's included */}
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-7">
            {bundle.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs sm:text-sm"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <Check size={12} style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>

          {/* Pricing + CTA */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <div className="flex items-baseline gap-3">
              <span
                className="font-display font-extrabold text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1 }}
              >
                R{bundle.price}
              </span>
              <span
                className="font-medium text-base"
                style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'line-through' }}
              >
                R{bundle.originalPrice}
              </span>
            </div>

            <MagneticButton
              onClick={handleAdd}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm"
              style={{
                background: added ? 'var(--color-charcoal)' : 'white',
                color: added ? 'white' : 'var(--color-sage)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
                transition: 'background 0.25s, color 0.25s',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check size={15} /> Added to cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <ShoppingBag size={15} /> Add Bundle to Cart <ArrowRight size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
