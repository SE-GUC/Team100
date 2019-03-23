const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const PhotoSchema = new Schema({
  album_ID: {
    type: Number,
    required: true
  },
  Link: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
});

module.exports = Photo = mongoose.model("Phtoto", PhotoSchema);
