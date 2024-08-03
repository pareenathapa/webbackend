const mongoose = require("mongoose");

const jewelrySchema = new mongoose.Schema({
  // fields : NAME, PRICE, DESCRIPTION, IMAGE, CATEGORY
  jewelryName: {
    type: String,
    required: true,
  },
  jewelryPrice: {
    type: Number,
    required: true,
  },
  jewelryDescription: {
    type: String,
    required: true,
    maxlength: 300,
  },
  jewelryCategory: {
    type: String,
    required: true,
  },
  jewelryImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// exporting
const Jewelry = mongoose.model("jewelry", jewelrySchema);
module.exports = Jewelry;
