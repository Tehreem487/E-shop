import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { PORT } from "./config/config.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();


// ===============================
// ✅ 1. CORS CONFIG (PROPER WAY)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-shop-eta-sable.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
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
// ✅ 2. HANDLE PREFLIGHT (CRITICAL FIX FOR RAILWAY)
// ===============================
app.options("*", cors());


// ===============================
// ✅ 3. BODY PARSER
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
// ✅ 6. GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});


// ===============================
// ✅ 7. START SERVER
// ===============================
connectDB()
  .then(() => {
    app.listen(PORT || 5000, () => {
      console.log(`🚀 Server running on port ${PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });