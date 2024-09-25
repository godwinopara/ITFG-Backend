// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Routes imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const referralRoutes = require("./routes/referralRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const depositRoutes = require("./routes/depositRoutes");
const withdrawalRoutes = require("./routes/withdrawalRoutes");

const app = express();

// Load environment variables
dotenv.config();

// MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/withdrawals", withdrawalRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
