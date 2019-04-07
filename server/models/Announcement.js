const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the announcements
const AnnouncementSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  title: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  videos: {
    type: String
  },
  photos: {
    type: String
  },
  __v: {
    type: Number,
    select: false
  }
});
AnnouncementSchema.index({ description:"text", tag:"text"});

module.exports = Announcement = mongoose.model(
  "Announcement",
  AnnouncementSchema
);
