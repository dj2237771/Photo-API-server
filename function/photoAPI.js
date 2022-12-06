"use strict";

require("dotenv").config();
const superagent = require("superagent");

const KEY = process.env.ACESSID;

async function getPhoto(req, res) {
  const searchPhoto = req.query.search;
  const url = `https://api.unsplash.com/search/photos?query=${searchPhoto}&client_id=${KEY}`;
  superagent
    .get(url)
    .then((photoData) => {
      const photo = photoData.body.results;
      let photoObjects = photo.map((item) => {
        return new Photo(item);
      });

      res.status(200).send(photoObjects);
    })
    .catch((error) => {
      res.status(500).send(`Error something went wrong ${error}`);
    });
}
async function getRandomPhoto(req, res) {
  const url = `https://api.unsplash.com/photos/random/?client_id=${KEY}`;
  let photoInfo = await superagent.get(url);
  let photoData = photoInfo.body;
  console.log(photoData);
  let newPhto = new Photo(photoData);
  res.send(newPhto);
}
class Photo {
  constructor(data) {
    this.name = data.id;
    this.discrption = data.description;
    this.url = data.urls.full;
  }
}

module.exports = { getPhoto, getRandomPhoto };
