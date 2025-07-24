import express from "express";

import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes
import {
  bookAppointment,
  getAppointments,
} from "../controller/appointmentController.js";

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Book an appointment (protected route)
router.post("/book", protect, upload.single("file"), bookAppointment);

// Get all appointments of the logged-in user (protected route)
router.get("/myappointments", protect, getAppointments);

export default router;
