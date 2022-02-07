const router = require("express").Router(); // router method for using express framework
const User = require("../models/User"); // User model used in this js
const bcrypt = require("bcrypt"); // import bcrypt library

// REGISTER
router.post("/register", async (req, res) => {
  /*create new user
we don't know how it take to connect to DB and create new one and return res. so use "async" function

req: what we send our server
res: after req. server return result
post: create new one
put: update, exist
delete: delete
get: fetch, not change*/
  try {
    // if use async fun. need to "try and catch"
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(
      req.body.password, // original string
      salt
    );
    // create hashed password
    const newUser = new User({
      // inside of things are req of new User model. it's gonna take whatever we sent. prevent to indicate unrelated things(ex. title) we should write specific properties
      username: req.body.username,
      email: req.body.email,
      password: hashedPass, // import hased password
    });

    const user = await // async process
    newUser.save(); // save upper new User model's properties. this method is coming from our mogoose because we are using userschema above

    res.status(200).json(
      user // you can send "user" directly cuz user has been created
    ); // everything successful indicate status and res
  } catch (err) {
    res.status(500).json(err); // if you fail. means something wrong with mongoDB or express server after that return err
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // send user info.
  try {
    const user = await User.findOne({
      // try to find matched only one user with input value in mongoDB
      username: req.body.username, // find condition
    });

    const validated = await bcrypt.compare(req.body.password, user.password); // try to compare password with input value in mongoDB

    // we are sending password above but i don't wanna send this pass to user how to prevent it ↓
    const {
      password,
      ...others
      // we can take anything in "User" model
    } = user._doc; // _doc is in the mongoDB
    res.status(200).json(others); // send others except for password
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; // export routes file
