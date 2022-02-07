const mongoose = require("mongoose"); // import mongoose

const CategorySchema = new mongoose.Schema( // create schema
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Category", // model name
  CategorySchema // schema name
); // export shema
