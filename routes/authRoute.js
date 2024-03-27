const express = require("express");
// const jwt = require("jsonwebtoken");
const { Login, Home } = require("../controllers/authController");

const router = express.Router();

router.get("/", Home);

router.post("/login", Login);

module.exports = router;
