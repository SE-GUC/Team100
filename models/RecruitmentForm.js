const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema

const RecSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  telephone_number: {
    type: Number,
    required: true
  },
  Year_of_Study: {
    type: Number,
    required: true
  },
  Means_of_Transportation: {
    type: String,
    required: true
  },
  Council_Office1: {
    type: String,
    required: true
  },
  Council_Office2: {
    type: String
  },
  Previous_Experience: {
    type: String
  }
});

module.exports = RecruitmentForm = mongoose.model(
  "recruitmentforms",
  RecSchema
);
