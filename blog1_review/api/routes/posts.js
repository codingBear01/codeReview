const router = require("express").Router(); // router method for using express framework
const User = require("../models/User"); // User model used in this js
const Post = require("../models/Post"); // Post model used in this js

// CREATE POST
router.post("/", async (req, res) => {
  // create new post
  const newPost = new Post(req.body); // take everything inside body into Post

  try {
    const savedPost = await newPost.save(); // save post
    res.status(200).json(savedPost); // if success send savedPost
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  // find user id and compare and update if match
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body, // everything inside body
          },
          { new: true } // without this you can't see updated info.
        );
        res.status(200).json(updatedPost); // if succssful send updatedPost
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!"); // if id not match
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // if match id?
      try {
        await post.delete(); // delete post
        res.status(200).json("Post has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post); // taking id from /:id URL and get post
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  // http://localhost:5000/api/posts?user=<username> you can see only post by this user
  const catName = req.query.cat;
  try {
    let posts; // create post array
    if (username) {
      posts = await Post.find({ username }); // it finds same username in Post. if condition is {username: username} you can write {username} form es6
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName], // in method: if catName is in inside of categories(array) just find and assign to this post
        },
      });
    } else {
      posts = await Post.find(); // there no username, catName just show all posts
    }
    res.status(200).json(posts); // send posts(array)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; // export routes file
