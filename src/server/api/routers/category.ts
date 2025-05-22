import { CategorySchema } from "~/lib/shared/types/category";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { categories } from "~/server/db/schema";
import { IdSchema } from "~/lib/shared/types/utils";
import { and, eq } from "drizzle-orm";


export const categoryRouter = createTRPCRouter({
    create: publicProcedure
        .input(CategorySchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.db.insert(categories).values({
                ...input
            })
        }),
    getAll: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.query.categories.findMany({
                where: eq(categories.isDeleted, false)
            })
        }),
    getById: publicProcedure
        .input(IdSchema)
        .query(async ({ ctx, input }) => {
            const category = await ctx.db.query.categories.findFirst({
                where: and(
                    eq(categories.id, input.id),
                    eq(categories.isDeleted, false)
                )
            })

            if (!category) {
                throw new Error("Category not found")
            }

            return category;
        }),
    update: publicProcedure
        .input(CategorySchema.merge(IdSchema))
        .mutation(async ({ ctx, input }) => {
            const category = await ctx.db.query.categories.findFirst({
                where: eq(categories.id, input.id)
            })

            if (!category) {
                throw new Error("Category not found")
            }

            await ctx.db.update(categories).set(input).where(eq(categories.id, input.id))
        }),
    delete: publicProcedure
        .input(IdSchema)
        .mutation(async ({ ctx, input }) => {
            const category = await ctx.db.query.categories.findFirst({
                where: eq(categories.id, input.id)
            })

            if (!category) {
                throw new Error("Category not found")
            }

            await ctx.db.update(categories).set({ isDeleted: true }).where(eq(categories.id, input.id))
        }),
})