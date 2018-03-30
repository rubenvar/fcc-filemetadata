// init project
const express = require('express');
const multer  = require('multer');
const app = express();
const upload = multer();
let fileSize = {};

//manage access to /
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// manage the POST request from the form with multer
app.post("/", upload.single('thefile'), (req, res) => {
  fileSize = {size: req.file.size};
  res.redirect('/file-size');
});

//manage result in /file-size
app.get("/file-size", (req, res) => {
  res.json(fileSize);
})

// listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
