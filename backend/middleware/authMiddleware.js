const crypto = require("crypto");
const User = require("../models/User");

const tokenSecret = () => process.env.AUTH_SECRET || process.env.MONGO_URI || "development-auth-secret";

const signToken = (userId) => {
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
};

const verifyToken = (token) => {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature) return null;
  const expected = crypto.createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  return data.exp > Date.now() ? data : null;
};

const toPublicUser = (user) => ({ id: user._id, name: user.name, email: user.email, subscription: user.subscriptionStatus });

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const data = verifyToken(token);
    if (!data) return res.status(401).json({ success: false, message: "Authentication required" });
    const user = await User.findById(data.sub);
    if (!user) return res.status(401).json({ success: false, message: "Authentication required" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
};

const requirePremium = (req, res, next) => {
  if (req.user?.subscriptionStatus !== "PREMIUM") {
    return res.status(403).json({ success: false, message: "Premium subscription required", code: "PREMIUM_REQUIRED" });
  }
  next();
};

module.exports = { requireAuth, requirePremium, signToken, toPublicUser };
