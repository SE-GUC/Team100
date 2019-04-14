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
    type: [String]
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  }
});
AlbumSchema.index({title:"text", description:"text"});

module.exports = Album = mongoose.model("albums", AlbumSchema);
