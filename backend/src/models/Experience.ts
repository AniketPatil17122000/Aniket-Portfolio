import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
    role: string;
    company: string;
    location?: string;
    employmentType: string;
    startDate: Date;
    endDate?: Date;
    currentlyWorking: boolean;
    description: string;
    technologies: string[];
}

const experienceSchema = new Schema<IExperience>(
    {
        role: {
            type: String,
            required: true,
            trim: true
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        employmentType: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date
        },
        currentlyWorking: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        technologies: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

const Experience = mongoose.model<IExperience>(
    "Experience",
    experienceSchema
);

export default Experience;