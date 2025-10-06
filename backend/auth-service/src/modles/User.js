import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    flightBookings: [
        {
            pnr: { type: String },
            bookedAt: { type: Date, default: Date.now },
        }
    ],
    hotelBookings: [
        {
            bookingNumber: { type: String },
            bookedAt: { type: Date, default: Date.now },
        }
    ]
}, { timestamps: true }
);

export default mongoose.model("User", userSchema);