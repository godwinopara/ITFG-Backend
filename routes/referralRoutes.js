const express = require("express");
const { createReferral, updateReferralStatus, getUserReferrals } = require("../controllers/ReferralController");
const { assignReferralBonus, getReferralBonuses } = require("../controllers/referralBonusController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// POST /api/referral
router.post("/", isAuthenticated, createReferral);

// GET /api/referral/user-referrals
router.get("/", isAuthenticated, getUserReferrals);

// GET /api/referral/bonus
router.get("/referral-bonus", isAuthenticated, getReferralBonuses);

// POST /api/referral/referral-bonus
router.post("/referral-bonus", isAuthenticated, assignReferralBonus);

module.exports = router;
