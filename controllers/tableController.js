const Table = require("../models/tableModel");

const AllTable = async (req, res) => {
  try {
    const tables = await Table.find({});

    // Create a new array with the desired information for each table
    const simplifiedTables = tables.map((table) => {
      return {
        _id: table._id,
        table_name: table.table_name,
        seats: table.seats,
        total_guests: table.guests.length, // Assuming guests is an array field
      };
    });

    res.status(200).json(simplifiedTables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const TableByID = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id).populate("guests");
    if (!table) {
      return res
        .status(404)
        .json({ message: `Cannot find Table with id ${id}` });
    }
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateTable = async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(200).json({ message: "Table Added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findByIdAndUpdate(id, req.body);

    if (!table) {
      return res
        .status(404)
        .json({ message: `Cannot find Table with ID ${id}` });
    }

    res.status(200).json({ message: `Updated Successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findByIdAndDelete(id);
    if (!table) {
      return res
        .status(404)
        .json({ message: `Cannot find Table with ID ${id}` });
    }
    res.status(200).json({ message: `Table Deleted Successfully` });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  AllTable,
  TableByID,
  CreateTable,
  DeleteTable,
  UpdateTable,
};
