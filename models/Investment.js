const mongoose = require("mongoose");
const User = require("./User");

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  investmentOption: {
    type: String,
    required: true,
  },
  capital: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    default: 0.0,
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
