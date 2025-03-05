import express from "express";
import dotenv from "dotenv";
import Feedback from "../models/Feedback.js"; // Import Feedback model

dotenv.config();
const router = express.Router();

// Middleware to check admin password
const verifyAdmin = (req, res, next) => {
    const { password } = req.body;
    
    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ message: "Forbidden: Invalid admin password!" });
    }

    next();
};

// Admin Login Route (Already fixed)
router.post("/login", (req, res) => {
    const { password } = req.body;
    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ message: "Invalid admin password!" });
    }
    res.status(200).json({ message: "Admin login successful" });
});

// Admin Fetch Feedbacks Route (FIXED)
router.post("/feedbacks", verifyAdmin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); // Fetch all feedbacks from MongoDB
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
