import { z } from "zod";
import { productTypesEnum } from "~/server/db/schema";
import { EditFileSchema } from "./file";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

export const ProductSchema = z.object({
    name: z.string({
        message: "Название продукта не может быть пустым"
    }).min(1, "Название продукта должно быть не короче 1 символа").max(255, "Название продукта должно быть не более 255 символов"),
    description: z.string({
        message: "Описание продукта не может быть пустым"
    }).min(1, "Описание продукта должно быть не короче 1 символа"),
    type: z.enum(productTypesEnum.enumValues),
    category: z.string({
        message: "Категория продукта не может быть пустой"
    }).min(1, "Категория продукта должна быть не короче 1 символа").max(255, "Категория продукта должна быть не более 255 символов"),
    priceFor1: z.coerce.number(),
    priceFor4: z.coerce.number(),
    priceFor8: z.coerce.number(),
    images: z.array(EditFileSchema),
})

export type Product = inferProcedureOutput<AppRouter["product"]["getAll"]>[number];