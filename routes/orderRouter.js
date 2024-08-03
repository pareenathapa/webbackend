const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getAllOrders,
  getUserOrders,
  deleteOrder,
  deleteUserOrder,
} = require("../controllers/orderController");
const { authGuard, adminGuard } = require("../middleware/authGuard");

// Define the routes
router.post("/", authGuard, createOrder);
router.get("/:id", authGuard, getOrderById);
router.get("/", adminGuard, authGuard, getAllOrders);
router.get("/user", authGuard, getUserOrders);
router.delete("/:id", adminGuard, authGuard, deleteOrder);
router.delete("/user-order/:id", authGuard, deleteUserOrder);
