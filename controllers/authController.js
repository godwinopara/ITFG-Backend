const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Referral = require("../models/Referral");
const ReferralBonus = require("../models/ReferralBonuses");

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, referralLink, newUserReferralCode, referredByReferralCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      referralLink,
      referralCode: newUserReferralCode,
      password: hashedPassword,
    });

    // Handle referral logic
    if (referredByReferralCode) {
      const referringUser = await User.findOne({ referralCode: referredByReferralCode });

      if (referringUser) {
        // Create referral record
        const referral = new Referral({
          referred_by: referringUser._id,
          referred_user: newUser._id,
          status: "pending",
        });

        await referral.save();

        // // Optional: Create a referral bonus record
        // const referralBonus = new ReferralBonus({
        //   user: referringUser._id,
        //   referralName: newUser.name,
        //   email: newUser.email,
        //   amount: 100, // You can set this as a default or calculate dynamically
        // });

        // await referralBonus.save();
      }
    }

    await newUser.save();

    const populatedUser = await User.findById(newUser)
      .select("-password") // Exclude password from the response
      .populate("deposits") // Populate virtual deposits
      .populate("withdrawals") // Populate virtual withdrawals
      .populate("referrals") // Populate virtual referrals
      .populate("referralBonuses") // Populate virtual referral bonuses
      .populate("investments") // Populate virtual investments
      .populate("referredBy", "name email date status");

    // Generate JWT
    const token = generateToken(newUser);

    // Send response with user details and token
    res.status(201).json({
      message: "User registered successfully",
      user: populatedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Fetch the saved user with populated fields
    const populatedUser = await User.findById(user._id)
      .select("-password") // Exclude password from the response
      .populate("deposits") // Populate virtual deposits
      .populate("withdrawals") // Populate virtual withdrawals
      .populate("referralBonuses") // Populate virtual referral bonuses
      .populate("investments") // Populate virtual investments
      .populate("referredBy")
      .populate("referrals", "name") // Populate virtual referrals
      .populate({ path: "referrals", populate: { path: "referred_user", select: "name email" } });

    // Generate JWT
    const token = generateToken(user);

    // Send response with user details and token
    res.status(200).json({
      message: "Login successful",
      user: populatedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { signup, login };
