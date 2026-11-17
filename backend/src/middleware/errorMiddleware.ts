import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";

const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(error);
    }

    let status = 500;
    let message = "Internal server error";
    let errors = null;

    // Zod validation error
    if (error instanceof ZodError) {
        status = 400;
        message = "Validation failed";

        errors = error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));
    }

    // MongoDB duplicate key error
    else if (error.code === 11000) {
        status = 409;
        message = "Duplicate record already exists";
    }

    // Mongoose validation error
    else if (error instanceof mongoose.Error.ValidationError) {
        status = 400;
        message = "Database validation failed";

        errors = Object.values(error.errors).map((item) => ({
            field: item.path,
            message: item.message
        }));
    }

    // Invalid MongoDB ObjectId
    else if (error instanceof mongoose.Error.CastError) {
        status = 400;
        message = "Invalid ID format";
    }

    // Log internal errors on the server
    if (status === 500) {
        console.error("Internal Server Error:", error);
    }

    res.status(status).json({
        success: false,
        status,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === "development" && {
            error: error.message
        })
    });
};

export default errorMiddleware;