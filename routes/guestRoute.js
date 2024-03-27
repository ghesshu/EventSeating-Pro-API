const express = require("express");
const { verifyToken, CheckUser } = require("../controllers/tokenController");
const {
  AllGuest,
  GuestByID,
  CreateGuest,
  UpdateGuest,
  DeleteGuest,
  updateGuestsStatus,
} = require("../controllers/guestController");

const router = express.Router();

// Apply verifyToken middleware to all product routes
router.use(verifyToken);

// Apply verifyToken middleware to all product routes
router.use(verifyToken);

// Get All Guest
router.get("/guest", AllGuest);

// Get A Event
router.get("/guest/:id", GuestByID);

// Add New Event
router.post("/guest", CheckUser, CreateGuest);

// Update Event
router.put("/guest/:id", CheckUser, UpdateGuest);

// Delete Event
router.delete("/guest/:id", CheckUser, DeleteGuest);

// Assuming your route is defined like this
router.patch("/guest/:id", updateGuestsStatus);

module.exports = router;
