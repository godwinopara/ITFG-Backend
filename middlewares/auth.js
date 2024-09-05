const jwt = require("jsonwebtoken")
const User = require("../models/User")



// Middlewares

const isAuthenticated = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "")

    if(!token){
        return res.status(401).json({error: "Access Denied. No Token provided"})
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //FIND USER
        const user = await User.findById(decoded.userId)

        if(!user) {
            return res.status(404).json({error: "User not found"})
        }

        req.user = user 

        next()
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
}


module.export = {isAuthenticated}