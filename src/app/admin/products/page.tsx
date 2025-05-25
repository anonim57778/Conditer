import { AdminContent, AdminHeader, AdminTitle } from "~/components/admin";
import { DataTable } from "~/components/ui/data-table";
import { api } from "~/trpc/server";
import { columns } from "./columns";
import CreateUpdateProduct from "./create-update";

export default async function AdminProductPage() {

    const products = await api.product.getAll({});

    return (
        <AdminContent>
            <AdminHeader>
                <AdminTitle>Продукты</AdminTitle>
                <div className="flex items-center gap-2">
                    <CreateUpdateProduct/>
                </div>
            </AdminHeader>
            <DataTable columns={columns} data={products} />
        </AdminContent>
    );
}
