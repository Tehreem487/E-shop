import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import { MONGO_URI } from "./config/config.js";
import Product from "./models/Product.js";

// Sample products
const products = [
  {
    name: "Laptop",
    price: 700,
    image: "/products/laptop.jpeg",
    description: "Good laptop",
  },
  {
    name: "Phone",
    price: 400,
    image: "/products/mobile.jpeg",
    description: "Smart phone",
  },
  {
    name: "Headphones",
    price: 50,
    image: "/products/headphone.jpeg",
    description: "Nice sound",
  },
  {
    name: "Smartwatch",
    price: 150,
    image: "/products/smartwatch.jpeg",
    description: "Track your fitness",
  },
  {
    name: "Tablet",
    price: 300,
    image: "/products/tablet.jpeg",
    description: "Small computer",
  },
  {
    name: "Camera",
    price: 500,
    image: "/products/camera.jpeg",
    description: "Capture moments",
  },
  {
    name: "Gaming Mouse",
    price: 60,
    image: "/products/mouse.jpeg",
    description: "Gaming mouse",
  },
  {
    name: "Keyboard",
    price: 80,
    image: "/products/keyboard.jpeg",
    description: "Mechanical keyboard",
  },
  {
    name: "Charger",
    price: 500,
    image: "/products/Charger.jpg",
    description: "Laptop Charger",
  },
];

// Seed function
const seed = async () => {
  try {
    await connectDB(); // Connect using config DB
    await Product.deleteMany({}); // Remove existing products
    await Product.insertMany(products); // Add sample products
    console.log("Products seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};

seed();
