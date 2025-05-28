import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { type AppRouter } from "~/server/api/root";
import { productTypesEnum } from "~/server/db/schema";

export const CategorySchema = z.object({
    name: z.string({
        message: "Неверное название категории"
    }).min(1, "Название категории должно быть не короче 1 символа").max(255, "Название категории должно быть не больше 255 символов"),
    type: z.enum(productTypesEnum.enumValues)
})

export type Category = inferProcedureOutput<AppRouter["category"]["getAll"]>[number];