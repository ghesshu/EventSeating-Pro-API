const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: [true, "Please enter last name"],
  },
  phone_number: {
    type: String,
    required: [true, "Please enter phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: [true, "Please select Table"],
  },
  status: {
    type: Boolean,
    default: false, // Set a default value if needed
  },
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
