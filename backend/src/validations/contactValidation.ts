import { z } from "zod";



export const createContactSchema = z.object({
    name: z.string()
        .trim()
        .min(2, "Name must contain at least 2 characters")
        .max(100, "Name is too long"),

    email: z.string()
        .trim()
        .email("Enter a valid email address"),

    subject: z.string()
        .trim()
        .min(3, "Subject must contain at least 3 characters")
        .max(150, "Subject is too long"),

    message: z.string()
        .trim()
        .min(10, "Message must contain at least 10 characters")
        .max(2000, "Message is too long")
});

export const updateContactStatusSchema = z.object({
    status: z.enum(["New", "Read", "Replied"])
});