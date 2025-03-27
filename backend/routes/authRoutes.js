const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Register
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hashedPassword });
//     req.session.user = user;

//     await req.session.save();
//     // res.status(201).json({ message: "User registered", user });
//   } catch (err) {
//     res.status(400).json({ error: "User already exists" });
//   }
// });
router.post("/register", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Debug request data

    // Validate request body
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Store user session
    req.session.user = user;
    await req.session.save(); 
    console.log("User session:", req.session.user); 

    // Send response after session is saved
    res.status(201).json({ message: "User registered successfully", user });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



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
    await req.session.save(); 
    res.json({ message: "Login successful", user });
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