const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  photo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Photo"
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Album = mongoose.model("albums", AlbumSchema);
