let data = {};
const dotenv = require("dotenv");
dotenv.config();

let path = require("path");
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const days = require("./helpers/days.js");
const app = express();
const port = 8081;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("dist"));

console.log(__dirname);

// Api info Geonames
const GEO_NAMES = {
  key: encodeURI(process.env.GEO_NAMES),
  apiUrl: `http://api.geonames.org/searchJSON?q=`,
};
// Api info weatherbit
const WEATHERBIT_API = {
  key: process.env.WEATHERBIT,
  apiUrl: `https://api.weatherbit.io/v2.0/forecast/daily?`,
};
// Api info Pixabay
const PIXABAY = {
  key: process.env.PIXABAY,
  type: 'photo',
  category: 'travel'
};
// post headers
const requestOptions = {
method: 'GET',
redirect: 'follow'
};

// posts data to server coordinates Geonames/Gets forecat WeatherBit/Get images pixabay 
const postFetchresults = (userInput) => {
  fetch(`${GEO_NAMES.apiUrl}${userInput.location}&maxRows=1&username=${GEO_NAMES.key}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    let lat = result.geonames[0].lat;
    let lon = result.geonames[0].lng;
    let daysIdx = days.days(16);
    const coords = {lat, lon}
    fetch(`${WEATHERBIT_API.apiUrl}lat=${lat}&lon=${lon}&key=${WEATHERBIT_API.key}&units=I`, requestOptions)
    .then(response => response.json())
    .then(result => {
      const weatherData = {...result.data};
      fetch(`https://pixabay.com/api/?key=${PIXABAY.key}&q=${userInput.location}&image_type=${PIXABAY.type}&category=${PIXABAY.category}&per_page=3`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const hits = {...result.hits};
          const pd = {weatherData, hits, coords, userInput, daysIdx};
          data = {...pd};
        })
        .catch(error => console.log('error', error));    
      })
      .catch(error => console.log('error', error));
  })
  .catch(error => console.log('error', error));
} 

app.listen(port, function () {
  console.log("Example app listening on port " + port);
});

app.get("/data", (req, res) => {
  res.send(data);
});

app.post("/data", (req, res) => {
  userInput = req.body;
  postFetchresults(userInput);
});

