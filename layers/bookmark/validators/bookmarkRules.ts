import * as z from "zod";

export const bookmarkSchema = z.object({
    link: z.url()
});