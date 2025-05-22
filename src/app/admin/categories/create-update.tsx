"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";
import { useToast } from "~/components/ui/use-toast";
import { OnError } from "~/lib/shared/OnError";
import { api } from "~/trpc/react";
import { Category, CategorySchema } from "~/lib/shared/types/category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { productTypesEnum } from "~/server/db/schema";
import { productTypeToString } from "~/lib/enums";

export default function CreateUpdateCategory({
	category,
}: {
	category?: Category
}) {
	const [open, setOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(CategorySchema),
		defaultValues: category ? category : {}  as z.infer<typeof CategorySchema>
	});

	const { toast } = useToast();

	const createMutation = api.category.create.useMutation({
		onSuccess() {
			toast({
				title: "Категория успешно создана",
			});
			form.reset();
			setOpen(false);
		},
		onError(error) {
			console.log(error.message);
			toast({
				title: "Категория не создана",
				description: "Произошла ошибка при создании категории",
				variant: "destructive",
			});
		},
	});

	const updateMutation = api.category.update.useMutation({
		onSuccess() {
			toast({
				title: "Категория успешно обновлена",
			});
			setOpen(false);
		},
		onError() {
			toast({
				title: "Категория не обновлена",
				description: "Произошла ошибка при обновлении категории",
				variant: "destructive",
			});
		},
	});

	const onSubmit = (data: z.infer<typeof CategorySchema>) => {
		if (category) {
			updateMutation.mutate({ ...data, id: category.id });
		} else {
			createMutation.mutate(data);
		}
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				{category ? (
					<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
						Редактировать
					</DropdownMenuItem>
				) : (
					<Button variant={"secondary"} className="py-2 w-32">Создать</Button>
				)}
			</SheetTrigger>
			<SheetContent className="p-6 flex flex-col gap-y-9 text-primary bg-background border-l-0 rounded-l-3xl">
				<SheetHeader>
					<SheetTitle className="text-center text-primary text-4xl">Категория</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit, OnError(toast))}
						className="flex flex-col grow"
					>
						<div className="space-y-4 grow">
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
						</div>

						<Button
							disabled={createMutation.isPending || updateMutation.isPending}
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
