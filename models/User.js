const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   wallet_balance: {
//     usd: String,
//     btc: String,
//     eth: String,
//     usdt: String,
//   },
//   total_deposit: Number,
//   total_withdrawal: Number,
//   total_profit: Number,
//   total_investments: Number,
//   referral_bonus: Number,
//   bonus: Number,
//   confirmedDeposits: Number,
//   confirmedWithdrawals: Number,
//   pendingWithdrawal: Number,
//   pendingDeposit: Number,
//   referral: String,
//   referralLink: String,
//   referralCode: String,
//   noOfReferralBonus: Number,
//   referralLevel: Number,
//   kycVerified: Boolean,
//   referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Referral' }],
//   referralBonuses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReferralBonus' }],
//   activeInvestments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ActiveInvestments' }],
//   endedInvestments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EndedInvestments' }],
//   deposits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'deposits' }],
//   withdrawals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'withdrawals' }],
// });

const Schema = mongoose.Schema;

// Define the schema for User
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet_balance: {
    type: Number, default: 0.00
  },
  total_deposit: { type: Number, default: 0.00 },
  total_withdrawal: { type: Number, default: 0.00 },
  total_profit: { type: Number, default: 0.00 },
  total_investments: { type: Number, default: 0.00 },
  referral_bonus: { type: Number, default: 0.00 },
  bonus: { type: Number, default: 0.00 },
  total_confirmed_deposits_amount: {type: Number, default: 0.00},
  total_confirmed_withdrawals_amount: {type:Number, default: 0.00},
  total_pending_withdrawal_amount: {type:Number, default: 0.00},
  total_pending_deposit_amount: {type:Number, default: 0.00},
  referralLink: String,
  referralCode: String,
  noOfReferralBonus: {type: Number, default: 0},
  referralLevel: {type: Number, default: 1}

}, { toJSON: { virtuals: true } });

// Virtual field for user investments
UserSchema.virtual('investments', {
    ref: 'Investment',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
  });
  
  // Virtual field for users referred by the current user
  UserSchema.virtual('referrals', {
    ref: 'Referral',
    localField: '_id',
    foreignField: 'referred_by',
    justOne: false,
  });
  
  // Virtual field for the user who referred this user
  UserSchema.virtual('referredBy', {
    ref: 'Referral',
    localField: '_id',
    foreignField: 'referred_user',
    justOne: true,
  });
  
  // Virtual field for referral bonuses
  UserSchema.virtual('referralBonuses', {
    ref: 'ReferralBonus',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
  });

// Virtual field for user deposits
UserSchema.virtual('deposits', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    options: { match: { type: 'deposit' } }  // Only fetch deposits
  });
  
  // Virtual field for user withdrawals
  UserSchema.virtual('withdrawals', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    options: { match: { type: 'withdrawal' } }  // Only fetch withdrawals
  });

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
