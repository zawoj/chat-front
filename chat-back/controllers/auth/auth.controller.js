const express = require("express");
const router = express.Router();
const validateForm = require("./validateForm");
const reateLimiter = require("../rateLimiter");

const { handleLogin, handleMe, handleSignup } = require("./auth.service");

// get me
router.get("/me", handleMe);

router.post("/login", (validateForm, reateLimiter), handleLogin);

router.post("/signup", (validateForm, reateLimiter), handleSignup);

module.exports = router;
