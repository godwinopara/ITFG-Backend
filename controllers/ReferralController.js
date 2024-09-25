const Referral = require("../models/Referral");
const User = require("../models/User");

const createReferral = async (req, res) => {
  const { referred_by, referred_user } = req.body;

  try {
    const referrer = await User.findById(referred_by);
    const referred = await User.findById(referred_user);

    if (!referrer || referred) {
      res.send(404).json({ message: "Referrer or Referred User not Found" });
    }

    // check if user has already been referred
    const existingReferral = await Referral.findOne({ referred_user });

    if (existingReferral) {
      res.send(400).json({ message: "User has already been referred" });
    }

    // create new referral
    const newReferral = new Referral({
      referred_by,
      referred_user,
    });

    const saveReferral = await newReferral.save();

    res.status(201).json(saveReferral);
  } catch (error) {
    res.status(500).json({ message: "Error creating referral", error });
  }
};

const updateReferralStatus = async (req, res) => {
  const { referralId } = req.params;
  const { status } = req.body;

  try {
    const referral = await Referral.findById(referralId);

    if (!referral) {
      res.status(404).json({ message: "Referral not found" });
    }

    referral.status = status;
    const updateReferral = await referral.save();

    res.status(200).json(updateReferral);
  } catch (error) {
    res.status(500).json({ message: "Error updating referral status", error });
  }
};

// Get all referrals for a user (referrer)
const getUserReferrals = async (req, res) => {
  const userId = req.user._id;

  try {
    const referrals = await Referral.find({ referred_by: userId }).populate({
      path: "referred_user",
      select: "name email",
    });
    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referrals", error });
  }
};

const getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find().populate([
      {
        path: "referred_user",
        select: "name",
      },
      {
        path: "referred_by",
        select: "name",
      },
    ]);

    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referrals", error });
  }
};

module.exports = { createReferral, updateReferralStatus, getUserReferrals, getReferrals };
