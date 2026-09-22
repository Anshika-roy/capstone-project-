const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submitForm = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }
  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, message: "A valid email is required" });
  }

  return res.status(200).json({
    success: true,
    message: "Form data received successfully",
    data: { name: name.trim(), email: email.trim().toLowerCase() }
  });
};

module.exports = { submitForm };