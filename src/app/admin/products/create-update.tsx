"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";
import { api } from "~/trpc/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { productTypesEnum } from "~/server/db/schema";
import { productTypeToString } from "~/lib/enums";
import { ProductSchema, type Product } from "~/lib/shared/types/product";
import S3Image from "~/components/ui/image";
import { Skeleton } from "~/components/ui/skeleton";
import { ConvertFiles } from "~/lib/client/file";
import { Trash2 } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "sonner";

export default function CreateUpdateProduct({
	product,
}: {
	product?: Product
}) {
	const [open, setOpen] = useState(false);

	const {data: categories} = api.category.getAll.useQuery({});

	const form = useForm({
		resolver: zodResolver(ProductSchema),
		defaultValues: product ? product : {}  as z.infer<typeof ProductSchema>
	});


	const createMutation = api.product.create.useMutation({
		onSuccess() {
			toast.success("Продукт успешно создан");
			form.reset();
			setOpen(false);
		},
		onError() {
			toast.error("Продукт не создан");
		},
	});

	const updateMutation = api.product.update.useMutation({
		onSuccess() {
			toast.success("Продукт успешно обновлен");
			form.reset();
			setOpen(false);
		},
		onError() {
			toast.error("Продукт не обновлен");
		},
	});

	const imagesArray = useFieldArray({
        control: form.control,
        name: "images",
    });

	const onSubmit = (data: z.infer<typeof ProductSchema>) => {
		if (product) {
			updateMutation.mutate({
				...data,
				id: product.id,
			});
			return;
		}
		createMutation.mutate(data);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				{product ? (
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						Редактировать
					</DropdownMenuItem>
				) : (
					<Button variant={"secondary"} className="py-2 w-32">Создать</Button>
				)}
			</SheetTrigger>
			<SheetContent className="p-6 flex flex-col gap-y-9 text-primary bg-background border-l-0 rounded-l-3xl overflow-auto">
				<SheetHeader>
					<SheetTitle className="text-center text-primary text-4xl">Продукт</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col grow space-y-4"
					>
						<div className="space-y-4 grow">
							<div className="flex flex-col gap-4">
								<FormLabel>Изображения</FormLabel>
								{imagesArray.fields.map((image, index) => (
									<FormField
										key={index}
										control={form.control}
										name={`images.${index}`}
										render={({ field }) => (
											<FormItem className="flex gap-4">
												<label className="w-full">
													<div className="w-full h-52 rounded-2xl overflow-hidden hover:scale-105 transition cursor-pointer">
														{field.value?.b64 ? (
															<img
																src={field.value.b64}
																alt="Изображение"
																className="size-full object-cover"
															/>
														) : (
															<>
																{field.value?.id ? (
																	<S3Image
																		src={field.value.id}
																		width={1080}
																		height={1920}
																		alt="Изображение"
																		className="size-full object-cover"
																	/>
																) : (
																	<Skeleton className="size-full bg-primary" />
																)}
															</>
														)}
													</div>

													<Input
														type="file"
														className="hidden"
														accept="image/png, image/jpeg, image/webp"
														onChange={async (e) => {
															if (!e.target.files?.[0]) return;
															field.onChange(
																(await ConvertFiles([e.target.files[0]]))[0]!,
															);
														}}
													/>
												</label>

												<Button variant={"ghost"} size={"ghost"} className="flex justify-center items-center" onClick={() => imagesArray.remove(index)}>
													<Trash2 className="size-10 text-red-500"/>
												</Button>
											</FormItem>
										)}
									/>
								))}
								<Button
									type="button"
									// @ts-expect-error Ожидается ошибка из-за несовместимости типов
									onClick={() => imagesArray.append("")}
								>
									Добавить
								</Button>
							</div>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Название</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Название" />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<Textarea {...field} placeholder="Описание" />
								)}
							/>

							<div className="space-y-4">
								<FormLabel>Цены</FormLabel>

								<FormField
									control={form.control}
									name="priceFor1"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input {...field} placeholder="Цена за 1 шт." />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="priceFor4"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input {...field} placeholder="Цена за 4 шт." />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="priceFor8"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input {...field} placeholder="Цена за 8 шт." />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Тип</FormLabel>

										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="Выберите тип" />
											</SelectTrigger>
											<SelectContent>
												{productTypesEnum.enumValues?.map((type, index) => (
												<SelectItem value={type} key={index}>
													{productTypeToString(type)}
												</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Категория</FormLabel>

										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger>
												<SelectValue placeholder="Выберите категорию" />
											</SelectTrigger>
											<SelectContent>
												{categories?.map((category, index) => (
												<SelectItem value={category.name} key={index}>
													{category.name}
												</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>

						<Button
							disabled={createMutation.isPending}
							className="w-full"
						>
							Сохранить
						</Button>

					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
