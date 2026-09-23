const express = require("express");
const { createPayment, createSubscriptionOrder, verifySubscriptionPayment } = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", createPayment);
router.post("/create-order", requireAuth, createSubscriptionOrder);
router.post("/verify", requireAuth, verifySubscriptionPayment);

module.exports = router;