const Investment = require("../models/Investment")
const User = require("../models/User")


exports.createInvestment = async (req, res) => {
    const {userId, investmentOption, capital, end} = req.body

    try {
        const user = await User.findById({user: userId})
        if(!user) {
            res.status(404).json({message: "User not found"})
        }

        const newInvestment = new Investment({
            investmentOption,
            capital,
            end
        })

        const savedInvestment = await newInvestment.save()

        // update user's total Investment
        user.total_investments += capital
        await user.save()

        res.status(201).json(savedInvestment)

    } catch (error) {
        res.status(500).json({message: "Error creating Investment", error})
    }
}


exports.getUserInvestments = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const investments = await Investment.find({ user: userId });
      res.status(200).json(investments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching investments", error });
    }
  };