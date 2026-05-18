import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { PORT } from "./config/config.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-shop-eta-sable.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running on Railway");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Database Connection + Server Start
connectDB().then(() => {
  app.listen(PORT || 5000, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});