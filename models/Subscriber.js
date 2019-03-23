const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the subscribers
const SubscriberSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = Subscriber = mongoose.model("Subscriber", SubscriberSchema);
