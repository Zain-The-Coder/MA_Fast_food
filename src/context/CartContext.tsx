"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { CartItem, CartContextType } from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ma_fast_food_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ma_fast_food_cart", JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (item: MenuItem, quantity = 1, options?: string[]) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.menuItem.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { menuItem: item, quantity, selectedOptions: options }];
    });
    // Brief toast or open drawer
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((i) => {
          if (i.menuItem.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);
  const deliveryFee = subtotal > 0 && subtotal < siteConfig.delivery.freeDeliveryThreshold
    ? siteConfig.delivery.deliveryFee
    : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
