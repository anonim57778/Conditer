"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { useCartStore } from "~/app/store/cart-store";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { OrderSchema } from "~/lib/shared/types/order";
import { type Product } from "~/lib/shared/types/product";
import { api } from "~/trpc/react";

export default function CreateOrder({
    products
} : {
    products: Product[]
}) {
    const form = useForm({
        resolver: zodResolver(OrderSchema),
        defaultValues: {} as z.infer<typeof OrderSchema>
    })

    const router = useRouter();

    const {cartProducts } = useCartStore();

    const cp = cartProducts.filter((c) => products.find((p) => p.id === c.id));

    const createOrderMutation = api.order.create.useMutation({
        onSuccess(url) {
            router.push(url);
        },
        onError(error) {
            toast.error(error.message || "Не удалось создать заказ");
        }
    })

    const onSubmit = (data: z.infer<typeof OrderSchema>) => {
        createOrderMutation.mutate({
            ...data,
            products: cp.map((p) => ({
                productId: p.id,
                quantity: p.quantity,
            }))
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    Оформить заказ
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Оформить заказ</DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Имя" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Почта" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Адрес" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Комментарий к заказу" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={createOrderMutation.isPending}
                            className="w-full"
                        >
                            Оформить заказ
                        </Button>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}