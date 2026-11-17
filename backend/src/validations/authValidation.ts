
import { z } from "zod";

export const registerAdminSchema = z.object({
    email: z.string().email("Enter a valid email address"),

    password: z.string()
        .min(8, "Password must contain at least 8 characters"),

    setupKey: z.string()
        .min(1, "Setup key is required")
});

export const loginAdminSchema = z.object({
    email: z.string().email("Enter a valid email address"),

    password: z.string()
        .min(1, "Password is required")
});

export const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(1, "Current password is required"),

    newPassword: z.string()
        .min(8, "New password must contain at least 8 characters"),

    confirmPassword: z.string()
        .min(1, "Please confirm your new password")
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "New password and confirm password do not match",
        path: ["confirmPassword"]
    }
).refine(
    (data) => data.currentPassword !== data.newPassword,
    {
        message: "New password must be different from current password",
        path: ["newPassword"]
    }
);
