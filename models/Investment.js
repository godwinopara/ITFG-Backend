const mongoose = require("mongoose")
const User = require("./User")

const investmentSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:User, required:true},
    investmentOption:{
        type: String,
        required: true
    },
    capital: {
        type:String,
        required: true
    },
    profit: {
        type:String,
        default: 0.00
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
    
})


const Investment = mongoose.model("Investment", investmentSchema)

module.exports = Investment