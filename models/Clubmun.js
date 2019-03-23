const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClubMunSchema = new Schema({
  mission: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  }
})

module.exports = Clubmun = mongoose.model("clubmuns", ClubMunSchema)
