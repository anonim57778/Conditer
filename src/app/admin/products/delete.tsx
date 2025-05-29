"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export default function DeleteProduct({
	id,
}: {
	id: string;
}) {
	const router = useRouter();
	const { toast } = useToast();

	const deleteMutation = api.product.delete.useMutation({
		onSuccess() {
			toast({
				title: "Продукт успешно удален",
			});
			router.refresh();
		},
		onError() {
			toast({
				title: "Продукт не удален",
				description: "Произошла ошибка при удалении продукта",
				variant: "destructive",
			});
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					Удалить
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Удалить продукт</AlertDialogTitle>
					<AlertDialogCancel>
                        <X className="size-6 text-primary"/>
                    </AlertDialogCancel>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Вы уверены, что хотите удалить продукт?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogAction className="p-3 w-full" onClick={() => deleteMutation.mutate({ id })}>
						Удалить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
