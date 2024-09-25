const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome");
});
router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
