"use client";

import { Store, useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";

export type CartProduct = { id: string; quantity: number };

const store = new Store({
  cartProducts: [] as CartProduct[],
});

export function useCartStore() {
  const cartProducts = useStore(store, (s) => s.cartProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем корзину из localStorage только на клиенте
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cartProducts") ?? "[]") as CartProduct[];
      store.setState(() => ({ cartProducts: saved }));
    } catch {
      store.setState(() => ({ cartProducts: [] }));
    }
    setIsLoaded(true);
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts, isLoaded]);

  return {
    cartProducts,
    isLoaded,
    addToCart: (id: string, quantity: number) => {
      store.setState((state) => {
        const current = state.cartProducts;

        if (quantity === 0) {
          return { cartProducts: current.filter((p) => p.id !== id) };
        }

        if (!current.find((p) => p.id === id)) {
          return { cartProducts: [...current, { id, quantity }] };
        }

        return {
          cartProducts: current.map((p) =>
            p.id === id ? { ...p, quantity } : p
          ),
        };
      });
    },
    clearCart: () => {
      store.setState(() => ({ cartProducts: [] }));
    },
  };
}
