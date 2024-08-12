const Jewelry = require("../models/jewelryModel"); // Adjust the path if necessary
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/jewelry/"); // Make sure this directory exists and is accessible
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// Create new jewelry item
const createJewelry = async (req, res) => {
  try {
    const { jewelryName, jewelryPrice, jewelryDescription, jewelryCategory } =
      req.body;

    // Check if an image file was uploaded, if not, use a default image
    const jewelryImage = req.file ? req.file.path : "path/to/default/image.jpg";

    const newJewelry = new Jewelry({
      jewelryName,
      jewelryPrice,
      jewelryDescription,
      jewelryCategory,
      jewelryImage,
    });

    await newJewelry.save();
    res.status(201).json({
      message: "Jewelry item created successfully",
      jewelry: newJewelry,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating jewelry item", error });
  }
};

module.exports = {
  createJewelry,
};

// Read all jewelry items
const getAllJewelry = async (req, res) => {
  try {
    const jewelryItems = await Jewelry.find();
    res.status(200).json({
      message: "Success",
      data: jewelryItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jewelry items", error });
  }
};

// Read a single jewelry item by ID
const getJewelryById = async (req, res) => {
  try {
    const jewelryItem = await Jewelry.findById(req.params.id);
    if (!jewelryItem) {
      return res.status(404).json({ message: "Jewelry item not found" });
    }
    res.status(200).json({
      message: "Success",
      data: jewelryItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jewelry item", error });
  }
};

// Update a jewelry item by ID
const updateJewelry = async (req, res) => {
  try {
    const { jewelryName, jewelryPrice, jewelryDescription, jewelryCategory } =
      req.body;
    const jewelryImage = req.file ? req.file.path : undefined;

    const updatedJewelry = await Jewelry.findByIdAndUpdate(
      req.params.id,
      {
        jewelryName,
        jewelryPrice,
        jewelryDescription,
        jewelryCategory,
        ...(jewelryImage && { jewelryImage }),
      },
      { new: true }
    );

    if (!updatedJewelry) {
      return res.status(404).json({ message: "Jewelry item not found" });
    }

    res.status(200).json({
      message: "Jewelry item updated successfully",
      jewelry: updatedJewelry,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating jewelry item", error });
  }
};

// Delete a jewelry item by ID
const deleteJewelry = async (req, res) => {
  try {
    const deletedJewelry = await Jewelry.findByIdAndDelete(req.params.id);
    if (!deletedJewelry) {
      return res.status(404).json({ message: "Jewelry item not found" });
    }
    res.status(200).json({ message: "Jewelry item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting jewelry item", error });
  }
};

// Exporting controller functions and multer upload
module.exports = {
  createJewelry,
  getAllJewelry,
  getJewelryById,
  updateJewelry,
  deleteJewelry,
  upload,
};
