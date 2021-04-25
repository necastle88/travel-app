import { handleSubmit } from "./js/formHandler";
import { fetchData } from "./js/helpers/fetchData";
import { resetField } from "./js/helpers/resetField";
import { countDown } from "./js/helpers/countDown";
import { capitalize } from "./js/helpers/capitalize";
import { formatDate } from "./js/helpers/formatDate";
import "./styles/style.scss";

const trips = [];
let currentTrip = {};

const getResultContainer = document.querySelector(".result-container");
const cardContainer = document.querySelector(".card-container");
const getResultSection = document.querySelector(".section--result-hidden");
const getResultSectionH2 = document.querySelector(".result--card-information-h2");
const getResultSectionWeatherP = document.querySelector(".result--weather--detials-p");
const getResultSectionWeatherIcon = document.querySelector(".result--weather-img-icon");
const getResultArrival = document.querySelector(".result--weather--detials-arrival");
const getResultDeparture = document.querySelector(".result--weather--detials-departure");
const getResultStopwatch = document.querySelector(".result--weather--countdown");
const getAddedTips = document.querySelector(".section--trips-hidden");
const getFromID = document.querySelector(".form__submit");

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

getFromID.addEventListener("click", (e) => {
  currentTrip = {};
  handleSubmit(e);
  setTimeout(() => {
    fetchData("/data")
      .then((res, rej) => {
        if (getResultSection.className !== "section--result-active") {
          getResultSectionWeatherIcon.setAttribute(
            "src",
            `https://www.weatherbit.io/static/img/icons/${res.weatherData["0"].weather.icon}.png`
          );
          getResultSection.classList.add("section--result-active");
          getResultSection.classList.remove("section--result-hidden");

          getResultContainer.style.backgroundImage = `url(${res.hits["0"].webformatURL})`;
          getResultSectionWeatherP.textContent = `${res.weatherData["0"].temp}\xB0`;
          getResultSectionH2.textContent = `${capitalize(res.userInput.location)}`;

          if (res.userInput.departure) {
            getResultDeparture.textContent = `Departure: ${formatDate(res.userInput.departure)}`;
          } else {
            getResultDeparture.textContent = `Departure: N/A`;
          }

          if (res.userInput.arrival) {
            getResultArrival.textContent = `Arrival: ${formatDate(res.userInput.arrival)}`;
            countDown(res.userInput.arrival, getResultStopwatch);
          } else {
            getResultDeparture.textContent = `Arrival: N/A`;
          }
        }
        const fetchedTrip = {
          userInput: res.userInput,
          weather: res.weatherData["0"],
          image: res.hits["0"].webformatURL,
        };
        return fetchedTrip;
      })
      .then((res, rej) => {
        currentTrip = { ...res };
      });
  }, 2000);
  resetField(".form__input");
});

const addTrip = document.querySelector(".card--add");

addTrip.addEventListener("click", (event) => {
  event.preventDefault();

  getAddedTips.classList.add("section--trips-added");
  getAddedTips.classList.remove("section--trips-hidden");

  trips.push(currentTrip);
  cardContainer.innerHTML = "";
  renderData();
});


const renderData = () => {
  if(trips === []) return

  trips.forEach((trip, index) => {
    const alt = `image of ${trip.userInput.location}`;
    const weatherIconURL = `https://www.weatherbit.io/static/img/icons/${trip.weather.weather.icon}.png`;

    const cardHTML = `
    <div class="card card--trips-added">
      <div class="card card--img" style="background-image: url(${trip.image});"></div>
      <div class='card--details-container'>
        <div class="card card--details">
          <h3>${capitalize(trip.userInput.location)}</h3>
          <p>Arrival: ${trip.userInput.arrival}</p>
          <p>Departure: ${trip.userInput.departure}</p>
        </div>
        <div class="card card--weather">
              <img class="card weather--img" src='${weatherIconURL}' alt='${alt}' />
            <h4 class="card weather--temp">${trip.weather.temp}\xB0</h4>
        </div>
      </div>
      <button class="card card--remove">Remove</button>
    </div>`;

    cardContainer.insertAdjacentHTML("afterbegin", cardHTML);
    
    const removeTrip = document.querySelector(".card--remove");
    
    removeTrip.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(index, trips)
      trips.splice(index, 1);
      console.log(index, trips)
      cardContainer.innerHTML = "";
      renderData();
    });

  });
};


