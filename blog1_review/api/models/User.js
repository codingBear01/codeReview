const mongoose = require("mongoose"); // import mongoose

const UserSchema = new mongoose.Schema( // create schema
  {
    username: {
      type: String,
      required: true,
      unique: true, // if you wanna set this value as only one
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "User", // model name
  UserSchema // schema name
); // export shema
