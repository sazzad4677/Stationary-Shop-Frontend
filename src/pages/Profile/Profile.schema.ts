import { z } from "zod"

export const shippingAddressSchema = z.object({
    addressLine1: z.string().min(1, { message: "Address Line 1 is required" }),
    addressLine2: z.string(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zipCode: z.string().min(1, { message: "Zip code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
})

export const ProfileSchema = z.object({
    shippingAddress: shippingAddressSchema,
    name: z.string(),
    email: z.string(),
})
