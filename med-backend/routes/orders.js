
import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controller/orders.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.put("/cancel/:id", protect, cancelOrder);

// Admin Routes
router.get("/", protect, adminOnly, getAllOrders);
router.put("/status/:id", protect, adminOnly, updateOrderStatus);

export default router;
