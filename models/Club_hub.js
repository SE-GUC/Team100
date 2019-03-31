const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema

const Club_hubSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brief_description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("club_hub", Club_hubSchema);
