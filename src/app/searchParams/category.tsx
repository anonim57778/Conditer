import { parseAsString, parseAsStringEnum } from "nuqs/server";
import { productTypesEnum } from "~/server/db/schema";

export const categoryParser = {
    category: parseAsString.withDefault(""),
}