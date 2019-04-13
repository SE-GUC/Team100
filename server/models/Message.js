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
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = message = mongoose.model("messages", messagesSchema);
