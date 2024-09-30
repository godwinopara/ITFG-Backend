const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Referral = require("../models/Referral");
const ReferralBonus = require("../models/ReferralBonuses");
const { generateCustomReferralCode } = require("../utils/generateReferralCode");

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, nationality, referral } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const referralCode = generateCustomReferralCode();
    const referralLink = `https://indextradefinancialgroup.com/referralcode=${referralCode}`;

    //Create new user
    const newUser = new User({
      name,
      email,
      referralLink,
      nationality,
      referralCode: referralCode,
      password: hashedPassword,
    });

    // Handle referral logic
    if (referral) {
      const referringUser = await User.findOne({ referralCode: referral });

      if (referringUser) {
        // Create referral record
        const addReferral = new Referral({
          referred_by: referringUser._id,
          referred_user: newUser._id,
          status: "pending",
        });

        await addReferral.save();

        // Create a referral bonus record
        const referralBonus = new ReferralBonus({
          user: referringUser._id,
          referralName: newUser.name,
          email: newUser.email,
          amount: 50, // You can set this as a default or calculate dynamically
        });

        await referralBonus.save();
      }
    }

    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser);

    // Send response with user details and token
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
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
