import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import ProductImages from "./images";
import SelectAmount from "./select-amount";

export const dynamic = "force-dynamic";

export default async function ProductPage({
    params
} : {
    params: Promise<{
        id: string
    }>
}) {
    const { id } = await params;

    const product = await api.product.getById({ id });

    if (!product) {
        notFound();
    }

    return (
        <div className="overflow-hidden">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 lg:py-16">
                <ProductImages images={product.imageIds} />

                <div className="flex flex-col gap-9">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-normal text-2xl lg:text-5xl">{product.name}</h2>

                        <p className="font-normal text-xl">{product.description}</p>
                    </div>

                    <SelectAmount product={product} />
                </div>
            </div>
        </div>
    )
}