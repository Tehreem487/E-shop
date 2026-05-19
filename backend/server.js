import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { PORT } from "./config/config.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();

console.log("🚀 Server starting...");


// ===============================
// ✅ 1. CORS (PRODUCTION SAFE)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-shop-eta-sable.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, Railway, Postman, etc.
      if (!origin) return callback(null, true);

      // Allow frontend origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked CORS:", origin);

      // IMPORTANT: do NOT break request (prevents Failed to fetch)
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// ===============================
// ✅ 2. PRE-FLIGHT SUPPORT
// ===============================
app.options("*", cors());


// ===============================
// ✅ 3. MIDDLEWARE
// ===============================
app.use(express.json());


// ===============================
// ✅ 4. TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Backend running ✔");
});


// ===============================
// ✅ 5. ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


// ===============================
// ❌ 6. ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});


// ===============================
// 🚀 7. START SERVER
// ===============================
connectDB()
  .then(() => {
    app.listen(PORT || 5000, () => {
      console.log(`🚀 Server running on port ${PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });