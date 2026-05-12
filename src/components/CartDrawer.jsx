import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, MessageCircle, CreditCard, CheckCircle2, ShoppingBag, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart, buildCheckoutMessage } from '../lib/CartContext';
import { payWithCard, chargeOnServer, preloadYocoSdk } from '../lib/yoco';
import MagneticButton from './MagneticButton';

const SOPHIA_WHATSAPP = '27833999974';

export default function CartDrawer() {
  const { items, isOpen, count, subtotal, updateQty, removeItem, clear, closeCart, openCart } = useCart();
  const [cardStatus, setCardStatus] = useState({ state: 'idle', message: '' });

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Preload the Yoco SDK in the background so the card popup appears
      // instantly when the user clicks 'Pay with Card'.
      preloadYocoSdk();
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  const handleWhatsAppCheckout = () => {
    if (!items.length) return;
    const msg = buildCheckoutMessage(items, subtotal);
    window.open(`https://wa.me/${SOPHIA_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCardCheckout = async () => {
    if (!items.length || cardStatus.state === 'processing' || cardStatus.state === 'opening') return;

    // Show the loading state on the button (cart stays open) while we make
    // sure the Yoco SDK is ready, so the user never sees a blank moment.
    setCardStatus({ state: 'opening', message: '' });
    await preloadYocoSdk();

    const amountInCents = Math.round(subtotal * 100);
    const desc = `Sophia's Clean order — ${items.length} item${items.length === 1 ? '' : 's'}`;

    // Close the cart and open the Yoco popup at the same instant. The SDK is
    // already loaded so showPopup injects its overlay synchronously, meaning
    // the user perceives one smooth swap: cart slides out, card form fades in.
    closeCart();

    try {
      const result = await payWithCard({ amountInCents, description: desc });

      if (!result) {
        // User cancelled the popup
        setCardStatus({ state: 'idle', message: '' });
        openCart();
        return;
      }
      if (result.error) {
        setCardStatus({ state: 'error', message: result.error.message || 'Card payment failed.' });
        openCart();
        return;
      }

      setCardStatus({ state: 'processing', message: 'Confirming payment…' });
      openCart();
      await chargeOnServer({ token: result.id, amountInCents });
      setCardStatus({ state: 'success', message: 'Payment received. We\'ll be in touch with delivery details.' });
      clear();
    } catch (e) {
      setCardStatus({ state: 'error', message: e.message || 'We couldn\'t complete the card payment. Try WhatsApp instead.' });
      openCart();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(26,8,18,0.45)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[61] flex flex-col w-full sm:w-[440px] max-w-full"
            style={{ background: 'white', boxShadow: '-30px 0 80px rgba(0,0,0,0.18)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 30 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <header
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: '1px solid var(--color-cream-border)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(194,24,91,0.1)' }}
                >
                  <ShoppingBag size={16} style={{ color: 'var(--color-sage)' }} />
                </div>
                <div>
                  <h2
                    className="font-display font-bold text-lg leading-tight"
                    style={{ color: 'var(--color-charcoal)' }}
                  >
                    Your Cart
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(26,8,18,0.5)' }}>
                    {count === 0 ? 'No items yet' : `${count} ${count === 1 ? 'item' : 'items'}`}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-cream-border)',
                  color: 'var(--color-charcoal)',
                  cursor: 'pointer',
                }}
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </header>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <EmptyState onClose={closeCart} />
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <CartLine
                      key={item.name}
                      item={item}
                      onInc={() => updateQty(item.name, item.qty + 1)}
                      onDec={() => updateQty(item.name, item.qty - 1)}
                      onRemove={() => removeItem(item.name)}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer
                className="px-6 py-5 flex-shrink-0"
                style={{
                  borderTop: '1px solid var(--color-cream-border)',
                  background: 'var(--color-cream-warm)',
                }}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color: 'rgba(26,8,18,0.6)' }}>
                    Subtotal
                  </span>
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: '1.5rem', color: 'var(--color-charcoal)' }}
                  >
                    R{subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs mb-4" style={{ color: 'rgba(26,8,18,0.5)' }}>
                  Free delivery in Cape Town for orders over R1000.
                </p>

                <CheckoutStatus status={cardStatus} onReset={() => setCardStatus({ state: 'idle', message: '' })} />

                {cardStatus.state !== 'success' && (
                  <div className="space-y-2.5">
                    <MagneticButton
                      onClick={handleCardCheckout}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white font-bold text-sm"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-dark) 100%)',
                        boxShadow: '0 8px 24px rgba(194,24,91,0.3)',
                        opacity: cardStatus.state === 'opening' || cardStatus.state === 'processing' ? 0.7 : 1,
                      }}
                      disabled={cardStatus.state === 'opening' || cardStatus.state === 'processing'}
                    >
                      {cardStatus.state === 'opening' || cardStatus.state === 'processing' ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          {cardStatus.state === 'processing' ? 'Confirming…' : 'Opening card…'}
                        </>
                      ) : (
                        <>
                          <CreditCard size={15} />
                          Pay with Card
                        </>
                      )}
                    </MagneticButton>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm"
                      style={{
                        background: 'white',
                        border: '1.5px solid rgba(37, 211, 102, 0.4)',
                        color: '#1faa55',
                        cursor: 'pointer',
                      }}
                    >
                      <MessageCircle size={15} />
                      Order via WhatsApp
                    </button>
                  </div>
                )}

                <button
                  onClick={clear}
                  className="w-full mt-3 text-xs font-semibold tracking-wide"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(26,8,18,0.5)',
                    cursor: 'pointer',
                  }}
                >
                  Clear cart
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartLine({ item, onInc, onDec, onRemove }) {
  const lineTotal = parseFloat(item.price) * item.qty;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      className="flex gap-4 p-3 rounded-xl"
      style={{ background: 'white', border: '1px solid var(--color-cream-border)' }}
    >
      {/* Thumb */}
      <div
        className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #fdf0f7 0%, #ffffff 100%)' }}
      >
        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p
            className="text-xs font-medium leading-snug line-clamp-2 mb-1"
            style={{ color: 'var(--color-charcoal)' }}
          >
            {item.name}
          </p>
          <p className="text-[11px]" style={{ color: 'rgba(26,8,18,0.5)' }}>
            R{parseFloat(item.price).toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Qty stepper */}
          <div
            className="flex items-center gap-2 rounded-full px-1 py-1"
            style={{ background: 'var(--color-cream-warm)' }}
          >
            <button
              onClick={onDec}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'white',
                border: '1px solid var(--color-cream-border)',
                color: 'var(--color-charcoal)',
                cursor: 'pointer',
              }}
              aria-label="Decrease quantity"
            >
              <Minus size={11} />
            </button>
            <span
              className="text-xs font-bold min-w-[18px] text-center"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {item.qty}
            </span>
            <button
              onClick={onInc}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white"
              style={{ background: 'var(--color-sage)', border: 'none', cursor: 'pointer' }}
              aria-label="Increase quantity"
            >
              <Plus size={11} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="font-display font-bold text-sm"
              style={{ color: 'var(--color-sage)' }}
            >
              R{lineTotal.toFixed(2)}
            </span>
            <button
              onClick={onRemove}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(26,8,18,0.4)',
                cursor: 'pointer',
              }}
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function EmptyState({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ background: 'rgba(194,24,91,0.08)' }}
      >
        <ShoppingBag size={26} style={{ color: 'var(--color-sage)' }} />
      </div>
      <h3
        className="font-display font-semibold text-lg mb-2"
        style={{ color: 'var(--color-charcoal)' }}
      >
        Your cart's empty
      </h3>
      <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'rgba(26,8,18,0.55)' }}>
        Add a few Astonish products and check out with card or WhatsApp.
      </p>
      <button
        onClick={onClose}
        className="text-sm font-semibold px-5 py-2.5 rounded-full"
        style={{
          background: 'var(--color-sage)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Browse products
      </button>
    </div>
  );
}

