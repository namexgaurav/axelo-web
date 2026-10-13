import { writable, derived, get } from 'svelte/store';
import type { Product, CartItem } from '../types';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase/types';
import {
  getOrCreateCart,
  fetchDbCartItems,
  addDbCartItem,
  updateDbCartItemQty,
  removeDbCartItem,
  clearDbCart
} from '$lib/cart/cart.service';

export const cartDrawerOpen = writable<boolean>(false);
export const authPromptOpen = writable<boolean>(false);
export const quickViewProduct = writable<Product | null>(null);

let activeCartId: string | null = null;

function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    set,
    update,

    /**
     * Load cart items from Supabase when user logs in
     */
    syncFromDb: async (supabase: SupabaseClient<Database, any, any>, userId: string) => {
      try {
        const cartRecord = await getOrCreateCart(supabase, userId);
        if (cartRecord) {
          activeCartId = cartRecord.id;
          const items = await fetchDbCartItems(supabase, cartRecord.id);
          set(items);
        }
      } catch (err) {
        console.error('Failed to sync cart from DB:', err);
      }
    },

    /**
     * Add item to cart with DB persistence
     */
    addItem: async (
      product: Product,
      selectedColor?: string,
      supabase?: SupabaseClient<Database, any, any>,
      userId?: string | null
    ) => {
      // If user is not authenticated, prompt to sign in per platform requirements
      if (!userId) {
        authPromptOpen.set(true);
        return;
      }

      const color = selectedColor || product.colors[0]?.name || 'Standard';

      // Optimistic update
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

      // Async DB write
      if (supabase && userId) {
        try {
          if (!activeCartId) {
            const cartRecord = await getOrCreateCart(supabase, userId);
            activeCartId = cartRecord?.id || null;
          }
          if (activeCartId) {
            await addDbCartItem(supabase, activeCartId, product.id, color, 1);
          }
        } catch (err) {
          console.error('Failed to persist cart item to DB:', err);
        }
      }
    },

    /**
     * Remove item from cart with DB persistence
     */
    removeItem: async (
      productId: string,
      selectedColor: string,
      supabase?: SupabaseClient<Database, any, any>,
      userId?: string | null
    ) => {
      update(items => items.filter(i => !(i.product.id === productId && i.selectedColor === selectedColor)));

      if (supabase && userId && activeCartId) {
        try {
          await removeDbCartItem(supabase, activeCartId, productId, selectedColor);
        } catch (err) {
          console.error('Failed to remove item from DB cart:', err);
        }
      }
    },

    /**
     * Update item quantity with DB persistence
     */
    updateQuantity: async (
      productId: string,
      selectedColor: string,
      delta: number,
      supabase?: SupabaseClient<Database, any, any>,
      userId?: string | null
    ) => {
      let targetNewQty = 0;
      update(items => {
        return items
          .map(i => {
            if (i.product.id === productId && i.selectedColor === selectedColor) {
              const newQty = i.quantity + delta;
              targetNewQty = newQty;
              return newQty > 0 ? { ...i, quantity: newQty } : null;
            }
            return i;
          })
          .filter(Boolean) as CartItem[];
      });

      if (supabase && userId && activeCartId) {
        try {
          await updateDbCartItemQty(supabase, activeCartId, productId, selectedColor, targetNewQty);
        } catch (err) {
          console.error('Failed to update item quantity in DB cart:', err);
        }
      }
    },

    /**
     * Clear all items from cart
     */
    clear: async (supabase?: SupabaseClient<Database, any, any>, userId?: string | null) => {
      set([]);
      if (supabase && userId && activeCartId) {
        try {
          await clearDbCart(supabase, activeCartId);
        } catch (err) {
          console.error('Failed to clear DB cart:', err);
        }
      }
    }
  };
}

export const cart = createCartStore();

export const cartCount = derived(cart, $cart => {
  return $cart.reduce((total, item) => total + item.quantity, 0);
});

export const cartSubtotal = derived(cart, $cart => {
  return $cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
});
