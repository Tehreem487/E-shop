// backend/config/config.js
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";