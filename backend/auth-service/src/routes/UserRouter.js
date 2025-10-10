import express from "express";
import User from "../modles/User.js";
import dotenv from "dotenv";
dotenv.config();

const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "No user found" });
    }

    // ✅ Pick only the required safe fields
    const filteredUser = {
      // Contact details
      email: user.email,
      mobile: user.mobile || "",

      // Passenger details
      passengerType: user.passengerType || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      dob: user.dob || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",

      // Booking details
      flightBookings: user.flightBookings || [],
      hotelBookings: user.hotelBookings || [],
    };

    res.status(200).send({
      message: "User found",
      data: filteredUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({
      message: "Error fetching user",
      error: error.message,
    });
  }
});

// ✅ Update user details
UserRouter.put("/updateuser", async (req, res) => {
  try {
    const { passengerType, firstName, lastName, dob, address, city, state, pincode } = req.body;
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        passengerType,
        firstName,
        lastName,
        dob,
        address,
        city,
        state,
        pincode,
      },
      { new: true } // return updated document
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default UserRouter;
