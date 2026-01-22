const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await Employee.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = new Employee({ name, email, password });
    await newUser.save();

    res.status(201).json({ name: newUser.name, email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await Employee.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
