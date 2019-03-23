const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const LibrarySchema = new Schema({
  Academic_paper: {
    type: String,
    required: true
  },
  Resolution: {
    type: String,
    required: true
  },
  Year: {
    type: Number,
    required: true
  }
});

module.exports = Library = mongoose.model("Library", LibrarySchema);
