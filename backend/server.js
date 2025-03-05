import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import feedbackRoutes from "./routes/feedbackRoutes.js"; // Import feedback routes
import adminRoutes from "./routes/adminRoutes.js"; // Import admin routes

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api/feedback", feedbackRoutes); // Register feedback routes
app.use("/api/admin", adminRoutes); // Register admin routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// For ES Modules (use this instead of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}
