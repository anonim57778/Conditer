"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export default function LoginPage() {


  const formSchema = z.object({
    email: z
      .string({
        required_error: "Email обязателен",
        invalid_type_error: "Email должен быть строкой",
      })
      .email({
        message: "Некорректный email",
      }),
    password: z
      .string({
        required_error: "Пароль обязателен",
        invalid_type_error: "Пароль должен быть строкой",
      })
      .min(6, "Минимальная длина пароля 6 символов"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.status == 200) {
        router.push("/admin/categories");
        router.refresh();
      } else {
          toast.error("Неверный логин или пароль");
      }
    } catch (error) {
      console.log(error);
      toast.error("Неверный логин или пароль");
    }
  };

  return (
    <div className="h-screen flex w-full items-center justify-center p-6 lg:p-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 h-full bg-gradient-to-br from-customGradientCardStart/10 to-customGradientCardEnd/10 lg:h-[400px] min-w-80 rounded-xl border border-white/20 p-6"
        >
          <h1 className="font-semibold text-center border-b border-b-white/20 pb-2 text-3xl">Вход</h1>

          <div className="grow flex flex-col justify-between">
            <div className="space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input className="py-3" type="text" {...field} placeholder="Email" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input className="py-3" {...field} placeholder="Пароль" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <Button className="w-full py-2">Войти</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
