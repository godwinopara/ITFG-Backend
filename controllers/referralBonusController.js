const ReferralBonus = require("../models/ReferralBonuses");
const User = require("../models/User");

// Assign a referral bonus
const assignReferralBonus = async (req, res) => {
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
const getReferralBonuses = async (req, res) => {
  const userId = req.user._id;

  try {
    const referralBonuses = await ReferralBonus.find({ user: userId });
    res.status(200).json(referralBonuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral bonuses", error });
  }
};

const allReferralBonuses = async (req, res) => {
  try {
    const allReferralBonuses = await ReferralBonus.find();
    res.status(200).json(allReferralBonuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral bonuses", error });
  }
};

// module.exports = { assignReferralBonus, getReferralBonuses };
module.exports = { assignReferralBonus, getReferralBonuses, allReferralBonuses };
