import { Router } from "express";
import {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} from "../controllers/experienceController";

import validateRequest from "../middleware/validateRequest";
import {
    createExperienceSchema,
    updateExperienceSchema
} from "../validations/experienceValidation";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public - Get all experiences
router.get("/", getAllExperiences);

// Admin only - Create experience
router.post(
    "/",
    authMiddleware,
    validateRequest(createExperienceSchema),
    createExperience
);

// Admin only - Update experience
router.patch(
    "/:id",
    authMiddleware,
    validateRequest(updateExperienceSchema),
    updateExperience
);

// Admin only - Delete experience
router.delete("/:id", authMiddleware, deleteExperience);

export default router;