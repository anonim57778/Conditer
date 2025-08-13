import { ChevronRight } from "lucide-react";
import Link from "next/link";
import S3Image from "~/components/ui/image";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";
import Carousel from "./carousel";


export default async function ProductsList() {
    const products = await api.product.getAll({});

    if (products.length == 0) {
        return null;
    }

    return (
        <div>
            <div className="container space-y-6 py-12 lg:py-16">
                <div className="flex justify-between items-center">
                    <h2 className="font-normal text-2xl lg:text-5xl">Десерты</h2>

                    <Link href={"/products/dessert"} className="flex items-center gap-2">
                        <h1 className="text-base lg:text-xl">Смотреть все</h1>
                        <ChevronRight className="size-6 text-primary"/>
                    </Link>
                </div>

                {products.map((product, index) => (
                    <Link key={index} href={`/product/${product.id}`} className={cn("flex gap-16 items-center justify-between flex-col lg:flex-row", index % 2 != 0 && "lg:flex-row-reverse")}>
                        <S3Image
                            src={product.imageIds[0] ?? ""}
                            width={500}
                            height={500}
                            alt="Изображение"
                            className="size-64 lg:size-[500px] object-cover"
                        />

                        <div className="space-y-6 w-full">
                            <div className="pb-10 border-b border-b-primary space-y-2">
                                <h1 className="text-xl lg:text-5xl font-medium">0{index + 1}</h1>
                                <h2 className="text-2xl lg:text-[56px] font-normal">{product.name}</h2>
                            </div>

                            <p className="font-normal text-xl lg:text-2xl">{product.description}</p>

                            <h1 className="font-bold text-xl lg:text-5xl">{product.priceFor1}₽</h1>
                        </div>
                    </Link>
                ))}
            </div>

            <Carousel/>
        </div>
    )
}