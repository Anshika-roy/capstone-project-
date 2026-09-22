const Destination = require("../models/Destination");
const { requireValidId, sendValidationError } = require("./helpers");

const getDestinations = async (req, res) => {
  try {
    const { search, category, state, country, budget } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { attractions: { $regex: search, $options: "i" } },
        { activities: { $regex: search, $options: "i" } }
      ];
    }
    if (category) filter.category = { $regex: category, $options: "i" };
    if (state) filter.state = { $regex: state, $options: "i" };
    if (country) filter.country = { $regex: country, $options: "i" };
    if (budget) filter.budget = { $regex: budget, $options: "i" };

    const destinations = await Destination.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: destinations });
  } catch (error) {
    return sendValidationError(res, error);
  }
};

const getDestination = async (req, res) => {
  try {
    if (!requireValidId(res, req.params.id)) return;
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: "Destination not found" });
    return res.status(200).json({ success: true, data: destination });
  } catch (error) {
    return sendValidationError(res, error);
  }
};

const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    return res.status(201).json({ success: true, data: destination });
  } catch (error) {
    return sendValidationError(res, error);
  }
};

module.exports = {
  getDestinations,
  getDestination,
  createDestination
};