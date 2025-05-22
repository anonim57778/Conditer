import AdminSidebar from "./sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
    children,
} : {
    children: React.ReactNode;
}) {


    return (
        <>
            <div className={`${inter.className} py-6 px-4 flex gap-7 items-start h-screen`}>
                <AdminSidebar/>
                <div className="w-full h-full bg-primary rounded-3xl text-background">
                    {children}
                </div>
            </div>
        </>
    )
}