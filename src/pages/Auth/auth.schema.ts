import { z } from "zod";

// Login
export const loginSchema = z.object({
    email: z.string({required_error: "Email is required"}).email().nonempty({ message: "Email is required"}),
    password: z.string().min(1, "Password is required"),
});

// Registration
// const passwordRequirements = {
//     minLength: 6,
//     hasUpperCase: /[A-Z]/,
//     hasLowerCase: /[a-z]/,
//     hasNumber: /[0-9]/,
//     hasSpecialChar: /[^A-Za-z0-9]/,
// };
export const registerSchema = z.object({
    name: z.string().nonempty({ message: "Name is required"}),
    email: z.string().email({ message: "Email is invalid"}).nonempty({ message: "Email is required"}),
    password: z
        .string().nonempty({ message: "Password is required"})
        // .min(
        //     passwordRequirements.minLength,
        //     `Password must be at least ${passwordRequirements.minLength} characters`
        // )
        // .regex(
        //     passwordRequirements.hasUpperCase,
        //     'Password must contain at least one uppercase letter'
        // )
        // .regex(
        //     passwordRequirements.hasLowerCase,
        //     'Password must contain at least one lowercase letter'
        // )
        // .regex(
        //     passwordRequirements.hasNumber,
        //     'Password must contain at least one number'
        // )
        // .regex(
        //     passwordRequirements.hasSpecialChar,
        //     'Password must contain at least one special character'
        // ),
})