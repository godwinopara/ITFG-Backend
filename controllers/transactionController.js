const Transaction = require("../models/Transaction")
const User = require("../models/User")



exports.createTransaction = async(req, res) => {
    const {userId, transactionType, paymentMethod, amount, type,  status} = req.body

    try {
        const user = await User.findOne(userId)
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const newTransaction = new Transaction({
            user: userId,
            transactionType,
            paymentMethod,
            amount,
            type,
            status
        })

        const savedTransaction = await newTransaction.save()

        // Update Wallet
        if(type === "deposit"){
            user.wallet_balance += amount
            user.total_deposit += amount
            user.total_pending_deposit_amount += amount
        }else if (type === "withdrawal"){
            user.wallet_balance -= amount
            user.total_withdrawal += amount
            user.total_pending_withdrawal_amount += amount
        }

        await user.save()

        res.status(201).json(savedTransaction)

    } catch (error) {
        res.status(500).json({message: "Error Processing Transaction", error})
    }
}


exports.getUserTransactions = async (req, res) => {
    const {userId} = req.params

    try {
        const transactions = await Transaction.find({user: userId})
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).json({message: "Error fetching transaction", error})
    }
}