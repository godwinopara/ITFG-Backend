const express = require("express");
const { getUserWithdrawals, addWithdrawal, getWithdrawals } = require("../controllers/withdrawalController");
const { isAuthenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/admin");
const router = express.Router();

router.get("/", isAuthenticated, getUserWithdrawals);
router.post("/", isAuthenticated, addWithdrawal);
router.get("/all", getWithdrawals);

module.exports = router;
