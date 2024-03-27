const express = require("express");
// const User = require("../models/userModel");
const { verifyToken, CheckUser } = require("../controllers/tokenController");
const {
  AllUsers,
  AddUser,
  UserByID,
  UpdateUser,
  DeletUser,
} = require("../controllers/userController");

const { Home } = require("../controllers/authController");

const router = express.Router();

// Apply verifyToken middleware to all product routes
router.use(verifyToken);

// Get All Users
router.get("/users", AllUsers);

// Get A User
router.get("/users/:id", UserByID);

// Add New User
router.post("/users", CheckUser, AddUser);

// Update User
router.put("/users/:id", CheckUser, UpdateUser);

// Delete User
router.delete("/users/:id", CheckUser, DeletUser);

module.exports = router;
