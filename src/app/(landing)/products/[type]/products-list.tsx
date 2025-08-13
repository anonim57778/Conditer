"use client";
import { productTypeToString } from "~/lib/enums";
import { type Category } from "~/lib/shared/types/category";
import { type Product } from "~/lib/shared/types/product";
import { type ProductEnum } from "~/server/db/schema";
import Filters from "./filter";
import Link from "next/link";
import S3Image from "~/components/ui/image";


export default function ProductList({
    type,
    products,
    categories,
} : {
    type: ProductEnum,
    products: Product[],
    categories: Category[]
}) {
    return (
        <div className="container space-y-6 lg:space-y-12 py-12 lg:py-16">
            <div className="flex justify-between items-center gap-4 flex-col lg:flex-row">
                <h2 className="font-normal text-2xl lg:text-5xl">{productTypeToString(type)}</h2>

                <Filters categories={categories}/>
            </div>

            {products.length == 0 ? (
                <div className="py-20 flex items-center justify-center">
                    <h1 className="text-primary text-center text-3xl lg:text-5xl">Продукты не найдены</h1>
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <Link key={index} href={`/product/${product.id}`} className="flex flex-col items-center">
                            <S3Image
                                src={product.imageIds[0] ?? ""}
                                width={500}
                                height={500}
                                alt="Изображение"
                                className="size-64 object-cover"
                            />

                            <div className="flex flex-col gap-y-4 w-full">
                                <div className="pb-4 border-b border-b-primary">
                                    <h1 className="font-medium text-xl">0{index + 1}</h1>
                                    <h2 className="font-normal text-2xl">{product.name}</h2>
                                </div>

                                <p className="font-normal text-xl max-w-[569px]">{product.description}</p>

                                <h1 className="font-bold text-xl">{product.priceFor1}₽</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}