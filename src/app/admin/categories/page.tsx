import { AdminContent, AdminHeader, AdminTitle } from "~/components/admin";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/trpc/server";
import { columns } from "./columns";
import CreateUpdateCategory from "./create-update";

export default async function AdminCategoryPage() {

    const categories = await api.category.getAll();

    return (
        <AdminContent>
            <AdminHeader>
                <AdminTitle>Категории</AdminTitle>
                <div className="flex items-center gap-2">
                    <CreateUpdateCategory/>
                </div>
            </AdminHeader>
            <DataTable columns={columns} data={categories} />
        </AdminContent>
    );
}
