const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// fullname: string;
//   email: string;
//   date: string;
//   status: string;

// Define the schema for Referral
const ReferralSchema = new Schema({
  referred_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  referred_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["pending", "active"],
    default: "pending"
  }
});

// Create the Referral model from the schema
const Referral = mongoose.model('Referral', ReferralSchema);

module.exports = Referral;
