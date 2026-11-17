import { Router } from "express";

import validateRequest from "../middleware/validateRequest";
import { createContactSchema, updateContactStatusSchema } from "../validations/contactValidation";
import { createContact, deleteContact, getAllContacts, getContactById, updateContactStatus } from "../controllers/contactcontroller";
import { authMiddleware } from "../middleware/authMiddleware";
import rateLimit from "express-rate-limit";

const router = Router();

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        message: "Too many contact requests. Please try again later."
    },
    standardHeaders: "draft-8",
    legacyHeaders: false
});

// Public route to submit contact messages
router.post("/", contactLimiter , validateRequest(createContactSchema), createContact);
router.get("/", authMiddleware, getAllContacts);
router.get("/:id", authMiddleware, getContactById);

// Admin only - Update contact message status
router.patch(
    "/:id/status",
    authMiddleware,
    validateRequest(updateContactStatusSchema),
    updateContactStatus
);

router.delete("/:id", authMiddleware, deleteContact);

export default router;