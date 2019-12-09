const mongoose = require("mongoose");

const Escape = mongoose.model("Escape", {
  title: String,
  name: String,
  address: String,
  location: {
    lng: Number,
    lat: Number
  },
  level: String,
  category: {
    searching: Number,
    manipulation: Number,
    reasoning: Number
  },
  rating: Number,
  description: String,
  pictures: String,
  price: String,
  players: String,
  website: String
});

module.exports = Escape;
