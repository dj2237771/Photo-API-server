"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");

const photos = require("./function/photoAPI");
const loggerMid = require("./middlewares/logger");
const validateMid = require("./middlewares/validate");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(loggerMid.logger);
app.get("/", (req, res) => {
  res.status(202).send("im alive and working");
});
// localHost:3000/searchImage?search=book
app.get("/searchImage", validateMid.validate, photos.getPhoto);
app.get("/searchRandomImage", photos.getRandomPhoto);

app.get("*", (req, res) => {
  res.status(404).send("not found");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
