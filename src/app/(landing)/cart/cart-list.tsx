"use client";
import { X } from "lucide-react";
import { useCartStore } from "~/app/store/cart-store";
import S3Image from "~/components/ui/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { type Product } from "~/lib/shared/types/product";
import CreateOrder from "./create-order";


export default function CartList({
    products
} : {
    products: Product[]
}) {

    const {cartProducts, addToCart } = useCartStore();

    const cp = cartProducts
        .filter((p) => !!products.find((cp) => cp.id === p.id))
        .map((p) => ({
        ...p,
        ...products.find((pr) => pr.id === p.id)!,
    }));

    return (
        <div className="container flex flex-col gap-y-12 py-12 lg:py-16">
            <h2 className=" text-5xl font-normal text-center lg:text-left">Ваша корзина</h2>

            <div className="flex justify-between flex-col gap-12 lg:gap-16 lg:flex-row">
                <div className="grow">
                    <Table>
                        <TableHeader className="text-nowrap border-b border-primary">
                            <TableHead className="text-primary">Продукт</TableHead>
                            <TableHead className="text-primary">Название</TableHead>
                            <TableHead className="text-primary">Кол-во</TableHead>
                            <TableHead className="text-primary">Цена</TableHead>
                            <TableHead className="text-primary">Удалить</TableHead>
                        </TableHeader>
                        <TableBody>
                            {cp.map((p, index) => (
                                <TableRow key={index} className="border-b border-primary">
                                    <TableCell>
                                        <S3Image
                                            src={p.imageIds[0] ?? ""}
                                            width={100}
                                            height={100}
                                            alt="Изображение"
                                            className="object-cover size-16 hidden lg:block"
                                        />
                                    </TableCell>
                                    <TableCell className="text-primary">{p.name}</TableCell>
                                    <TableCell className="text-primary">{p.quantity}</TableCell>
                                    <TableCell className="text-primary">{p.quantity == 1 ? p.priceFor1 : p.quantity == 4 ? p.priceFor4 : p.priceFor8}</TableCell>
                                    <TableCell>
                                        <button onClick={() => addToCart(p.id, 0)}>
                                            <X className="text-primary size-6"/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="space-y-6 w-full lg:w-[360px]">
                    <div>
                        <h1 className="text-base lg:text-xl font-medium py-2 lg:py-4 border-b border-b-primary">Товары</h1>
                        <div className="border-b border-b-primary">
                            {cp.map((p, index) => (
                                <div key={index} className="flex justify-between items-center py-2 lg:py-4">
                                    <h1 className="font-medium text-base lg:text-xl">{p.name}</h1>
                                    <h1 className="font-medium text-base lg:text-xl">x{p.quantity}</h1>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center py-2 lg:py-4">
                            <h1 className="font-medium text-base lg:text-xl">Сумма</h1>
                            <h1 className="font-bold text-base lg:text-xl">{cp.reduce(
                                (acc, p) =>
                                    acc +
                                    (p.quantity === 4
                                    ? p.priceFor4
                                    : p.quantity === 8
                                        ? p.priceFor8
                                        : p.priceFor1),
                                0,
                                )}₽
                            </h1>   
                        </div>
                    </div>
                    <CreateOrder products={products}/>
                </div>

            </div>
        </div>
    )
}