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
  passengerType: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  flightBookings: [
    {
      pnr: { type: String },
      bookedAt: { type: Date, default: Date.now },
    },
  ],
  hotelBookings: [
    {
      bookingNumber: { type: String },
      bookedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
