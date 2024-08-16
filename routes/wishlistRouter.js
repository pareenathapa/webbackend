const express = require("express");
const wishlistRouter = express.Router();
const {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishListController"); // Adjust the path if necessary
const { authGuard, adminGuard } = require("../middleware/authGuard");

// Route to add to wishlist
wishlistRouter.post("/add", authGuard, addToWishlist);

// Route to remove from wishlist
wishlistRouter.post("/remove", authGuard, removeFromWishlist);

// Route to get user's wishlist
wishlistRouter.get("/", authGuard, getUserWishlist);

module.exports = wishlistRouter;
