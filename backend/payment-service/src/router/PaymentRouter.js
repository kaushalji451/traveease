import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from 'dotenv'
dotenv.config();

const PaymentRouter = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


PaymentRouter.get("/",(req,res)=>{
    res.send("checking for payment");
})

// Create order route
PaymentRouter.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: Math.floor(req.body.amount * 100), // amount in paise (100 INR = 10000)
      currency: "INR",
      receipt: `order_rcptid_${Math.random()}`,
    };
    console.log(options);

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// Verify payment route
PaymentRouter.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default PaymentRouter;
