const express = require("express");
const { getUserProfile, updateUserProfile, getUsers } = require("../controllers/userController");
const User = require("../models/User");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated, getUserProfile);

router.get("/all", getUsers);

// // Update user profile
router.patch("/", isAuthenticated, updateUserProfile);

module.exports = router;
