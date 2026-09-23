const express = require("express");
const { requireAuth, requirePremium } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", requireAuth, (req, res) => res.json({ success: true, subscription: req.user.subscriptionStatus }));
router.get("/premium-guide", requireAuth, requirePremium, (_req, res) => res.json({ success: true, data: { title: "Premium destination planning guide", message: "Premium access confirmed." } }));

module.exports = router;
