const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegFTSchema = new Schema(
  {
    FormName: {
      type: String,
      required: true
    }
  },
  { strict: false }
);

module.exports = FormTemplate = mongoose.model("FormTemplate", RegFTSchema);
