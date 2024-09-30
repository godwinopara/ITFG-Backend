const express = require("express");
const { signup, login } = require("../controllers/authController");
const { adminLogin } = require("../controllers/adminAuthController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome");
});
router.post("/signup", signup);

router.post("/login", login);

router.post("/adminLogin", adminLogin);

module.exports = router;
