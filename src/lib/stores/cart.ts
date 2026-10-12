import { writable, derived } from 'svelte/store';
import type { Product, CartItem } from '../types';

function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>([
    // Start with 1 default item in cart for realistic preview
    {
      product: {
        id: 'studio-desk-mat-pro',
        name: 'AXELO Studio Desk Mat Pro',
        category: 'desk-mats',
        categoryLabel: 'Desk Mat',
        tagline: 'Dual-surface precision mat with magnetic cable anchor',
        description: 'Designed as the foundational layer for high-focus desks.',
        price: 68,
        rating: 4.9,
        ratingCount: 142,
        colors: [
          { name: 'Onyx Black', hex: '#1C1C1E', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80' }
        ],
        primaryImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
        specs: [],
        details: []
      },
      selectedColor: 'Onyx Black',
      quantity: 1
    }
  ]);

  return {
    subscribe,
    addItem: (product: Product, selectedColor?: string) => {
      const color = selectedColor || product.colors[0]?.name || 'Standard';
      update(items => {
        const existing = items.find(i => i.product.id === product.id && i.selectedColor === color);
        if (existing) {
          return items.map(i =>
            i.product.id === product.id && i.selectedColor === color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...items, { product, selectedColor: color, quantity: 1 }];
      });
      cartDrawerOpen.set(true);
    },
    removeItem: (productId: string, selectedColor: string) => {
      update(items => items.filter(i => !(i.product.id === productId && i.selectedColor === selectedColor)));
    },
    updateQuantity: (productId: string, selectedColor: string, delta: number) => {
      update(items => {
        return items
          .map(i => {
            if (i.product.id === productId && i.selectedColor === selectedColor) {
              const newQty = i.quantity + delta;
              return newQty > 0 ? { ...i, quantity: newQty } : null;
            }
            return i;
          })
          .filter(Boolean) as CartItem[];
      });
    },
    clear: () => set([])
  };
}

export const cart = createCartStore();
export const cartDrawerOpen = writable<boolean>(false);
export const quickViewProduct = writable<Product | null>(null);

export const cartCount = derived(cart, $cart => {
  return $cart.reduce((total, item) => total + item.quantity, 0);
});

export const cartSubtotal = derived(cart, $cart => {
  return $cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
});
