import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";


export const registerAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const { email, password, setupKey } = req.body

        if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
            return res.status(403).json({
                success: false,
                status: 403,
                message: "Invalid registration key"

            })
        }

        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                status: 409,
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const admin = await Admin.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            status: 201,
            message: "Admin registered successfully",
            data: {
                id: admin._id,
                email: admin.email
            }
        });



    } catch (error) {
        next(error);
    }
}

export const loginAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Invalid email or password"
            });

        }
        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id.toString(),
                tokenVersion: admin.tokenVersion ?? 0
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Login successful",
            data: {
                id: admin._id,
                email: admin.email,
                token
            }
        })
    }
    catch (error) {
        next(error);
    }
}

export const getAdminProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const admin = await Admin.findById(req.adminId).select("-password");
        if (!admin) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Admin not found"
            });
        }
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Admin profile fetched successfully",
            data: {
                id: admin._id,
                email: admin.email
            }
        });


    } catch (error) {
        next(error);
    }
}


export const changeAdminPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Admin not found"
            });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            admin.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        admin.password = hashedPassword;
        admin.passwordChangedAt = new Date();
        admin.tokenVersion = (admin.tokenVersion ?? 0) + 1;

        await admin.save();

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Password changed successfully. Please log in again."
        });

    } catch (error) {
        next(error);
    }
};
