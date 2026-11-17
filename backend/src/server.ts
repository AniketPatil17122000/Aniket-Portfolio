import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error("Missing required environment variables");
}


  await connectDB();

  console.log("Resend API key loaded:", !!process.env.RESEND_API_KEY);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();