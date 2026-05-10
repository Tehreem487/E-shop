import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { PORT, FRONTEND_URL } from "./config/config.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

const app = express();

app.use(
  cors({
    origin: [FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => res.send("✅ Backend server is running on Railway"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
