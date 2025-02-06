import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, { message: "Product Name is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.coerce.number().min(1, { message: "Price is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    quantity: z.coerce.number(),
    inStock: z.boolean().default(true),
    images: z.array(
        z.object({
            file: z
                .unknown()
                .optional()
                .refine((val) => val instanceof File || val === undefined, {
                    message: "File must be an image or undefined",
                }),
            preview: z.string().url("Preview must be a valid URL"),
        })
    ).optional(),

});