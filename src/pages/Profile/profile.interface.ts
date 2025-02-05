import {z} from "zod";
import {profileSchema, shippingAddressSchema} from "@/pages/Profile/profile.schema.ts";

export type TPersonalInfo = z.infer<typeof profileSchema>
export type TShippingDetails = z.infer<typeof shippingAddressSchema>