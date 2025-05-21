"use client";

import { X } from "lucide-react";
import { cn } from "~/lib/utils";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "./sheet";
import Link from "next/link";
import CartIcon from "~/app/(landing)/cart";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	mobileTrigger?: React.ReactNode;
	mobileHeader?: React.ReactNode;
}

export function Sidebar({
	mobileTrigger,
	mobileHeader,
	children,
	...props
}: SidebarProps) {
	return (
		<>
			<Sheet {...props}>
				<nav className="w-full py-[10px] px-4 justify-between gap-4 items-center flex lg:hidden">
					<SheetTrigger asChild>{mobileTrigger}</SheetTrigger>
					{mobileHeader}

					<Link href={"/cart"}>
						<CartIcon/>
					</Link>
				</nav>
				<SheetContent className="w-full md:max-w-screen border-0 flex flex-col px-0">
					<SheetHeader className="flex py-[14px] flex-row justify-between items-center container">
						<SheetClose className="ring-inherit border-none focus-visible:outline-none">
							<X className="size-6 text-primary"/>
						</SheetClose>
						
						<Link href={"/"}>
							{mobileHeader}
						</Link>

						<Link href={"/cart"}>
							<CartIcon/>
						</Link>
					</SheetHeader>
					{children}
				</SheetContent>
			</Sheet>
		</>
	);
}

export interface SidebarHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
		children?: React.ReactNode;
	}

export function SidebarHeader({
	children,
	className,
	...props
}: SidebarHeaderProps) {
	return (
		<div
			className={cn(
				"items-center shrink-0 justify-between py-4 px-6 hidden md:flex",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export interface SidebarTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {
		children?: React.ReactNode;
	}

export function SidebarTitle({
	children,
	className,
	...props
}: SidebarTitleProps) {
	return (
		<h1 className={cn("text-sm font-semibold", className)} {...props}>
			{children}
		</h1>
	);
}

export interface SidebarContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
		children?: React.ReactNode;
	}

export function SidebarContent({ children }: SidebarContentProps) {
	return (
		<div className="flex grow flex-col shrink gap-4 px-6 py-4">{children}</div>
	);
}

export interface SidebarFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {
		children?: React.ReactNode;
	}

export function SidebarFooter({
	children,
	className,
	...props
}: SidebarFooterProps) {
	return (
		<div
			className={cn(
				"flex items-center shrink-0 justify-between py-4 px-6",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
