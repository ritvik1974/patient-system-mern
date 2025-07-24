import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import cors from "cors";
import { connectDb } from "./config/db.mjs";
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB

const app = express();

// Middleware to parse incoming requests with JSON payloads

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Catch-all route for unmatched endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found", flag: "hosted" });
});

// Set the port from environment or use default 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on port ${PORT}`);
});

export default app;
