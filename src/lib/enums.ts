import { type ProductEnum } from "~/server/db/schema";


export function productTypeToString(type: ProductEnum) {
    switch (type) {
        case "DESSERT":
            return "Десерт";
        case "GIFT":
            return "Подарочные наборы";
    }
}