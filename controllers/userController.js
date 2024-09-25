const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get user profile
const getUserProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      email,
      mobile,
      nationality,
      password,
      state,
      city,
      address,
      zipcode,
      idFront,
      idBack,
      profileImgUrl,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (nationality) user.nationality = nationality;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (state) user.state = state;
    if (city) user.city = city;
    if (address) user.address = address;
    if (zipcode) user.zipCode = zipcode;
    if (idFront) user.IDFront = idFront;
    if (idBack) user.IDBack = idBack;
    if (profileImgUrl) user.profileImgUrl = profileImgUrl;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        nationality: user.nationality,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get users profile
const getUsers = async (req, res) => {
  // const userId = req.user._id;

  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile, getUsers };
