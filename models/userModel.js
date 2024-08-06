const mongoose = require("mongoose");

//Making schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: false,
    default: false,
  },
});
const user = mongoose.model("users", userSchema);
module.exports = user;
