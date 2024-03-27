// const express = require("express");

// const app = express();

const mongoose = require("mongoose");

async function StartServer(app) {
  try {
    mongoose.set("strictQuery", false);

const uri = process.env.DB_URI;

    await mongoose.connect(uri);
    // "mongodb+srv://Yramm:Fafajay11@hughesapi.hnrn2xr.mongodb.net/OPC-BLOG-API?retryWrites=true&w=majority"
    console.log("Connected to database");

    app.listen(5000, () => {
      console.log("Event API app is running on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = StartServer;
