const crypto = require("crypto");
const User = require("../models/User");
const { signToken, toPublicUser } = require("../middleware/authMiddleware");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => ({
  salt,
  hash: crypto.scryptSync(password, salt, 64).toString("hex")
});
const passwordMatches = (password, stored) => {
  const derived = crypto.scryptSync(password, stored.salt, 64);
  return crypto.timingSafeEqual(derived, Buffer.from(stored.hash, "hex"));
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !emailPattern.test(email)) return res.status(400).json({ success: false, message: "Name, valid email, and password are required" });
  if (password.length < 6) return res.status(400).json({ success: false, message: "Password must contain at least 6 characters" });
  try {
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ success: false, message: "An account with this email already exists" });
    const passwordData = hashPassword(password);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash: `${passwordData.salt}:${passwordData.hash}` });
    return res.status(201).json({ success: true, data: { token: signToken(user._id.toString()), user: toPublicUser(user) } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to create account" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: String(email || "").trim().toLowerCase() }).select("+passwordHash");
    const [salt, hash] = String(user?.passwordHash || ":").split(":");
    if (!user || !salt || !hash || !passwordMatches(password || "", { salt, hash })) return res.status(401).json({ success: false, message: "Invalid email or password" });
    return res.json({ success: true, data: { token: signToken(user._id.toString()), user: toPublicUser(user) } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to log in" });
  }
};

const me = (req, res) => res.json({ success: true, data: { user: toPublicUser(req.user), subscription: req.user.subscriptionStatus } });
const logout = (_req, res) => res.json({ success: true, message: "Logged out" });

module.exports = { register, login, me, logout };
