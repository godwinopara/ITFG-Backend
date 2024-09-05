const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Referral = require('../models/Referral');
const ReferralBonus = require('../models/ReferralBonus');

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Handle referral logic
    if (referralCode) {
      const referringUser = await User.findOne({ referralCode });

      if (referringUser) {
        // Create referral record
        const referral = new Referral({
          referred_by: referringUser._id,
          referred_user: newUser._id,
          status: 'active',
        });

        await referral.save();

        // Optional: Create a referral bonus record
        const referralBonus = new ReferralBonus({
          user: referringUser._id,
          referralName: newUser.name,
          email: newUser.email,
          amount: 100, // You can set this as a default or calculate dynamically
        });

        await referralBonus.save();
      }
    }

    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser);

    // Send response with user details and token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        referralCode: newUser.referralCode,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = generateToken(user);

    // Send response with user details and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
