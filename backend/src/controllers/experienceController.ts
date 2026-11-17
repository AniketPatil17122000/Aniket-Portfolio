import { Request, Response, NextFunction } from "express";
import Experience from "../models/Experience";

// Get all experiences (Public)
export const getAllExperiences = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Experiences fetched successfully",
            data: experiences
        });
    } catch (error) {
        next(error);
    }
};

// Create experience (Admin only)
export const createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const experience = await Experience.create(req.body);

        return res.status(201).json({
            success: true,
            status: 201,
            message: "Experience created successfully",
            data: experience
        });
    } catch (error) {
            console.error("CREATE EXPERIENCE ERROR:", error);
        next(error);
    }
};

// Update experience (Admin only)
export const updateExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!experience) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Experience not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Experience updated successfully",
            data: experience
        });
    } catch (error) {
        next(error);
    }
};

// Delete experience (Admin only)
export const deleteExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Experience not found"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Experience deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};