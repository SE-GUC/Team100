const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FAQSchema = new Schema({
  question: {
    type: String,

    required: true
  },

  answer: {
    type: String,

    required: true
  }
});
FAQSchema.index({ question: "text", answer: "text" });

module.exports = Faq = mongoose.model("faqs", FAQSchema);
