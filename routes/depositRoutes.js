const express = require("express");
const { getDeposits, createDeposit, getUserDeposits } = require("../controllers/depositController");
const { isAuthenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/admin");
const router = express.Router();

router.get("/", isAuthenticated, getUserDeposits);
router.post("/", isAuthenticated, createDeposit);
router.get("/all", getDeposits);

module.exports = router;
