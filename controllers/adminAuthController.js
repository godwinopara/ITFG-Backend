const Admin = require("../models/Admin");

// Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Fetch the saved user with populated fields

    // Generate JWT
    const token = generateToken(user);

    // Send response with user details and token
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { adminLogin };
