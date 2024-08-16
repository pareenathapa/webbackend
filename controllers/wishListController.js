const Wishlist = require("../models/wishlistModel");
const Jewelry = require("../models/jewelryModel"); // Assuming you have a jewelry model
const User = require("../models/userModel");

// Add to wishlist
const addToWishlist = async (req, res) => {
  const { jewelryId } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and user ID is available

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Check if the jewelry exists
    const jewelry = await Jewelry.findById(jewelryId);
    if (!jewelry) {
      return res.status(404).json({
        success: false,
        message: "Jewelry not found!",
      });
    }

    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ userId: userId });

    if (!wishlist) {
      // If the wishlist doesn't exist, create a new one
      wishlist = new Wishlist({ userId: userId, jewelry: [jewelryId] });
    } else {
      const allJewelry = wishlist.jewelry ?? [];
      // Check if the jewelry is already in the wishlist
      if (allJewelry.includes(jewelryId)) {
        return res.status(400).json({
          success: false,
          message: "Jewelry is already in the wishlist!",
        });
      }

      // Add the jewelry to the wishlist
      allJewelry.push(jewelryId);
      wishlist.jewelry = allJewelry;
    }

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Jewelry added to wishlist successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  const { jewelryId } = req.body;
  const userId = req.user.id; // Assuming user is authenticated and user ID is available

  try {
    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found!",
      });
    }

    // Check if the jewelry is in the wishlist
    if (!wishlist.jewelry.includes(jewelryId)) {
      return res.status(400).json({
        success: false,
        message: "Jewelry is not in the wishlist!",
      });
    }

    // Remove the jewelry from the wishlist
    wishlist.jewelry = wishlist.jewelry.filter(
      (id) => id.toString() !== jewelryId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Jewelry removed from wishlist successfully",
      wishlist: wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Get user's wishlist
const getUserWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId: userId }).populate(
      "jewelry"
    );

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// Exporting the functions
module.exports = {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
};
