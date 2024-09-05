const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

// Get user profile
router.get("/:userId", authMiddleware, getUserProfile);

// Update user profile
router.patch("/:userId", authMiddleware, updateUserProfile);

module.exports = router;
