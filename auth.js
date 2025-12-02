const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secretkey");
  res.json({ message: "Login Success", token });
});

module.exports = router;
