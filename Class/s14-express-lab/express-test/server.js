import express from 'express'
//import axios from 'axios';
import { getWeatherFrom } from './services/meteo-service.js';

const app = express()
app.use(express.json());    // Middleware

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

class WeatherError extends Error {
  constructor(message) {
    super(message);
    this.name = "WeatherError";
    this.statusCode = statusCode;
    this.rootCauseClass = rootCauseClass;
  }
}

app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>")
})


app.get('/greet', (req, res) => {
    const { name, city} = req.query;  //  <- Destructuring
  res.send(`Hello ${name}, how is the weather in ${city}`);
})

// /api/scientists?=dept=**
app.get('/api/scientists', (req, res) => {
    const {dept} = req.query;
    if(dept) {


      const result = scientists.filter((scientist) => scientist.department.toLocaleLowerCase() === dept.toLocaleLowerCase() );
      if(result && result.length > 0) {
        return res.json({ 
        deptScientists: result,
        dept,
        count: result.length,
      });
      } else {
        return res.json({ 
          errorMsg: `No results for department ${dept}`,
          dept });
    }
  }
    res.json({ deptScientists: scientists, count: scientists.length })
});

//  /api/scientists/:id
app.get('/api/scientists/.id/profile/:keyword', (req, res) => {
  const scientistId = parseInt(req.params.id, 10);
  const { keyword } = req.params;
  const scientist = scientists.find((scientist) => scientist.id === scientistId,);
  if(!scientist) {
    return res.json({ success: false, errorMsg: "No scientist found"});
  }
  res.json({
    success: true,
    data: scientist,
    keyword,
  });
});

app.get("/api/initiatives", (req, res) => {
  res.json({ initiatives, status: "Ok" });

});

app.post("/api/initiatives", (req, res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department }
  initiatives.push(initiative);
  res.json({ title, budget, department, status: "Ok" });

});

app.get("/about", (req, res, next) => {
  next({ msg: "This is my webapp class project" })
});

app.post('/about', (req, res) => {
  res.send('This is still my webapp class proyect, but secure');
})

app.get("/about", (req, res, next) => {
  res.send("Second endpoint");
});

app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6597, 103.3496, 'Guadalajara');
  res.send(repString);
});

app.get("/weatherLSN", async (req, res) => {
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.52&longitude=6.63&current_weather=true";
  const response = await axios(apiUrl);
  const currentWeather = response.data;
  console.log(currentWeather);
  res.send( `In GDL, the current temp is ${currentWeather.current_weather.temperature} C`);
});

const cities = {
  GDL: { lat: 20.6597, long: -103.349 },
  LSN: { lat: 46.52, long: 6.63 },
}

/*app.get("/weather/:city", async (req, res) => {
  try{
    const { city } = req.params;
    if(!city) throw new Error("City code is required");
    const { lat, long } = cities[city];
    const respString = await getWeatherFrom(lat, long, name);
    res.send(respString);
  } catch (error){
    console.error(error);
    if(error.message == "City code is required") {
      res.status(400).send({ error: "City code is required" });
    }
    res.status(500).send({ error: "Unknown error" });
  }
});*/

app.get("/weather/:city", async (req, res) => {
    const { city } = req.params;
    if(!city) throw new Error("City code is required", 400, "/weather/:city");
    if(!cities[city]) next(new Error("City code is invalid", 400, "/weather/:city"));
    const { lat, long } = cities[city];
    const respString = await getWeatherFrom(lat, long, name);
    res.send(respString);
});

app.get('/about', (req, res) => {
  res.send("This is my webpp project");
})


/*app.all("*", (req, res, next) => {
  next (new Error("Endpoint not found"));
});*/

app.use((err, req, res, next) => {
  console.error(err);
  if(err instanceof WeatherError) {
      const msg = error.message || err.rootCauseClass || "Unknown error";
      res
        .status(err.statusCode || 500)
        .json({ error: err.message, rootCause: err.rootCauseClass });
  }
    res.status(500).json({ error: err.message || "Unknown error" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})