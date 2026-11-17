import { z } from "zod";

const experienceObjectSchema = z.object({
    role: z.string().trim().min(2, "Role is required").max(100),
    company: z.string().trim().min(2, "Company name is required").max(100),
    location: z.string().trim().optional(),

  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance"
]),

    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),

    currentlyWorking: z.boolean().default(false),

    description: z.string().trim().min(10, "Description must contain at least 10 characters"),

    technologies: z.array(z.string().trim().min(1)).default([])
});

// Create validation
export const createExperienceSchema = experienceObjectSchema
    .refine(
        (data) => !data.endDate || data.endDate >= data.startDate,
        {
            message: "End date cannot be earlier than start date",
            path: ["endDate"]
        }
    )
    .refine(
        (data) => {
            if (data.currentlyWorking) {
                return !data.endDate;
            }

            return !!data.endDate;
        },
        {
            message: "End date is required only when you are not currently working",
            path: ["endDate"]
        }
    );

// Update validation
export const updateExperienceSchema = experienceObjectSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required for update"
    )
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.endDate >= data.startDate;
            }
            return true;
        },
        {
            message: "End date cannot be earlier than start date",
            path: ["endDate"]
        }
    );