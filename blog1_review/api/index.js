const express = require("express"); // create server
const app = express(); // create application
const dotenv = require("dotenv"); // import dotenv
const mongoose = require("mongoose"); // import mongoose
const authRoute = require("./routes/auth"); // import routes file auth
const userRoute = require("./routes/users"); // import routes file users
const postRoute = require("./routes/posts"); // import routes file posts
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

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
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage }); // use my app on web
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

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

- 입력 후 package.json에서 "start": "nodemon index.js"로 수정
- nodemon index.js

.env 파일 안에 보안 유지 필요한 사항 입력 ex) mongoDB code

*/
