import { Router } from "express";
import {
    
    createSkill,
    
    deleteSkill,
    getAllSlills,
    updateSills
} from "../controllers/skillController";

import validateRequest from "../middleware/validateRequest";
import {
    createSkillSchema,
    updateSkillSchema
} from "../validations/skillValidation";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Public - Get all skills
router.get("/", getAllSlills);

// Admin only - Create skill
router.post("/", authMiddleware, validateRequest(createSkillSchema), createSkill);

// Admin only - Update skill
router.patch("/:id", authMiddleware, validateRequest(updateSkillSchema), updateSills);

// Admin only - Delete skill
router.delete("/:id", authMiddleware, deleteSkill);

export default router;