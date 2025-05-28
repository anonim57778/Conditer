"use client";
import { useQueryStates } from "nuqs";
import { useState, useEffect } from "react";
import { filterParams } from "./filterParams";
import { type Category } from "~/lib/shared/types/category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export default function Filters({
    categories,
} : {
    categories: Category[]
}) {
    const [{ category }, setCategories] = useQueryStates(filterParams, {
        shallow: false,
    });

    const [categoriesFilter, setCategoriesFilter] = useState<string | null>(null);

    useEffect(() => {
        if (categoriesFilter !== category) {
            void setCategories({ category: categoriesFilter });
        }
        console.log(categoriesFilter);
    }, [categoriesFilter, setCategories]);

    return (
        <div className="w-full lg:w-[231px]">
            <Select value={categoriesFilter ?? ""} onValueChange={(value) => setCategoriesFilter(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                    {categories?.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
