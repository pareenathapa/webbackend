const Order = require("../models/orderModel");
const Jewelry = require("../models/jewelryModel");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { jewelryId, quantity } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and user ID is available

    const jewelryItem = await Jewelry.findById(jewelryId);
    if (!jewelryItem) {
      return res.status(404).json({ message: "Jewelry item not found" });
    }

    const totalPrice = jewelryItem.jewelryPrice * quantity;

    const newOrder = new Order({
      jewelry: jewelryId,
      user: userId,
      quantity,
      totalPrice,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("jewelry")
      .populate("user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("jewelry").populate("user");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user is authenticated and user ID is available
    const orders = await Order.find({ user: userId })
      .populate("jewelry")
      .populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

// Delete an order for a specific user
const deleteUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOneAndDelete({
      id: req.params.id,
      user: userId,
    });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or not authorized" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

// Exporting controller functions
module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getUserOrders,
  deleteOrder,
  deleteUserOrder,
};
