import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import projectRoutes from "./routes/projectRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import skillRoutes from "./routes/skillRoutes";
import experienceRoutes from "./routes/experienceRoutes";
import mongoose from "mongoose";
import imageRoutes from "./routes/imageRoutes";



const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/images", imageRoutes);

app.get("/api/health", (_req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;

    res.status(dbConnected ? 200 : 503).json({
        success: dbConnected,
        status: dbConnected ? 200 : 503,
        message: dbConnected
            ? "Portfolio API is running"
            : "Database connection unavailable",
        database: dbConnected ? "Connected" : "Disconnected",
        timestamp: new Date().toISOString()
    });
});
app.use(errorMiddleware);

export default app;