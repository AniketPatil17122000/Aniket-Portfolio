import { z } from "zod";

export const createProjectSchema = z.object({
      title: z.string().min(3, "Title must contain at least 3 characters"),

    slug: z.string()
        .min(3, "Slug must contain at least 3 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can contain lowercase letters, numbers and hyphens only"),

    description: z.string().min(10, "Description must contain at least 10 characters"),

    technologies: z.array(z.string().min(1)).min(1, "At least one technology is required"),

    category: z.enum(["Frontend", "Backend", "Full Stack"]),

    image: z.string().url("Invalid image URL").optional(),

    liveUrl: z.string().url("Invalid live URL").optional(),

    githubUrl: z.string().url("Invalid GitHub URL").optional(),

    featured: z.boolean().optional(),

    status: z.enum(["Draft", "Published"]).optional()
})


export const updateProjectSchema = createProjectSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field is required for update"
    );