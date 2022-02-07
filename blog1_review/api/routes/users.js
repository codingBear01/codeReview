const router = require("express").Router(); // router method for using express framework
const User = require("../models/User"); // User model used in this js
const Post = require("../models/Post"); // Post model used in this js
const bcrypt = require("bcrypt"); // import bcrypt library

// UPDATE
router.put(
  "/:id", //find user by /:id URL and update that
  async (req, res) => {
    // update user info.
    if (req.body.userId === req.params.id) {
      /*
      here params is req. but not body. taking from /:id URL

      parameter passes values into functions. and the names listed in the function's definition. A parameter is a named variable passed into a function. Parameter variables are used to import arguments into functions. 

      function example(parameter) {
        console.log(parameter); // Output = foo
      }
      const argument = 'foo';
      example(argument); */

      if (req.body.password) {
        // if we are sending any password in body. we are gonna hash password again.
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await // to reach user inside mongoDB
        User.findByIdAndUpdate(
          req.params.id, // taking from id /:id URL and update
          {
            $set: req.body, // everything inside body
          },
          { new: true } // without this you can't see updated info.
        );
        res.status(200).json(updatedUser); // send updated user
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  }
);

// DELETE
router.delete(
  "/:id",
  //find user by /:id URL and delete that
  async (req, res) => {
    // delete user info.
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id); // find user id by input id value on /:id URL
        try {
          await Post.deleteMany({ username: user.username }); // delete post of this found user
          await User.findByIdAndDelete(req.params.id); // taking from id value /:id URL and delete
          res.status(200).json("User has been deleted!");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  }
);

// GET USER
router.get("/:id", async (req, res) => {
  // get just one user
  try {
    const user = await User.findById(req.params.id); // find user id by input id value on /:id URL
    const { password, ...others } = user._doc; // _doc is in the mongoDB
    res.status(200).json(others); // send others except for password
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; // export routes file
