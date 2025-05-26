"use client";
import { Store, useStore } from "@tanstack/react-store";
import { useEffect } from "react";


export type ProductCart = {
    id: string;
    quantity: number;
}

const store = new Store({
    cart: [] as ProductCart[],
})

export function useCartStore() {
    const cartProducts = useStore(store, (store) => store.cart);

    function getLocalStorageProducts() {
        const localStoregeProducts = localStorage.getItem("cart");
        return JSON.parse(localStoregeProducts ?? "[]") as ProductCart[];
    };

    useEffect(() => {
        store.setState(() => ({
            cart: getLocalStorageProducts(),
        }))
    }, []);

    useEffect(() => {
        const cartProductsIds = cartProducts.map((product) => product.id).join(",");
        const localeStorageIds = getLocalStorageProducts().map((product) => product.id).join(",");

        if (cartProductsIds !== localeStorageIds) {
            localStorage.setItem("cart", JSON.stringify(cartProducts));
        }
    }, [cartProducts])

    return {
        cartProducts,
        addToCart: (id: string, quantity: number) => {
            if (quantity == 0) {
                store.setState((state) => ({
                    cart: state.cart.filter((product) => product.id !== id),
                }));
            } else {
                if (!cartProducts.find((product) => product.id === id)) {
                    store.setState(() => ({
                        cart: [...cartProducts, { id: id, quantity: quantity }],
                    }));
                    return;
                }

                store.setState((state) => ({
                    cart: state.cart.map((product) =>
                        product.id === id ? { ...product, quantity: quantity } : product
                    ),
                }))
            }
        }
    }
}