import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  hydrate: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  hydrated: false,
  hydrate: () => {
    if (typeof window !== 'undefined' && !get().hydrated) {
      try {
        const stored = localStorage.getItem('cart-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          set({ items: parsed.items || [], hydrated: true });
        } else {
          set({ hydrated: true });
        }
      } catch (e) {
        set({ hydrated: true });
      }
    }
  },
  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const newItems = items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({ items: newItems });
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }));
      }
    } else {
      const newItems = [...items, { product, quantity }];
      set({ items: newItems });
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }));
      }
    }
  },
  removeItem: (productId) => {
    const newItems = get().items.filter(item => item.product.id !== productId);
    set({ items: newItems });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }));
    }
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
    } else {
      const newItems = get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      set({ items: newItems });
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart-storage', JSON.stringify({ items: newItems }));
      }
    }
  },
  clearCart: () => {
    set({ items: [] });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart-storage', JSON.stringify({ items: [] }));
    }
  },
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
