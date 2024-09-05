const express = require("express");
const { createTransaction, getUserTransactions } = require("../controllers/transactionController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// POST /api/transactions
router.post("/", isAuthenticated, createTransaction);

// GET /api/transactions/:userId
router.get("/:userId", isAuthenticated, getUserTransactions);

module.exports = router;
