const User = require("../models/User")


// Get user profile
exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email, password, kycDocuments } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      if (kycDocuments) {
        user.kycDocuments = kycDocuments; // Assuming kycDocuments is an array of URLs
      }
  
      await user.save();
  
      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          kycDocuments: user.kycDocuments,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


