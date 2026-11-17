
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

interface JwtPayload {
    id: string;
    tokenVersion?: number;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Server authentication configuration error"
        });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Authentication token is required"
        });
    }

    const token = authHeader.split(" ")[1];

    let decoded: JwtPayload;

    try {
        decoded = jwt.verify(token, secret) as JwtPayload;
    } catch {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Invalid or expired token"
        });
    }

    if (!decoded.id) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Invalid authentication token"
        });
    }

    try {
        const admin = await Admin.findById(decoded.id).select("tokenVersion");

        if (!admin) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Admin account not found"
            });
        }

        if ((decoded.tokenVersion ?? 0) !== (admin.tokenVersion ?? 0)) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Session expired. Please log in again."
            });
        }

        req.adminId = decoded.id;
        next();

    } catch (error) {
        next(error);
    }
};
