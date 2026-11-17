
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import connectDB from "../config/db";

const resetAdminPassword = async () => {
    try {
        const email = process.env.RESET_ADMIN_EMAIL;
        const newPassword = process.env.RESET_ADMIN_PASSWORD;

        if (!email || !newPassword || newPassword.length < 8) {
            throw new Error(
                "Provide a valid RESET_ADMIN_EMAIL and RESET_ADMIN_PASSWORD (minimum 8 characters)."
            );
        }

        await connectDB();

        const admin = await Admin.findOne({
            email: email.toLowerCase().trim()
        });

        if (!admin) {
            throw new Error("Admin account not found.");
        }

        admin.password = await bcrypt.hash(newPassword, 12);
        admin.passwordChangedAt = new Date();
        admin.tokenVersion = (admin.tokenVersion ?? 0) + 1;

        await admin.save();

        console.log("Admin password reset successfully.");
    } catch (error) {
        console.error("Password reset failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

resetAdminPassword();
