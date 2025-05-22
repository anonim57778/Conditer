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
import { type Category } from "~/lib/shared/types/category";
import CreateUpdateCategory from "./create-update";
import DeleteCategory from "./delete";


export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "name",
		header: "Название",
	},
	{
		id: "actions",
		header: "",
		cell({ row }) {
			const category = row.original;

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
                            <CreateUpdateCategory category={category}/>
                            <DeleteCategory id={category.id}/>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
