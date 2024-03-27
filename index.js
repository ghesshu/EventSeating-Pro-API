const express = require("express");
const mongoose = require("mongoose");
const StartServer = require("./controllers/serverController");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
); // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route Files
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const tableRoute = require("./routes/tableRoute");
const guestRoute = require("./routes/guestRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", tableRoute);
app.use("/api", guestRoute);

StartServer(app);
