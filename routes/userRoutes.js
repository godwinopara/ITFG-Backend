const express = require("express");
const { getUserProfile, updateUserProfile, getUsers } = require("../controllers/userController");
const User = require("../models/User");
const { isAuthenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/admin");

const router = express.Router();

router.get("/", isAuthenticated, getUserProfile);

router.get("/all", isAdmin, getUsers);

// // Update user profile
router.patch("/", isAuthenticated, updateUserProfile);

module.exports = router;
