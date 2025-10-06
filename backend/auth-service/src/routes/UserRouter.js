import express from "express";
import User from "../modles/User.js";
import dotenv from 'dotenv';
dotenv.config();

const UserRouter = express.Router();

UserRouter.get("/", async (req, res) => {
    let { userId } = req.query;
    if (!userId) {
        return res.status(400).send({ message: "User Id is Required" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "No User found" });
        }
        // manually pick only required fields
        const filteredUser = {
            email: user.email,
            flightBookings: user.flightBookings,
            hotelBookings : user.hotelBookings,
        };
        res.status(200).send({ message: "User found", data: filteredUser });
    } catch (error) {
        res.status(500).send({ message: "Error fetching user", error });
    }
});






export default UserRouter;