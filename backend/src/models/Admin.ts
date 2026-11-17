
import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    email: string;
    password: string;
    passwordChangedAt?: Date;
    tokenVersion: number;
}

const adminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        passwordChangedAt: {
            type: Date
        },
        tokenVersion: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
