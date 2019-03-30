const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date
    },
    password: {
        type: String,
        required: true
    },
    major: {
        type: String
    },
    telephone: {
        type: Number
    },
    photo: {
        type: String
    },
    gucian: {
        type: Boolean,
        required: true
    },
    club: {
        type: String
    },
    committee_type: {
        type: String
    },
    user_type: {
        type: String,
        required: true
    },
    control: {
        type: Boolean,
        required: true
    }
});

module.exports = User = mongoose.model("users", UserSchema);

