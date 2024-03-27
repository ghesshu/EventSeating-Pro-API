const { default: mongoose } = require("mongoose");

const tableSchema = mongoose.Schema({
  table_name: {
    type: String,
    required: [true, "Please Enter Table Name"],
  },
  seats: {
    type: Number,
    required: [true, "Please enter table seats"],
  },
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: false,
    },
  ],
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
