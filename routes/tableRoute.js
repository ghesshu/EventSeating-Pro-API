const express = require("express");
const { verifyToken, CheckUser } = require("../controllers/tokenController");
const {
  AllTable,
  TableByID,
  CreateTable,
  UpdateTable,
  DeleteTable,
} = require("../controllers/tableController");

const router = express.Router();

// Apply verifyToken middleware to all product routes
// router.use(verifyToken);

// Apply verifyToken middleware to all product routes
router.use(verifyToken);

// Get All Table
router.get("/table", AllTable);

// Get A Event
router.get("/table/:id", TableByID);

// Add New Event
router.post("/table", CheckUser, CreateTable);

// Update Event
router.put("/table/:id", CheckUser, UpdateTable);

// Delete Event
router.delete("/table/:id", CheckUser, DeleteTable);

module.exports = router;
