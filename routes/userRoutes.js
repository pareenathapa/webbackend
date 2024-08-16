const { Router } = require("express");

const router = Router();
const userControllers = require("../controllers/userControllers");
const { authGuard, adminGuard } = require("../middleware/authGuard");

// Create user API
router.post("/create", userControllers.createUser);

// Login user API
router.post("/login", userControllers.loginUser);

// Get user by ID API
router.get("/:id", authGuard, userControllers.getUser);

// Update user API
router.put("/:id", authGuard, userControllers.updateUser);

// Delete user API
router.delete("/:id", authGuard, userControllers.deleteUser);

// Exporting the router
module.exports = router;
