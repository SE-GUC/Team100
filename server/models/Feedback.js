const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const FeedbackSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  anonymous: {
    type: Boolean,
    default: false
  }
});
module.exports = Feedback = mongoose.model("feedbacks", FeedbackSchema);
