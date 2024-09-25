const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WithdrawalSchema = new Schema({
  transactionType: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Withdrawal = mongoose.model("Withdrawal", WithdrawalSchema);
module.exports = Withdrawal;
