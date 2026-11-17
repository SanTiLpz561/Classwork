const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const readline = require("readline");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const mongoUrl = process.env.MONGO_URL;mongoose.connect(mongoUrl);
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

async function loadCSVDataMiddleware(req, res, next) {
  try {
    const count = await Driver.countDocuments();
    if (count === 0) {
      const fileStream = fs.createReadStream("public/data/f1_2023.csv");
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let isFirstLine = true;
      let teamIdCounter = 1;

      for await (const line of rl) {
        if (isFirstLine) {
          isFirstLine = false;
          continue; 
        }

        const cols = line.split(",");
        if (cols.length < 8) continue;

        const [number, code, forename, surname, dobStr, nationality, url, current_team] = cols;

        let team = await Team.name_find ? null : await Team.findOne({ name: current_team });
        if (!team) {
          team = new Team({
            id: teamIdCounter++,
            name: current_team,
            nationality: "International",
            url: "",
          });
          await team.save();
        }

        const [day, month, year] = dobStr.split("/");
        const dob = new Date(`${year}-${month}-${day}`);

        const driver = new Driver({
          num: Number(number),
          code,
          forename,
          surname,
          dob: isNaN(dob) ? new Date() : dob,
          nationality,
          url,
          team: {
            id: team.id,
            name: team.name,
            nationality: team.nationality,
            url: team.url,
          },
        });

        await driver.save();
      }
      console.log("Datos del CSV cargados exitosamente en la BD.");
    }
    next();
  } catch (err) {
    console.error("Error cargando el CSV:", err);
    next();
  }
}

app.get("/", loadCSVDataMiddleware, async (req, res) => {
  try {
    const drivers = await Driver.find({});
    const teams = await Team.find({});
    res.render("index", { drivers, teams });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error del servidor");
  }
});

app.post("/driver", async (req, res) => {
  try {
    const { id, num, code, forename, surname, dob, url, nationality, teamName } = req.body;
    
    let team = await Team.findOne({ name: teamName });
    if (!team) {
      team = new Team({ id: Date.now(), name: teamName, nationality: "Unknown", url: "" });
      await team.save();
    }

    const driverData = {
      num: Number(num),
      code,
      forename,
      surname,
      dob: new Date(dob),
      nationality,
      url,
      team: { id: team.id, name: team.name, nationality: team.nationality, url: team.url }
    };

    if (id) {
      await Driver.findByIdAndUpdate(id, driverData);
    } else {
      const newDriver = new Driver(driverData);
      await newDriver.save();
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al guardar el driver");
  }
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});