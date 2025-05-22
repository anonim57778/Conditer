import type { ReactNode } from "react";

export interface AdminProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export function AdminContent({ children, ...props }: AdminProps) {
	return (
		<div {...props} className="grow bg-gradient-to-br from-customGradientCardStart/10 to-customGradientCardEnd/10 border border-white/20 h-full p-6 space-y-4 rounded-2xl overflow-y-scroll">
			{children}
		</div>
	);
}

export function AdminHeader({ children, ...props }: AdminProps) {
	return (
		<div {...props} className="flex items-center justify-between">
			{children}
		</div>
	);
}

export function AdminTitle({ children, ...props }: AdminProps) {
	return (
		<h1 {...props} className="text-2xl font-bold text-background">
			{children}
		</h1>
	);
}
