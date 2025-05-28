import { parseAsString } from "nuqs/server";

export const categoryParser = {
    category: parseAsString.withDefault(""),
}