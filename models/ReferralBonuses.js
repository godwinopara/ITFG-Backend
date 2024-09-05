const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// referralName: string;
// email: string;
// amount: number;
// date: string;

// Define the schema for Referral Bonus
const ReferralBonusSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referralName: {
    type:String,
    required: true
  },
  email:{
    type: String, 
    required:true
},
  amount: {
    type: Number,
    required: true,
  },
 
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the ReferralBonus model from the schema
const ReferralBonus = mongoose.model('ReferralBonus', ReferralBonusSchema);

module.exports = ReferralBonus;
