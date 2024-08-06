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
router.get("/by-id/:id", authGuard, getOrderById);
router.get("/", adminGuard, authGuard, getAllOrders);
router.get("/user", authGuard, getUserOrders);
router.delete("/by-id/:id", adminGuard, authGuard, deleteOrder);
router.delete("/user/:id", authGuard, deleteUserOrder);

module.exports = router;
