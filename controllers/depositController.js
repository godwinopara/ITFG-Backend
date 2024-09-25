const Deposit = require("../models/Deposit");
const User = require("../models/User");

const getUserDeposits = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const deposits = await Deposit.find({ user: userId });
    res.status(200).json(deposits);
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

const createDeposit = async (req, res) => {
  const { transactionType, paymentMethod, amount, walletAddress, transactionId } = req.body;

  const userId = req.user._id;

  // Validate required fields
  if (!transactionType || !paymentMethod || !amount || !walletAddress || !transactionId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new Deposit({
      user: userId,
      transactionType,
      paymentMethod,
      amount: Number(amount),
      walletAddress,
      transactionId,
    });

    const savedTransaction = await newTransaction.save();

    // Update Wallet
    user.wallet_balance += amount;
    user.total_deposit += amount;
    user.total_pending_deposit_amount += amount;

    await user.save();
    const addedTransaction = {
      userId,
      transactionType,
      paymentMethod,
      amount,
      status: savedTransaction.status,
      date: savedTransaction.date,
    };
    res.status(201).json(addedTransaction);
  } catch (error) {
    console.error("Error processing transaction:", error); // Log error for debugging
    res.status(500).json({ message: "Error processing transaction", error });
  }
};

const getDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find().populate("user", "name");
    res.status(200).json(deposits);
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

module.exports = { getUserDeposits, createDeposit, getDeposits };
