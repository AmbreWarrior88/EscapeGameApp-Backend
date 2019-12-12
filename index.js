const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const Escape = require("./Models/Escape.js");

// CREATE OF SERVER
const app = express();
app.use(cors());

// ACTIVATE FORMIDABLE
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ROUTE
// CREATE NEW ESCAPE

app.get("/escape-add", async (req, res) => {
  const escape = fs.readFileSync("./data/games.json", "utf-8");
  try {
    await Escape.remove();
    await Escape.insertMany(JSON.parse(escape));
    res.send("ok");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ

app.get("/", async (req, res) => {
  console.log("Hey");

  try {
    // const foundEscapeGames = await Escape.find();
    // res.status(200).json(foundEscapeGames);
    res.json("Coucou");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ BY ID

app.get("/:escapeId", async (req, res) => {
  try {
    const foundEscapeById = await Escape.findById(req.params.escapeId);
    res.status(200).json(foundEscapeById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
app.post("/update", async (req, res) => {
  try {
    if (req.fields._id) {
      const Escape = await Escape.findById(req.fields._id);
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
    if (req.fields._id) {
      const Escape = await Student.findById(req.fields._id);
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

app.listen(3000, () => {
  console.log("Server has started");
});
