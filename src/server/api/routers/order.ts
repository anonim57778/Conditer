import { OrderSchema } from "~/lib/shared/types/order";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { orderProducts, orders, products } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { yookassa } from "~/server/yookassa";


export const orderRouter = createTRPCRouter({
    create: publicProcedure
        .input(OrderSchema)
        .mutation(async ({ ctx, input }) => {
            const productsDb = await ctx.db.query.products.findMany({
                where: inArray(
                    products.id,
                    input.products.map((product) => product.productId)
                )    
            });

            const productQuantity = productsDb
                .map((p) => ({
                ...p,
                quantity:
                    input.products.find((pp) => pp.productId === p.id)?.quantity ?? 0,
                }))
                .filter((p) => p.quantity > 0);

            const totalPrice = productQuantity.reduce(
                (acc, p) =>
                acc + p.quantity === 4
                    ? p.priceFor4
                    : p.quantity === 8
                    ? p.priceFor8
                    : p.priceFor1 * p.quantity,
                0,
            );

            const payment = await yookassa.createPayment({
                amount: totalPrice,
                redirectPath: "/",
            });

            await ctx.db.transaction(async (trx) => {
                const [order] = await trx
                .insert(orders)
                .values({
                    ...input,
                    paymentId: payment.yookassaPayment.id,
                    totalPrice,
                })
                .returning();

                await trx.insert(orderProducts).values(
                    productQuantity.map((p) => ({
                        orderId: order!.id,
                        productId: p.id,
                        quantity: p.quantity,
                    })),
                );
            });

            return payment.yookassaPayment.confirmation.confirmation_url!;
        }),
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            const ordersDb = await ctx.db.query.orders.findMany({
                where: eq(orders.isDeleted, false),
                with: {
                    products: {
                        with: {
                            product: true,
                        }
                    }
                }
            });

            return ordersDb;
        })
})