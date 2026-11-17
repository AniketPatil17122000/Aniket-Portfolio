
import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
    getAdminProfile,
    loginAdmin,
    changeAdminPassword
} from "../controllers/authController";

import validateRequest from "../middleware/validateRequest";

import {
    loginAdminSchema,
    changePasswordSchema
} from "../validations/authValidation";

import { authMiddleware } from "../middleware/authMiddleware";

const authRoutes = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        status: 429,
        message: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: "draft-8",
    legacyHeaders: false
});

const passwordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        status: 429,
        message: "Too many password change attempts. Please try again later."
    },
    standardHeaders: "draft-8",
    legacyHeaders: false
});

authRoutes.post(
    "/login",
    loginLimiter,
    validateRequest(loginAdminSchema),
    loginAdmin
);

authRoutes.get(
    "/profile",
    authMiddleware,
    getAdminProfile
);

authRoutes.patch(
    "/change-password",
    authMiddleware,
    passwordLimiter,
    validateRequest(changePasswordSchema),
    changeAdminPassword
);

export default authRoutes;
