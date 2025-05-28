import { type inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { type AppRouter } from "~/server/api/root";


export const OrderSchema = z.object({
    name: z.string({
        required_error: "Необходимо указать имя",
        invalid_type_error: "Имя должно быть строкой",
    }).min(1, "Необходимо указать имя").max(255, "Имя должно быть длиной от 1 до 255 символов"),
    email: z.string({
        required_error: "Необходимо указать email",
        invalid_type_error: "Email должен быть строкой",
    }).min(1, "Необходимо указать email").max(255, "Email должен быть длиной от 1 до 255 символов").email(),
    address: z.string({
        required_error: "Необходимо указать адрес",
        invalid_type_error: "Адрес должен быть строкой",
    }).min(1, "Необходимо указать адрес").max(255, "Адрес должен быть длиной от 1 до 255 символов"),
    comment: z.string({
        required_error: "Необходимо указать комментарий",
        invalid_type_error: "Комментарий должен быть строкой",
    }).min(1, "Необходимо указать комментарий"),
    products: z.array(z.object({
        productId: z.string({
            required_error: "Необходимо указать id товара",
            invalid_type_error: "Id товара должен быть строкой",
        }).min(1, "Необходимо указать id товара").max(255, "Id товара должен быть длиной от 1 до 255 символов"),
        quantity: z.number({
            required_error: "Необходимо указать количество",
            invalid_type_error: "Количество должно быть числом",
        }).min(1, "Необходимо указать количество").max(100, "Количество должно быть от 1 до 100"),
    }))
});

export type Order = inferProcedureOutput<AppRouter["order"]["getAll"]>[number];