const mongoose = require("mongoose")
const Schema = mongoose.Schema

const hierarchy = new Schema({
 position: {
   type: String,
   required: true
 },
 office: {
   type: String
 },
 name: {
   type: String
 },
 major: {
   type: String
 },
 experience: {
   type: String
 },
 photo:{
   type: String
 }

})
module.exports = Hierarchy = mongoose.model("hierarchy", hierarchy)

