import { Router } from "express";
import { uploadProjectImage } from "../controllers/imageController";
import upload from "../middleware/uploadMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const imageRoutes = Router();

imageRoutes.post(
    "/project",
    authMiddleware,
    upload.single("image"),
    uploadProjectImage
);

export default imageRoutes;