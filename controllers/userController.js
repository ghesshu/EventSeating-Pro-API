const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { jwtDecode } = require("jwt-decode");

const AllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // Populate the posts array
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find User with id ${id}` });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const AddUser = async (req, res) => {
  try {
    console.log(req.body.role);
    console.log(jwtDecode(req.token));
    const role = req.body.role;
    if (!role || (role !== "admin" && role !== "super")) {
      return res.status(400).json({ message: "Invalid Role" });
    }

    const { email } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    const saltRounds = 10; // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user with the hashed password
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User Created Successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the request contains a new password
    let updatedData = { ...req.body };

    if (
      typeof updatedData.password === "string" &&
      updatedData.password !== ""
    ) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updatedData.password,
        saltRounds
      );
      updatedData.password = hashedPassword;
    } else {
      // Remove the password field if it's an empty string or not a string
      delete updatedData.password;
    }

    const user = await User.findByIdAndUpdate(id, updatedData);

    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find user with ID ${id}` });
    }

    res.status(200).json({ message: `User Updated Successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const DeletUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = jwtDecode(req.token);
    if (id === token.id) {
      return res
        .status(403)
        .json({ message: `Cannot Delete Current User ${id}` });
    }
    const user = await User.findByIdAndDelete(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Cannot find User with ID ${id}` });
    }

    res.status(200).json({ message: `User Deleted Sucessfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { AllUsers, AddUser, UserByID, UpdateUser, DeletUser };
