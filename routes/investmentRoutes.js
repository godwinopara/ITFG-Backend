const express = require("express");
const {
  createInvestment,
  getUserInvestments,
  getActiveUserInvestments,
  getUserEndedInvestments,
  getActiveUsersInvestments,
  getUsersEndedInvestments,
} = require("../controllers/investmentController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// // POST /api/investments
router.post("/", isAuthenticated, createInvestment);

// // GET /api/investments/
router.get("/", isAuthenticated, getUserInvestments);

// GET ACTIVE INVESTMENT ---> GET /api/investments/active
router.get("/active", isAuthenticated, getActiveUserInvestments);

// GET Ended Investments ---- GET /api/investments/ended
router.get("/ended", isAuthenticated, getUserEndedInvestments);

router.get("/active/all", getActiveUsersInvestments);

router.get("/ended/all", getUsersEndedInvestments);

module.exports = router;
