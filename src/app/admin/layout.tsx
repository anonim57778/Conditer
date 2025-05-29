import { getServerAuthSession } from "~/server/auth";
import AdminSidebar from "./sidebar";
import { Inter } from "next/font/google";
import { env } from "~/env";
import LoginPage from "../login/page";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    const session = await getServerAuthSession();

    return (
        <>
            {session?.user?.email == env.MAIN_ADMIN_EMAIL ? (
                <div className={`${inter.className} py-6 px-4 flex gap-7 items-start h-screen`}>
                    <AdminSidebar/>
                    <div className="w-full h-full bg-primary rounded-3xl text-background">
                        {children}
                    </div>
                </div>
            ) : (
                <LoginPage/>
            )}
        </>
    )
}