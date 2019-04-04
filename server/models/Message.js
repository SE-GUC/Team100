const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const messagesSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  committee: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  replied: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});

module.exports = message = mongoose.model("messages", messagesSchema);
