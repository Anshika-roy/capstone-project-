const crypto = require("crypto");
const Razorpay = require("razorpay");
const User = require("../models/User");

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

const createSubscriptionOrder = async (req, res) => {
  try {
    const razorpay = getRazorpay();
    if (!razorpay) return res.status(503).json({ success: false, message: "Razorpay test mode is not configured" });
    if (req.user.subscriptionStatus === "PREMIUM") return res.status(409).json({ success: false, message: "Premium is already active" });
    const order = await razorpay.orders.create({ amount: 50000, currency: "INR", receipt: `pro_${Date.now()}`, notes: { purpose: "Travel Destination Explorer Pro subscription" } });
    await User.findByIdAndUpdate(req.user._id, { razorpayOrderId: order.id });
    return res.status(201).json({ success: true, data: { orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID } });
  } catch (error) {
    console.error("Razorpay subscription order creation failed.");
    return res.status(500).json({ success: false, message: "Unable to create subscription order" });
  }
};

const verifySubscriptionPayment = async (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
  if (!orderId || !paymentId || !signature) return res.status(400).json({ success: false, message: "Payment verification data is incomplete" });
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "").update(`${orderId}|${paymentId}`).digest("hex");
  if (expected !== signature || String(req.user.razorpayOrderId) !== orderId) return res.status(400).json({ success: false, message: "Payment verification failed" });
  const user = await User.findByIdAndUpdate(req.user._id, { subscriptionStatus: "PREMIUM", razorpayPaymentId: paymentId }, { new: true });
  return res.json({ success: true, subscription: user.subscriptionStatus });
};

module.exports = { createPayment, createSubscriptionOrder, verifySubscriptionPayment };