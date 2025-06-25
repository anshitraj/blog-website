const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.validateSignup, authController.signup);
router.post("/login", authController.validateLogin, authController.login);
router.get("/verify", authController.verifyEmail);

module.exports = router;
