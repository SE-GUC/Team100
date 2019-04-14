const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const CommitteeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  page: {
    type: String,
    required: true
  },
  events: {
    type: [String],
    required: true
  },
  team_members: {
    type: [String],
    required: true
  }
});

module.exports = Committee = mongoose.model("committees", CommitteeSchema);
