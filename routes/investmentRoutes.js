const express = require("express");
const { createInvestment, getUserInvestments } = require("../controllers/investmentController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// POST /api/investments
router.post("/", isAuthenticated, createInvestment);

// GET /api/investments/:userId
router.get("/:userId", isAuthenticated, getUserInvestments);

module.exports = router;
