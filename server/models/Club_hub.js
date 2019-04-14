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
  },
  mission:{
    type: String

  },
  vision:{
    type: String
  }

});
Club_hubSchema.index({ brief_description:"text", name:"text"});

module.exports = mongoose.model("club_hub", Club_hubSchema);
