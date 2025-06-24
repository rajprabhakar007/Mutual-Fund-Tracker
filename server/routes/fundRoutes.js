const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const axios = require("axios");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

router.post("/save", auth, async (req, res) => {
  const fund = req.body;
  req.user.savedFunds.push(fund);
  await req.user.save();
  res.json({ message: "Fund saved" });
});

router.get("/saved", auth, async (req, res) => {
  res.json(req.user.savedFunds);
});

router.get("/list", async (req, res) => {
  try {
    const response = await axios.get("https://api.mfapi.in/mf", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Axios error:", err.message);
    if (err.response) {
      console.error("Status code:", err.response.status);
      console.error("Response body:", err.response.data);
    }
    res.status(500).json({ error: "Failed to fetch mutual fund list" });
  }
});

router.delete("/remove/:fundCode", auth, async (req, res) => {
  try {
    const { fundCode } = req.params;

    
    req.user.savedFunds = req.user.savedFunds.filter(
      (f) => f.fundCode !== fundCode
    );

    await req.user.save(); 
    res.json({ message: "Fund removed" });
  } catch (err) {
    console.error("Error removing fund:", err); 
    res.status(500).json({ error: "Failed to remove fund" });
  }
});

module.exports = router;