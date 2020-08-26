// jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityname;
  const apiKey = "70a932b6f2b2b5a7f5cda0a14c95e6f8";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon =
        "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";

      res.write(
        "<h1 style='font-family:verdana;'>The temperature in " +
          query +
          " is " +
          temp +
          " &deg; Celsius.</h1>"
      );
      res.write(
        "<h1 style='font-family:verdana;'>The Weather is currently " +
          description +
          ".</h1>"
      );
      res.write("<img src=" + icon + " alt='weather-icon' />");

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
