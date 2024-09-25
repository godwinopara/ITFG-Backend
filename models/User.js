const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema for User
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "active"],
      default: "pending",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    IDFront: {
      type: String,
    },
    IDBack: {
      type: String,
    },
    profileImgUrl: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    wallet_balance: {
      type: Number,
      default: 0.0,
    },
    total_deposit: { type: Number, default: 0.0 },
    total_withdrawal: { type: Number, default: 0.0 },
    total_profit: { type: Number, default: 0.0 },
    total_investments: { type: Number, default: 0.0 },
    referral_bonus: { type: Number, default: 0.0 },
    bonus: { type: Number, default: 0.0 },
    total_confirmed_deposits_amount: { type: Number, default: 0.0 },
    total_confirmed_withdrawals_amount: { type: Number, default: 0.0 },
    total_pending_withdrawal_amount: { type: Number, default: 0.0 },
    total_pending_deposit_amount: { type: Number, default: 0.0 },
    referralLink: String,
    referralCode: String,
    noOfReferralBonus: { type: Number, default: 0 },
    referralLevel: { type: Number, default: 1 },
  },
  { toJSON: { virtuals: true } }
);

// Virtual field for user investments
UserSchema.virtual("investments", {
  ref: "Investment",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Virtual field for users referred by the current user
UserSchema.virtual("referrals", {
  ref: "Referral",
  localField: "_id",
  foreignField: "referred_by",
  justOne: false,
});

// Virtual field for the user who referred this user
UserSchema.virtual("referredBy", {
  ref: "Referral",
  localField: "_id",
  foreignField: "referred_user",
  justOne: true,
});

// Virtual field for referral bonuses
UserSchema.virtual("referralBonuses", {
  ref: "ReferralBonus",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Virtual field for user deposits
UserSchema.virtual("deposits", {
  ref: "Deposit",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Virtual field for user withdrawals
UserSchema.virtual("withdrawals", {
  ref: "Withdrawal",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
