import express from "express";
import cors from "cors";

const app = express();

// 🔥 MUST BE FIRST MIDDLEWARE (before anything)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://e-shop-eta-sable.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 🔥 ALSO FORCE PRE-FLIGHT HANDLING
app.options("*", cors());

import express from "express";
import cors from "cors";

const app = express();

console.log("🚀 Server starting...");

// 👇 HERE (BEFORE routes)
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://e-shop-eta-sable.vercel.app",
      ];

      // allow Postman / backend calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // TEMP FIX (allow everything)
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// IMPORTANT
app.use(express.json());

// routes AFTER CORS
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);