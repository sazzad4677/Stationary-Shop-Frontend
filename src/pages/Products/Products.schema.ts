import { z } from "zod";

export const filterSchema = z.object({
    searchTerm: z.string().optional(),
    priceRange: z.tuple([z.number(), z.number()]),
    selectedCategory: z.string().nullable(),
    showAvailableOnly: z.boolean(),
    sortBy: z.enum(["price", "title"]),
});

export type TFilter = z.infer<typeof filterSchema>;