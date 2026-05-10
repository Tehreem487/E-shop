import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();

// Add/update items
router.post("/", protect, async (req, res) => {
  const userId = req.user._id;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items required" });
  }

  try {
    const formattedItems = items.map((i) => ({
      product: new mongoose.Types.ObjectId(i.product),
      quantity: i.quantity || 1,
    }));

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: formattedItems });
    } else {
      formattedItems.forEach((item) => {
        const index = cart.items.findIndex(
          (i) => i.product.toString() === item.product.toString()
        );
        if (index > -1) {
          cart.items[index].quantity = item.quantity;
        } else {
          cart.items.push(item);
        }
      });
    }

    await cart.save();
    const populatedCart = await cart.populate(
      "items.product",
      "name price image description"
    );
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user's cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price image description"
    );
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
