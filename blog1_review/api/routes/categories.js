const router = require("express").Router(); // router method for using express framework
const Category = require("../models/Category"); // Category model used in this js

// create single category
router.post("/", async (req, res) => {
  // create new category
  const newCat = new Category(req.body); // take everything inside body into Category
  try {
    const savedCat = await newCat.save(); // save category
    res.status(200).json(savedCat); // if success send savedCat
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all categories
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find(); // gets a list of documents that match filter
    res.status(200).json(cats); // if success send cats
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; // export routes file
