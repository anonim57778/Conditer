import Link from "next/link";
import CartIcon from "./cart";
import { Sidebar, SidebarContent, SidebarFooter } from "~/components/ui/sidebar";
import { AlignJustify, ChevronRight } from "lucide-react";
import { SheetClose } from "~/components/ui/sheet";

export default function Navbar() {
    const menu = [
        {
            name: "Десерты",
            url: "/products/dessert"
        },
        {
            name: "Подарочные наборы",
            url: "/products/gift"
        },
        {
            name: "Контакты",
            url: "/contacts"
        }
    ]

    return (
        <header className="h-[50px]">
            <div className="container hidden lg:grid grid-cols-3 h-full">
                <div className="flex items-center justify-start gap-6 w-fit">
                    {menu.map((item, index) => (
                        <Link key={index} href={item.url}>
                            <h1 className="text-base font-medium font-sans hover:underline decoration-primary">{item.name}</h1>
                        </Link>
                    ))}
                </div>
                
                <div className="flex justify-center items-center">
                    <Link href={"/"}>
                        <h1 className="hover:opacity-60 text-xl font-normal font-heading">Bite of Bliss</h1>
                    </Link>
                </div>

                <div className="flex justify-end items-center">
                    <Link href={"/cart"}>
                        <CartIcon/>
                    </Link>
                </div>
            </div>

            <Sidebar
                mobileHeader={
                    <Link href={"/"}>
                        <h1 className="hover:opacity-60 text-xl font-normal font-heading">Bite of Bliss</h1>
                    </Link>
                }
                mobileTrigger={<AlignJustify className="size-6 text-primary" />}
                className="block lg:hidden"
            >
                <SidebarContent className="flex flex-col items-start gap-y-4">
                    {menu.map((item, index) => (
                        <SheetClose asChild key={index}>
                            <Link href={item.url} className="flex justify-between items-center">
                                <h1
                                    className="text-2xl font-medium text-primary"
                                >
                                    {item.name}
                                </h1>

                                <ChevronRight className="size-6 text-primary"/>
                            </Link>
                        </SheetClose>
                    ))}
                </SidebarContent>
                <SidebarFooter className="flex justify-center">
                    <Link
                        className="flex items-center gap-2 text-primary"
                        href="/"
                    >
                        <h2 className="text-5xl font-normal">Bite of Bliss</h2>
                    </Link>
                </SidebarFooter>
            </Sidebar>
        </header>
    )
}