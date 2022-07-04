const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;
const config = require("./config/key.js");
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { pw } = require("./pw.js"); //import mongodb password
app.use("/api/post", require("./Router/post.js"))
app.listen(port, () => {
  mongoose
    .connect(
      config.mongoURI
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log(`Connecting mongodb`);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


