import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    category: "Frontend" | "Backend" | "Full Stack";
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    status: "Draft" | "Published";
}

const projectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
        },
        slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
      description: {
      type: String,
      required: true,
      trim: true,
    },
      technologies: {
      type: [String],
      required: true,
      default: [],
    },
     category: {
      type: String,
      enum: ["Frontend", "Backend", "Full Stack"],
      required: true,
    },
    image: {
      type: String,
    },

    liveUrl: {
      type: String,
    },

    githubUrl: {
      type: String,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },
    },
    {
    timestamps: true,
  }
)


const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;