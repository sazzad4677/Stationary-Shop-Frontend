import { z } from "zod";

export const filterSchema = z.object({
    searchTerm: z.string(),
    priceRange: z.tuple([z.number(), z.number()]),
    selectedCategory: z.string().nullable(),
    inStock: z.boolean(),
    sortBy: z.enum(["-price", "price", "name", "createdAt"]),
});

export type TFilter = z.infer<typeof filterSchema>;