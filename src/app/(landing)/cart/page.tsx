import { api } from "~/trpc/server";
import CartList from "./cart-list";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";


export default async function CartPage() {
    const products = await api.product.getAll({});

    if (!products) {
        notFound();
    }

    return (
        <CartList products={products}/>
    )
}