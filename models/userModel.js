const mongoose = require("mongoose");

//Making schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Storing the URL or path to the image
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
