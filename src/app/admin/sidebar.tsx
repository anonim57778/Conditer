"use client";
import { ClipboardList, Cake} from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "~/lib/utils";

type AdminSidebarT = {
    title: string;
    icon: React.ReactNode;
    url: string;
}

const adminSidebar: AdminSidebarT[] = [
    {
        title: "Категории",
        icon: <ClipboardList className="size-6 text-background"/>,
        url: "/admin/categories"
    },
    {
        title: "Продукты",
        icon: <Cake className="size-6 text-background"/>,
        url: "/admin/products"
    },
];

function AdminSidebarItem({ item }: { item: AdminSidebarT }) {
    const pathname = usePathname();

    return (
        <Link href={item.url} className={cn("flex gap-2 items-start p-2 rounded-2xl transition-all hover:bg-white/10", pathname === item.url ? "bg-white/10" : "")}>
            {item.icon}
            <h1 className="text-lg font-bold text-background">{item.title}</h1>
        </Link>
    )
}

export default function AdminSidebar() {

    return (
        <div className="w-80 flex flex-col gap-2 p-6 bg-primary from-customGradientCardStart/10 to-customGradientCardEnd/10 rounded-3xl">
            {adminSidebar.map((item, index) => (
                <AdminSidebarItem key={index} item={item}/>
            ))}
        </div>
    )
}