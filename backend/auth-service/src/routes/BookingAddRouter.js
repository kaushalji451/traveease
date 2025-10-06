import express from "express";
import User from "../modles/User.js";
import dotenv from 'dotenv';
dotenv.config();

const BookingRouter = express.Router();

BookingRouter.post("/add-flight-booking", async (req, res) => {
  try {
    console.log("callign for userid with that");
    const { userId, pnr } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
  
    user.flightBookings.push({ pnr, bookedAt: new Date() });
    await user.save();
    res.json({ success: true });
  } catch (error) {
     console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

BookingRouter.post("/add-hotel-booking", async (req, res) => {
  console.log(req.body);
  try {
    const { userId, hotelBookings } = req.body;  
    if (!hotelBookings) return res.status(400).json({ error: "Booking number required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.hotelBookings.push({ bookingNumber: hotelBookings });
    await user.save();

    res.status(201).json({ success: true, hotelBookings: user.hotelBookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });  
  }
});

export default BookingRouter;