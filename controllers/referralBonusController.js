// controllers/referralBonusController.js

const ReferralBonus = require("../models/ReferralBonus");
const User = require("../models/User");

// Assign a referral bonus
exports.assignReferralBonus = async (req, res) => {
  const { userId, referralName, email, amount } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReferralBonus = new ReferralBonus({
      user: userId,
      referralName,
      email,
      amount,
    });

    const savedReferralBonus = await newReferralBonus.save();

    // Add the bonus to the user's referral bonus total
    user.referral_bonus += amount;
    await user.save();

    res.status(201).json(savedReferralBonus);
  } catch (error) {
    res.status(500).json({ message: "Error assigning referral bonus", error });
  }
};

// Get referral bonuses for a user
exports.getReferralBonuses = async (req, res) => {
  const { userId } = req.params;

  try {
    const referralBonuses = await ReferralBonus.find({ user: userId });
    res.status(200).json(referralBonuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral bonuses", error });
  }
};
