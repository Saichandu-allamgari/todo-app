const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    req.session.user = user;
    req.session.save((err) => {  // ✅ Explicitly save the session
      if (err) {
        return res.status(500).json({ error: "Session save failed" });
      }
      res.status(201).json({ message: "User registered", user });
    });

    // res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" }); // 401 if user does not exist
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.user = user;
    req.session.save((err) => {  // ✅ Save session before responding
      if (err) {
        return res.status(500).json({ error: "Session save failed" });
      }
      res.json({ message: "Login successful", user });
    });
    // res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
});

// Get User Info
router.get("/me", (req, res) => {
  res.json(req.session.user || null);
});

module.exports = router;