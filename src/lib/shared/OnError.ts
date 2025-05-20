import type { FieldErrors } from "react-hook-form";
import type { useToast } from "~/components/ui/use-toast";

export function OnError(toast: ReturnType<typeof useToast>["toast"]) {
	return (errors: FieldErrors) => {
		const msg = errors[Object.keys(errors)[0] ?? "INVALID"]?.message;
		if (msg) {
			toast({
				title: msg as string,
				variant: "destructive",
			});
		}
	};
}
