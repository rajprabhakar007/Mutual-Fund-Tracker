const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require('passport');

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});


router.post("/google-login", async (req, res) => {
  const { email, googleId, name } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      password: "google_auth", 
      name,
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});


module.exports = router;