const express = require("express");
const https = require("https");
const cors = require('cors');
const app = express();
var path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'../','dist','weather-app')))

const constants = {
  API_KEY: "API_KEY",
  FIELDS: {
    "current": [
      "temperature",
      "temperatureApparent",
      "temperatureMin",
      "temperatureMax",
      "windSpeed",
      "windDirection",
      "humidity",
      "pressureSeaLevel",
      "uvIndex",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "visibility",
      "cloudCover",
    ],
    "1d": [
      "temperature",
      "temperatureApparent",
      "temperatureMin",
      "temperatureMax",
      "windSpeed",
      "windDirection",
      "humidity",
      "pressureSeaLevel",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "sunriseTime",
      "sunsetTime",
      "visibility",
      "moonPhase",
      "cloudCover",
    ],
    "1h": [
      "temperature",
      "temperatureApparent",
      "temperatureMin",
      "temperatureMax",
      "windSpeed",
      "windDirection",
      "humidity",
      "pressureSeaLevel",
      "uvIndex",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "visibility",
      "cloudCover",
    ],
  },
  TIMESTEPS: [ "1d", "1h","current"],
  KEYS:{"1d":"daily","1h":"hourly","current":"current"},
  TIMEZONE: "America/Los_Angeles",
  UNITS: "imperial",
};

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname,'index.html'));
});

app.get("/weather", (req, res) => {

  latitude = req.query.latitude;
  longitude = req.query.longitude;
  if(!latitude || !longitude)
  {
    res.status(400).send("Request invalid");
    return;
  }
  console.log(latitude + " "+longitude);

  let completed_count = 0;
  all_data = {};
  for (timesteps of constants["TIMESTEPS"]) {
    console.log(timesteps);
    const params = {
      location: req.query.latitude + "," + req.query.longitude,
      fields: constants["FIELDS"][timesteps],
      timesteps: timesteps,
      units: constants["UNITS"],
      timezone: constants["TIMEZONE"],
      apikey: constants["API_KEY"],
    };

    const request_params =  new URLSearchParams(params);

    const options = {
      hostname: "api.tomorrow.io",
      path: "/v4/timelines?" + request_params,
      port: 443,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };

    let allSucceeded = true;
    const request = https
      .request(options, (weatherDataRes) => {
        let weatherData = "";
        weatherDataRes.on("data", (chunk) => {
          weatherData += chunk;
        });

        // The whole response has been received. Print out the result.
        weatherDataRes.on("end", () => {
          weatherData = JSON.parse(weatherData);
          if (!weatherData['code'])
          {
            all_data[constants.KEYS[weatherData['data']['timelines'][0]['timestep']]] = weatherData;
          }
          else
          {
            allSucceeded = false;
          }
          completed_count++;
          if (completed_count === constants["TIMESTEPS"].length)
          {
            if(allSucceeded == false)
            {
              res.status(400).send(weatherData);
            }
            else{
              res.status(200).send(all_data);
            }
            return;
          }
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
    request.end();
  }
});

module.exports = app;
