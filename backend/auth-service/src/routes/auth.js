import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modles/User.js";
import dotenv from 'dotenv';
import passport from "passport";
dotenv.config();

const AuthRouter = express.Router();

// Helper to generate JWT
const generateJWT = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// Signup
AuthRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = generateJWT(user);
    res.status(201).json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = generateJWT(user);

    res.status(200).json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Google OAuth login
AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/auth/login` }),
  (req, res) => {
    const token = generateJWT(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth/login/?token=${token}`);
  }
);

export default AuthRouter;