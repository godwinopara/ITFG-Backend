const express = require("express");
const {
  createReferral,
  updateReferralStatus,
  getUserReferrals,
  getReferrals,
} = require("../controllers/ReferralController");
const {
  assignReferralBonus,
  getReferralBonuses,
  allReferralBonuses,
} = require("../controllers/referralBonusController");
const { isAuthenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/admin");

const router = express.Router();

// POST /api/referral
router.post("/", isAuthenticated, createReferral);

// // GET /api/referral/user-referrals
router.get("/", isAuthenticated, getUserReferrals);

// Get all referrals
router.get("/all", isAdmin, getReferrals);

// // GET /api/referral/bonus
router.get("/referralbonus", isAuthenticated, getReferralBonuses);

// Get all Referral Bonuses
router.get("/referralbonus/all", isAdmin, allReferralBonuses);

// // POST /api/referral/referral-bonus
router.post("/referral-bonus", isAuthenticated, assignReferralBonus);

router.put("/referral-status", isAuthenticated, updateReferralStatus);

module.exports = router;
