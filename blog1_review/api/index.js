const express = require("express"); // create server
const app = express(); // create application
const dotenv = require("dotenv"); // import dotenv
const mongoose = require("mongoose"); // import mongoose
const authRoute = require("./routes/auth"); // import routes file auth
const userRoute = require("./routes/users"); // import routes file users
const postRoute = require("./routes/posts"); // import routes file posts
const categoryRoute = require("./routes/categories"); // import routes file categories
const multer = require("multer"); // import multer library
const path = require("path"); // import path library

dotenv.config(); // use dotenv
app.use(express.json()); // send any json object to update information
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose // connection to mongoDB method
  .connect(process.env.MONGO_URL) // use env file
  .then(
    console
      .log("Connected to MongoDB!") // this msg is indicated on terminal if you connect to mongoDB successfully
      .catch((err) => console.log(err)) // err msg
  );

/*  No More Deprecation Warning Options mongoose ODM v6.2.0
useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.

// No longer necessary:
mongoose.set('useFindAndModify', false);

await mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, // <-- no longer necessary
  useUnifiedTopology: true // <-- no longer necessary
});*/

const storage = multer.diskStorage({
  // returns a StorageEngine implementation configured to store files on the local system
  destination: (
    req,
    file,
    cb // callback function takes care of our arrows if there is any error
  ) => {
    cb(null, "images"); // create a storage
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // send file name to react file
  },
});

const upload = multer({
  storage: storage, // this storage is that we set above
}); // use my app on web
app.post(
  "/api/upload",
  upload.single("file"), // upload only one file
  (req, res) => {
    res.status(200).json("File has been uploaded!");
  }
);

// connect to URL_routes files
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(
  "5000", // port number
  () => {
    console.log("Backend is running!"); // this msg is indicated on terminal if you connect to mongoDB successfully
  }
);

/*
const express = require("express"); 
const app = express(); 
app.listen("5000",
() => {
  console.log("Backend is running!");
});

- �Է� �� package.json���� "start": "nodemon index.js"�� ����
- nodemon index.js

.env ���� �ȿ� ���� ���� �ʿ��� ���� �Է� ex) mongoDB code

*/
