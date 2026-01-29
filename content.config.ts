import { defineContentConfig, defineCollection } from '@nuxt/content'
import * as z from "zod";

export default defineContentConfig({
    collections: {
        forms: defineCollection({
            type: 'data',
            source: 'forms/*.json',
            schema: z.object({
                legend: z.string().optional(),
                fields: z.array(
                    z.object({
                        type: z.string(),
                        name: z.string(),
                        label: z.string(),
                        placeholder: z.string(),
                        size: z.enum(["sm", "md", "lg"]),
                        autocomplete: z.boolean(),
                        required: z.boolean()
                    })
                ),
                button: z.object({
                    label: z.string(),
                    block: z.boolean(),
                    size: z.enum(["sm", "md", "lg"]),
                    type: z.enum(["submit", "button"]),
                })
            })
        }),
    }
})