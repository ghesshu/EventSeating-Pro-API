const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter firstname"],
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      required: [true, "Please enter lastname"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    role: {
      type: String,
      required: [true, "Please enter role"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
