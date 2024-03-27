const Guest = require("../models/guestModel");
const Table = require("../models/tableModel");

const AllGuest = async (req, res) => {
  try {
    const guest = await Guest.find().populate("table", "table_name");
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GuestByID = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findById(id).populate("table", "table_name");
    if (!guest) {
      return res
        .status(404)
        .json({ message: `Cannot find Guest with id ${id}` });
    }
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateGuest = async (req, res) => {
  try {
    const tableID = req.body.table;
    if (!tableID) {
      return res.status(422).json({ message: `please enter table id` });
    }
    const table = await Table.findById(tableID);

    if (!table) {
      return res.status(422).json({ message: `Invalid Table Id` });
    }

    if (table.guests?.length === table.seats) {
      return res.status(422).json({ message: `Table Seat is full` });
    }
    const guest = await Guest.create(req.body);
    // Update the table model
    table.guests.push(guest._id); // Assuming the guest model has an '_id' property
    await table.save();
    res.status(200).json({ message: "Guest Added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateGuest = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the guest based on the provided ID
    const guest = await Guest.findById(id);
    if (!guest) {
      return res
        .status(404)
        .json({ message: `Cannot find Guest with ID ${id}` });
    }

    if (req.body.newTable) {
      const oldTableID = guest.table;
      const newTableID = req.body.newTable;

      if (oldTableID !== newTableID) {
        const oldTable = await Table.findById(oldTableID);
        if (!oldTable) {
          return res.status(422).json({ message: `Invalid Old Table Id` });
        }

        // Fix the line to use oldTable.guests instead of Table.guests
        oldTable.guests = oldTable.guests.filter(
          (_id) => _id.toString() !== id
        );
        await oldTable.save();

        const newTable = await Table.findById(newTableID);
        if (!newTable) {
          return res.status(422).json({ message: `Invalid New Table Id` });
        }
        newTable.guests.push(guest._id); // Assuming the guest model has an '_id' property
        await newTable.save();
      }
    }

    // Update the guest information
    const updatedGuest = await Guest.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: `Updated Successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByIdAndDelete(id);
    if (!guest) {
      return res
        .status(404)
        .json({ message: `Cannot find Guest with ID ${id}` });
    }
    res.status(200).json({ message: `Guest Deleted Successfully` });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const updateGuestsStatus = async (req, res) => {
  try {
    const { id } = req.params; // Extract guest ID from URL parameter
    const guest = await Guest.findById(id);

    if (!guest) {
      return res.status(404).json({ message: `Guest not found with ID ${id}` });
    }

    // Update the guest with the data from req.body
    await Guest.findByIdAndUpdate(id, req.body);

    res
      .status(200)
      .json({ message: `Guest with ID ${id} updated successfully.` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  AllGuest,
  GuestByID,
  CreateGuest,
  DeleteGuest,
  UpdateGuest,
  updateGuestsStatus,
};
