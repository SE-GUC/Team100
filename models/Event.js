const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name_event: {
    type: String,
    required: true
  },
  club: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  photo: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "coming soon"
  },
  committee: {
    type: String
  },
  rating: {
    type: Number
  },
  ratingcount: {
    type: Number
  },
  rate: {
    type: Number
  }
});

module.exports = Event = mongoose.model("events", EventSchema);
