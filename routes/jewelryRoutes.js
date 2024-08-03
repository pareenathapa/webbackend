const express = require("express");
const router = express.Router();
const {
  createJewelry,
  getAllJewelry,
  getJewelryById,
  updateJewelry,
  deleteJewelry,
  upload,
} = require("../controllers/jewelryController"); // Adjust the path if necessary

// Define the routes
router.post("/", upload.single("jewelryImage"), createJewelry);
router.get("/", getAllJewelry);
router.get("/:id", getJewelryById);
router.put("/:id", upload.single("jewelryImage"), updateJewelry);
router.delete("/:id", deleteJewelry);

module.exports = router;
