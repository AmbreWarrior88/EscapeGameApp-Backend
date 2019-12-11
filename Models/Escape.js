const mongoose = require("mongoose");

const Escape = mongoose.model("Escape", {
  theme: String,
  levels: String,
  players: String,
  domain: String,
  rating: Number,
  "user-rating": Number,
  "room-snooping": Number,
  "room-handling": Number,
  "room-thinking": Number,
  thumbnail: String,
  summury: String,
  name: String,
  company: String,
  content: String,
  booking: String,
  price: String,
  location: [Object]
});

module.exports = Escape;
