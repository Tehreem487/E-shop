import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { PORT, FRONTEND_URL } from "./config/config.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();

console.log("🚀 Server starting...");

// ===============================
// ✅ CORS FIX (PRODUCTION SAFE)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ===============================
// JSON BODY PARSER
// ===============================
app.use(express.json());

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.json({ message: "Backend running ✔" });
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// START SERVER AFTER DB CONNECT
// ===============================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();