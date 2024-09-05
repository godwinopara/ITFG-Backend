const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for Transaction
const TransactionSchema = new Schema({
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

  type: {
    type: String,
    required: true,
    enum: ["deposit", "withdrawal"], // Distinguishes between deposit and withdrawal
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


// Create the Transaction model
const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
