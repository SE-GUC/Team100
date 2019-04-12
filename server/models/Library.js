const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create the schema
const LibrarySchema = new Schema({
  Academic_paper: {
    type: String,
  },
  Resolution: {
    type: String,
  },
  Year: {
    type: Number,
    required: true
  }
})
module.exports = Library = mongoose.model("Library", LibrarySchema)
