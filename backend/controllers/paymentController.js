const crypto = require("crypto");
const Razorpay = require("razorpay");

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_") || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
};

const createPayment = async (req, res) => {
  try {
    const razorpay = getRazorpay();
    if (!razorpay) return res.status(503).json({ success: false, message: "Razorpay test mode is not configured" });

    const { amount, currency = "INR" } = req.body;
    const amountInRupees = Number(amount);
    if (!Number.isFinite(amountInRupees) || amountInRupees <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number in rupees" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amountInRupees * 100),
      currency: currency.toUpperCase(),
      receipt: `td_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`,
      notes: { purpose: "Travel Destination Explorer test payment" }
    });
    return res.status(201).json({
      success: true,
      message: "Razorpay test order created",
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error("Razorpay test order creation failed.");
    return res.status(500).json({ success: false, message: "Unable to create Razorpay test order" });
  }
};

module.exports = { createPayment };