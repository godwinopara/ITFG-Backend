const User = require("../models/User");
const Withdrawal = require("../models/Withdrawal");

const addWithdrawal = async (req, res) => {
  const { transactionType, paymentMethod, amount, walletAddress, transactionId } = req.body;

  const userId = req.user._id;

  // Validate required fields
  if (!transactionType || !paymentMethod || !amount || !walletAddress) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new Withdrawal({
      user: userId,
      transactionType,
      paymentMethod,
      amount: Number(amount),
      walletAddress,
      transactionId,
    });

    const savedTransaction = await newTransaction.save();

    // Update Wallet

    user.wallet_balance -= amount;
    user.total_withdrawal += amount;
    user.total_pending_withdrawal_amount += amount;

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

const getUserWithdrawals = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User Not Found" });
  }

  try {
    const withdrawals = await Withdrawal.find({ user: userId });
    res.status(200).json(withdrawals);
  } catch (error) {
    console.error("Error fetching withdrawal transactions:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

const getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate("user", "name");
    res.status(200).json(withdrawals);
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    res.status(500).json({ message: "Error fetching withdrawals", error });
  }
};

module.exports = { getUserWithdrawals, getWithdrawals, addWithdrawal };
