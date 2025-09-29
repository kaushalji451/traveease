import express from "express";
import { verifyToken } from "../middleware/auth.js";

const protectedRoutes = express.Router();

protectedRoutes.get("/verify", verifyToken, (req, res) => {
  // Send back user info
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
    },
    message: "Token verified successfully",
  });
});

export default protectedRoutes;
