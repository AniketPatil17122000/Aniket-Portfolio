import { Router } from "express";
import { createProject, deleteProject, getProjects, getProjectsById, updateProject } from "../controllers/projectController";
import validateRequest from "../middleware/validateRequest";
import { createProjectSchema, updateProjectSchema } from "../validations/projectValidation";
import { loginAdmin, registerAdmin } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectsById);
// router.post("/", createProject);
router.post("/", authMiddleware ,validateRequest(createProjectSchema), createProject);

// router.put("/:id", updateProject);
// router.put("/:id", authMiddleware,  validateRequest(updateProjectSchema), updateProject);
router.patch("/:id", authMiddleware, validateRequest(updateProjectSchema), updateProject);
router.delete("/:id",  authMiddleware, deleteProject);

export default router;



