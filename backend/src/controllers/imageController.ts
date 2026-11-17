import { Request, Response, NextFunction } from "express";
import uploadImage from "../services/cloudinaryService";

export const uploadProjectImage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Please select an image",
            });
            return;
        }

        const result = await uploadImage(req.file.buffer);

        res.status(200).json({
            success: true,
            status: 200,
            message: "Image uploaded successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};