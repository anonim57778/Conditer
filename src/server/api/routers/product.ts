import { ProductSchema } from "~/lib/shared/types/product";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { createCaller } from "../root";
import { products } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { IdSchema } from "~/lib/shared/types/utils";
import { z } from "zod";


export const productRouter = createTRPCRouter({
    create: publicProcedure
        .input(ProductSchema)
        .mutation(async ({ input, ctx }) => {
            const imageIds: string[] = [];
            if (input.images) {
              const caller = createCaller(ctx);
              await Promise.all(input.images.map(async (image) => {
                const id = await caller.file.create({
                    ...image,
                    b64: image.b64!,
                });
                imageIds.push(id.id);
              }))
            }
            await ctx.db.insert(products).values({
                ...input,
                imageIds,
            })
        }),
    getAll: publicProcedure
        .input(z.object({
            type: z.enum(["DESSERT", "GIFT"]).optional(),
            category: z.string().optional(),
        }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.products.findMany({
                where: and(
                    eq(products.isDeleted, false),
                    input.type ? eq(products.type, input.type) : undefined,
                    input.category ? eq(products.category, input.category) : undefined
                )
            })
        }),
    getById: publicProcedure
        .input(IdSchema)
        .query(async ({ input, ctx }) => {
            return await ctx.db.query.products.findFirst({
                where: and(
                    eq(products.id, input.id),
                    eq(products.isDeleted, false),
                ),
            })
        }),
    delete: publicProcedure
        .input(IdSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.db.update(products).set({
                isDeleted: true,
            }).where(eq(products.id, input.id))
        })
})