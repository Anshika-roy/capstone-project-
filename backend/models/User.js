const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    subscriptionStatus: { type: String, enum: ["FREE", "PREMIUM"], default: "FREE" },
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
