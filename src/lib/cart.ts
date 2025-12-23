'use client';

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
}

const CART_STORAGE_KEY = 'ty-packaging-cart';

export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return {
      items: [],
      subtotal: 0,
      vatRate: 17,
      vatAmount: 0,
      total: 0,
    };
  }

  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) {
    return {
      items: [],
      subtotal: 0,
      vatRate: 17,
      vatAmount: 0,
      total: 0,
    };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {
      items: [],
      subtotal: 0,
      vatRate: 17,
      vatAmount: 0,
      total: 0,
    };
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(item: CartItem): Cart {
  const cart = getCart();
  const existingIndex = cart.items.findIndex(
    (i) => i.productId === item.productId && i.variantId === item.variantId
  );

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.vatAmount = cart.subtotal * (cart.vatRate / 100);
  cart.total = cart.subtotal + cart.vatAmount;

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string, variantId?: string): Cart {
  const cart = getCart();
  cart.items = cart.items.filter(
    (item) => !(item.productId === productId && item.variantId === variantId)
  );

  cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.vatAmount = cart.subtotal * (cart.vatRate / 100);
  cart.total = cart.subtotal + cart.vatAmount;

  saveCart(cart);
  return cart;
}

export function updateCartItemQuantity(
  productId: string,
  quantity: number,
  variantId?: string
): Cart {
  const cart = getCart();
  const item = cart.items.find(
    (i) => i.productId === productId && i.variantId === variantId
  );

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId, variantId);
    }
    item.quantity = quantity;
  }

  cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.vatAmount = cart.subtotal * (cart.vatRate / 100);
  cart.total = cart.subtotal + cart.vatAmount;

  saveCart(cart);
  return cart;
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
}

