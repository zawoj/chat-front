const express = require("express");
const router = express.Router();
const validateForm = require("./validateForm");

const { handleLogin, handleMe, handleSignup } = require("./auth.service");

// get me
router.get("/me", handleMe);

router.post("/login", validateForm, handleLogin);

router.post("/signup", validateForm, handleSignup);

module.exports = router;
