const Investment = require("../models/Investment");
const User = require("../models/User");

const createInvestment = async (req, res) => {
  const { investmentOption, capital, end } = req.body;

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const newInvestment = new Investment({
      user: userId,
      investmentOption,
      capital,
      end,
    });

    const savedInvestment = await newInvestment.save();

    const addedInvestement = {
      userId,
      investmentOption: savedInvestment.investmentOption,
      capital: savedInvestment.capital,
      profit: savedInvestment.profit,
      start: savedInvestment.start,
      end: savedInvestment.end,
      status: savedInvestment.status,
    };

    // update user's total Investment
    user.total_investments += capital;
    user.wallet_balance -= capital;
    await user.save();

    res.status(201).json(addedInvestement);

    //
  } catch (error) {
    res.status(500).json({ message: "Error creating Investment", error });
  }
};

const getUserInvestments = async (req, res) => {
  const userId = req.user._id;

  try {
    const investments = await Investment.find({ user: userId });
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching investments", error });
  }
};

const getActiveUserInvestments = async (req, res) => {
  const userId = req.user._id;

  try {
    const activeInvestments = await Investment.find({ user: userId, status: "active" });
    res.status(200).json(activeInvestments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active investments", error });
  }
};

const getUserEndedInvestments = async (req, res) => {
  const userId = req.user._id;

  try {
    const endedInvestments = await Investment.find({ user: userId, status: "completed" });
    res.status(200).json(endedInvestments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Ended investments", error });
  }
};

const getActiveUsersInvestments = async (req, res) => {
  try {
    const activeInvestments = await Investment.find({ status: "active" });
    res.status(200).json(activeInvestments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active investments", error });
  }
};

const getUsersEndedInvestments = async (req, res) => {
  try {
    const endedInvestments = await Investment.find({ status: "completed" });
    res.status(200).json(endedInvestments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Ended investments", error });
  }
};

module.exports = {
  createInvestment,
  getUserInvestments,
  getActiveUserInvestments,
  getUserEndedInvestments,
  getActiveUsersInvestments,
  getUsersEndedInvestments,
};
