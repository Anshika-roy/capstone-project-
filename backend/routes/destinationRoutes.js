const express = require("express");
const {
  getDestinations,
  getDestination,
  createDestination
} = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getDestinations);
router.get("/:id", getDestination);
router.post("/", createDestination);

module.exports = router;