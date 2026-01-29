import * as z from "zod";

export const signInSchema = z.object({
    email: z
        .email('Please enter a valid email address')
        .min(6, "Email must be at least 6 characters long"),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
});

export const signUpSchema = z.object({
    username: z
        .string()
        .min(6, "Username must be at least 6 characters long"),
    email: z
        .email('Please enter a valid email address')
        .min(6, "Email must be at least 6 characters long"),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
});
