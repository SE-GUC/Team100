const mongoose = require("mongoose")
const Schema = mongoose.Schema

const achievement = new Schema({
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  tag: {
    type: String
  }
})
achievement.index({description:"text", tag:"text"});
module.exports = Achievement = mongoose.model("achievements", achievement)
