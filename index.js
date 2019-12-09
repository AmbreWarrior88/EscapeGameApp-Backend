const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const Escape = require("./Models/Escape.js");

// CREATE OF SERVER
const app = express();
app.use(cors());

// ACTIVATE FORMIDABLE
app.use(formidable());

mongoose.connect("mongodb://localhost/add-escape", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ROUTE
// CREATE NEW ESCAPE

app.post("/add-escape", async (req, res) => {
  const {
    title,
    name,
    address,
    location,
    level,
    category,
    rating,
    description,
    pictures,
    price,
    players,
    website
  } = req.fields;

  try {
    const newEscape = new Escape({
      title,
      name,
      address,
      location: { lng: location.lng, lat: location.lat },
      level,
      category: {
        searching: category.searching,
        manipulation: category.manipulation,
        reasoning: category.reasoning
      },
      rating,
      description,
      pictures,
      price,
      players,
      website
    });
    await newEscape.save();
    res.json({ message: "Escape created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ

app.get("/", async (req, res) => {
  try {
    const foundEscapeGames = await Escape.find();
    res.status(200).json(foundEscapeGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
app.post("/update", async (req, res) => {
  try {
    if (req.fields.id) {
      const Escape = await Escape.findById(req.fields.id);

      await Escape.save();
      res.json({ message: "Updated" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE

app.post("/delete", async (req, res) => {
  try {
    if (req.fields.id) {
      const Escape = await Student.findById(req.fields.id);
      await Escape.remove();
      res.json({ message: "Removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// STARTED SERVER

app.listen(4000, () => {
  console.log("Server has started");
});
