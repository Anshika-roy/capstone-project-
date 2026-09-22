const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000
    },
    images: {
      type: [String],
      default: []
    },
    attractions: {
      type: [String],
      default: []
    },
    activities: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      trim: true
    },
    budget: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Destination", destinationSchema);