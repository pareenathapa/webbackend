const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  jewelry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jewelry",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
