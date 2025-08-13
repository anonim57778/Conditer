import { ProductSchema } from "~/lib/shared/types/product";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createCaller } from "../root";
import { products } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { IdSchema } from "~/lib/shared/types/utils";
import { z } from "zod";


export const productRouter = createTRPCRouter({
    create: protectedProcedure
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
    update: protectedProcedure
        .input(ProductSchema.merge(IdSchema))
        .mutation(async ({ ctx, input }) => {
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

            const product = await ctx.db.query.products.findFirst({
                where: eq(products.id, input.id)
            })

            if (!product) {
                throw new Error("Product not found")
            }

            await ctx.db.update(products).set({
                ...input,
                imageIds,
            }).where(eq(products.id, input.id))
        }),
    getAll: publicProcedure
        .input(z.object({
            type: z.enum(["DESSERT", "GIFT"]).optional(),
            category: z.string().optional(),
        }))
        .query(async ({ ctx, input }) => {
            const productsDb = await ctx.db.query.products.findMany({
                where: and(
                    eq(products.isDeleted, false),
                    input?.type ? eq(products.type, input.type) : undefined,
                    input?.category ? eq(products.category, input.category) : undefined
                )
            })

            return productsDb;
        }),
    getById: publicProcedure
        .input(IdSchema)
        .query(async ({ input, ctx }) => {
            
            const productDb = await ctx.db.query.products.findFirst({
                where: and(
                    eq(products.id, input.id),
                    eq(products.isDeleted, false),
                ),
            })

            if (!productDb) {
                throw new Error("Product not found");
            }
            
            return productDb;
        }),
    delete: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ input, ctx }) => {

            const productDb = await ctx.db.query.products.findFirst({
                where: and(
                    eq(products.id, input.id),
                    eq(products.isDeleted, false)
                )
            })

            if (!productDb) {
                throw new Error("Product not found")
            }

            await ctx.db.update(products).set({
                isDeleted: true,
            }).where(eq(products.id, input.id))
        })
})