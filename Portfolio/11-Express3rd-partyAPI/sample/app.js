const express = require("express");
const https = require("https");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "..", ".env")
});

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(require("path").join(__dirname, "..", "index.html"));
});

app.post("/", (req, res) => {
    const city = req.body.cityName;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).send(`
            <h1>Configuration error</h1>
            <p>The API key is missing.</p>
            <a href="/">Back to home</a>
        `);
    }

    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURIComponent(city) +
        "&appid=" + encodeURIComponent(apiKey) +
        "&units=metric";

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            let weatherData;

            try {
                weatherData = JSON.parse(data);
            } catch (error) {
                return res.status(502).send(`
                    <h1>Error</h1>
                    <p>Could not read the weather service response.</p>
                    <a href="/">Back to home</a>
                `);
            }

            if (response.statusCode !== 200) {
                const message =
                    weatherData.message || "Unable to get weather data.";

                return res.status(502).send(`
                    <h1>Weather API Error</h1>
                    <p>${message}</p>
                    <a href="/">Back to home</a>
                `);
            }

            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const cityName = weatherData.name;

            const iconUrl =
                "https://openweathermap.org/img/wn/" +
                icon + "@2x.png";

            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1.0">
                    <title>Weather Report</title>
                </head>
                <body>
                    <h1>Weather in ${cityName}</h1>
                    <h2>${temperature} &deg;C</h2>
                    <p>${description}</p>
                    <img src="${iconUrl}" alt="${description}">
                    <br>
                    <a href="/">Back to home</a>
                </body>
                </html>
            `);
        });

        response.on("error", (error) => {
            console.error("Response error:", error.message);

            if (!res.headersSent) {
                res.status(502).send(`
                    <h1>Error</h1>
                    <p>Could not receive weather data.</p>
                    <a href="/">Back to home</a>
                `);
            }
        });

    }).on("error", (error) => {
        console.error("Request error:", error.message);

        if (!res.headersSent) {
            res.status(502).send(`
                <h1>Connection Error</h1>
                <p>Could not connect to the weather service.</p>
                <a href="/">Back to home</a>
            `);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening to port http://localhost:${PORT}`);
});
