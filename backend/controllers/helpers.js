const mongoose = require("mongoose");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const sendValidationError = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid request data" });
  }

  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: "A duplicate record already exists" });
  }

  console.error(error);
  return res.status(500).json({ success: false, message: "Server error" });
};

const requireValidId = (res, id) => {
  if (!isValidId(id)) {
    res.status(400).json({ success: false, message: "Invalid ID" });
    return false;
  }

  return true;
};

module.exports = { isValidId, requireValidId, sendValidationError };