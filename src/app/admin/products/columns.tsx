"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type Product } from "~/lib/shared/types/product";
import CreateUpdateProduct from "./create-update";
import DeleteProduct from "./delete";
import S3Image from "~/components/ui/image";


export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "imageIds",
		header: "Изображение",
		cell({ row }) {
			const product = row.original;

			return (
				<S3Image
					src={product.imageIds[0] ?? ""}
					width={1080}
					height={1920}
					alt="Изображение"
					className="size-20 object-cover"
				/>
			)
		}
	},
	{
		accessorKey: "name",
		header: "Название",
	},
		{
		accessorKey: "priceFor1",
		header: "Цена за 1 шт.",
	},
	{
		accessorKey: "priceFor4",
		header: "Цена за 4 шт.",
	},
	{
		accessorKey: "priceFor8",
		header: "Цена за 8 шт.",
	},
	{
		id: "actions",
		header: "",
		cell({ row }) {
			const product = row.original;

			return (
				<div className="flex items-center justify-end">
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger className="rounded-full" asChild>
							<Button size="icon" variant="ghost" aria-haspopup="true">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Действия</DropdownMenuLabel>
							<CreateUpdateProduct product={product}/>
							<DeleteProduct id={product.id}/>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
