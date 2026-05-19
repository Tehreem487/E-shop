import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { PORT } from "./config/config.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-shop-eta-sable.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend running ✔");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});

// ✅ Start Server
connectDB()
  .then(() => {
    app.listen(PORT || 5000, () => {
      console.log(`🚀 Server running on port ${PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });