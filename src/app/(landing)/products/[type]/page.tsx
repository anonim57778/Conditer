import { type ProductEnum } from "~/server/db/schema"
import { api } from "~/trpc/server";
import ProductList from "./products-list";
import { type SearchParams } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";
import { filterParams } from "./filterParams";
import NotFound from "~/app/not-found";

const paramsCache = createSearchParamsCache(filterParams);
export default async function ProductsPage({
    params,
    searchParams,
} : {
    params: Promise<{
        type: ProductEnum
    }>,
    searchParams: SearchParams
}) {
    const type = (await params).type.toUpperCase() as ProductEnum;
    const param = paramsCache.parse(searchParams);

    if (type != "DESSERT" && type != "GIFT") {
        return <NotFound/>
    }

    const products = await api.product.getAll({
        type,
        category: param.category ?? undefined
    })

    const categories = await api.category.getAll({
        type
    });

    return (
        <ProductList products={products} categories={categories} type={type}/>
    )
}