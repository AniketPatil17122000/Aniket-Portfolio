import { z } from "zod";

export const createSkillSchema = z.object({
    name: z.string().trim().min(2, "Skill name must contain at least 2 characters").max(50),
    category: z.string().trim().min(2, "Category is required").max(50),
    level: z.number().min(0, "Level cannot be less than 0").max(100, "Level cannot exceed 100"),
    icon: z.string().optional()
});

export const updateSkillSchema = createSkillSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required for update"
    );