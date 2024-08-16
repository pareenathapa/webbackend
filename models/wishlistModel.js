const mongoose = require("mongoose");

// Creating the wishlist schema
const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  jewelry: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jewelry",
    },
  ],
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