function CheckoutStatus({ status, onReset }) {
  if (status.state === 'idle' || status.state === 'opening' || status.state === 'processing') {
    return null;
  }
  const isSuccess = status.state === 'success';
  return (
    <motion.div
      key={status.state}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 p-3 rounded-xl flex items-start gap-2.5"
      style={{
        background: isSuccess ? 'rgba(34,197,94,0.08)' : 'rgba(220,38,38,0.06)',
        border: `1px solid ${isSuccess ? 'rgba(34,197,94,0.25)' : 'rgba(220,38,38,0.18)'}`,
      }}
    >
      <CheckCircle2
        size={16}
        style={{
          color: isSuccess ? '#16a34a' : '#dc2626',
          flexShrink: 0,
          marginTop: 1,
        }}
      />
      <div className="flex-1">
        <p
          className="text-xs font-semibold mb-0.5"
          style={{ color: isSuccess ? '#15803d' : '#b91c1c' }}
        >
          {isSuccess ? 'Order confirmed' : 'Payment didn\'t go through'}
        </p>
        <p className="text-xs leading-snug" style={{ color: 'rgba(26,8,18,0.7)' }}>
          {status.message}
        </p>
      </div>
      {!isSuccess && (
        <button
          onClick={onReset}
          className="text-[11px] font-semibold"
          style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer' }}
        >
          Dismiss
        </button>
      )}
    </motion.div>
  );
}
