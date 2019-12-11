const escapegames = require("./data/escapegames.json");
const fs = require("fs");

const games = escapegames.map(element => {
  const obj = { ...element };
  if (obj.location) {
    for (let i = 0; i < obj.location.length; i++) {
      obj.location[i].coords.lat = Number(obj.location[i].coords.lat);
      obj.location[i].coords.lon = Number(obj.location[i].coords.lon);
    }
  }

  return obj;
});

fs.writeFile("./games.json", JSON.stringify(games), err => {
  if (err) {
    console.log(err);
  }
});
