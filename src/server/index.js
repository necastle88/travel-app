let data = {};
const dotenv = require("dotenv");
dotenv.config();

let path = require("path");
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8081;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("dist"));

console.log(__dirname);

const GEO_NAMES = {
  key: encodeURI(process.env.GEO_NAMES),
  apiUrl: `http://api.geonames.org/searchJSON?q=`,
  location: ""//req.body.formText //.what ever I name it
};

const WEATHERBIT_API = {
  key: process.env.WEATHERBIT,
  apiUrl: `https://api.weatherbit.io/v2.0/current?lat=`,
};

const PIXABAY = {
  key: process.env.PIXABAY,
  apiUrl: `https://api.weatherbit.io/v2.0/current?lat=`,
};

const requestOptions = {
method: 'GET',
redirect: 'follow'
};

const postFetchresults = (userInput) => {
  fetch(`${GEO_NAMES.apiUrl}${userInput.location}&maxRows=1&username=${GEO_NAMES.key}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    let lat = result.geonames[0].lat;
    let lon = result.geonames[0].lng;
    const coords = {lat, lon}
    
    fetch(`${WEATHERBIT_API.apiUrl}${lat}&lon=${lon}&key=${WEATHERBIT_API.key}&units=I`, requestOptions)
    .then(response => response.json())
    .then(result => {
      const weatherData = {...result.data};
      fetch(`https://pixabay.com/api?key=${PIXABAY.key}&q=${userInput.location}&category="travel"&per_page=3`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const hits = {...result.hits};
          const pd = {weatherData, hits, coords, userInput};
          data = {...pd};
        })
        .catch(error => console.log('error', error));    
      })
      .catch(error => console.log('error', error));
  })
  .catch(error => console.log('error', error));
} 

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "../../dist" });
});

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

