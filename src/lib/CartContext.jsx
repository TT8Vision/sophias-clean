import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'sophias-clean-cart-v1';

function loadFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadFromStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / privacy errors
    }
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          qty: 1,
        },
      ];
    });
  };

  const removeItem = (name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const updateQty = (name, qty) => {
    if (qty < 1) {
      removeItem(name);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, qty } : i)),
    );
  };

  const clear = () => setItems([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((p) => !p);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const item of items) {
      c += item.qty;
      s += parseFloat(item.price) * item.qty;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value = {
    items,
    isOpen,
    count,
    subtotal,
    addItem,
    removeItem,
    updateQty,
    clear,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}

export function buildCheckoutMessage(items, subtotal) {
  if (!items.length) return '';
  const lines = items.map(
    (i) => `• ${i.qty}× ${i.name} — R${(parseFloat(i.price) * i.qty).toFixed(2)}`,
  );
  return [
    "Hi Sophia's Clean! I'd like to order the following Astonish products:",
    '',
    ...lines,
    '',
    `Subtotal: R${subtotal.toFixed(2)}`,
    '',
    'Please arrange delivery in Cape Town. Thanks!',
  ].join('\n');
}
