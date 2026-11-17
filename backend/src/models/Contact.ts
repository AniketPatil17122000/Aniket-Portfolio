import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: "New" | "Read" | "Replied";
}

const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["New", "Read", "Replied"],
            default: "New"
        }
    },
    {
        timestamps: true
    }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;