import { handleSubmit } from "./js/formHandler";
import { fetchData } from "./js/helpers/fetchData";
import { resetField } from "./js/helpers/resetField";
import { countDown } from "./js/helpers/countDown";
import { capitalize } from "./js/helpers/capitalize";
import { formatDate } from "./js/helpers/formatDate";
import { todaysDate } from "./js/helpers/todaysDate"; 
import { futureDate } from "./js/helpers/futureDate"; 
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
const getInputField = document.querySelector(".form__input");
const getDateArrivalField = document.querySelector(".form__input--arrival-date");
const getDateDepartureField = document.querySelector(".form__input--departure-date");
const getDateWeatherImgDiv = document.querySelector(".result--weather-img");
const weatherIcon = document.createElement('img');
//<img src='../media/images/logo.png' class='result--weather-img-icon' alt="Weather Icon" width="50"> 
getDateArrivalField.setAttribute('min', todaysDate());
getDateDepartureField.setAttribute('min', todaysDate());
getDateArrivalField.setAttribute('max', futureDate(new Date(), 16));

weatherIcon.setAttribute('src', 'https://picsum.photos/id/1011/50.jpg');
weatherIcon.setAttribute('class', 'result--weather-img-icon');
weatherIcon.setAttribute('alt', 'Weather Icon');
weatherIcon.setAttribute('width', '50');

getDateWeatherImgDiv.insertAdjacentElement('afterbegin',weatherIcon)
// Checks if an object is empty 
const isObjEmpty = (obj) => {
  for (let i in obj) return false;
  return true
}

window.addEventListener('DOMContentLoaded', () => {
  /* Form submission 
    Gets userinput/images/coords
    then renders the first result card
  */
  getFromID.addEventListener("click", (e) => {
    let location = document.querySelector(".form__input").value;
    let arrivalDate = document.getElementById("arrival").value;
    let departueDate = document.getElementById("departure").value;

    if (!location || !arrivalDate || !departueDate) {
      getInputField.removeAttribute("placeholder");
      getInputField.setAttribute("placeholder", "Please fill all fields");
      return;
    }

    getInputField.removeAttribute("placeholder");
    getInputField.setAttribute("placeholder", "Location");

    currentTrip = {};
    handleSubmit(e);
    setTimeout(() => {
      fetchData("/data")
        .then((res, rej) => {
        // gets days
        let days = res.userInput.days - 1;
         if(res.userInput.days < 0 || res.userInput.days > 16) {
            days = 0
          } 

          if (getResultSection.className !== "section--result-active") {
            weatherIcon.removeAttribute("src");
            weatherIcon.setAttribute(
              "src",
              `https://www.weatherbit.io/static/img/icons/${res.weatherData[`${days}`].weather.icon}.png`
            );
            getResultSection.classList.add("section--result-active");
            getResultSection.classList.remove("section--result-hidden");
            //checks if there are hits if not use defualt image
            getResultContainer.style.backgroundImage = `url(${isObjEmpty(res.hits) ?
              'https://picsum.photos/id/203/1000/760.jpg' : res.hits["0"].largeImageURL  
          })`;
            getResultSectionWeatherP.textContent = `${res.weatherData[`${days}`].temp}\xB0`;
            getResultSectionH2.textContent = `${capitalize(
              res.userInput.location
            )}`;

            if (res.userInput.departure) {
              getResultDeparture.textContent = `Departure: ${formatDate(
                res.userInput.departure
              )}`;
            } else {
              getResultDeparture.textContent = `Departure: N/A`;
            }

            if (res.userInput.arrival) {
              getResultArrival.textContent = `Arrival: ${formatDate(
                res.userInput.arrival
              )}`;
              countDown(res.userInput.arrival, getResultStopwatch);
            } else {
              getResultDeparture.textContent = `Arrival: N/A`;
            }
          }
          // creates tucated obj for trip cards
          const fetchedTrip = {
            userInput: res.userInput,
            weather: res.weatherData[`${days}`],
            //checks if there are hits if not use defualt image
            image: isObjEmpty(res.hits) ?
            'https://picsum.photos/id/203/1000/760.jpg' : res.hits["0"].largeImageURL,
          };
          return fetchedTrip;
        })
        .then((res, rej) => {
          currentTrip = { ...res };
        });
    }, 2000);
    resetField(".form__input");
  });

  /* adds a tip based on the currently searched trip*/
  const addTrip = document.querySelector(".card--add");

  addTrip.addEventListener("click", (event) => {
    event.preventDefault();

    getAddedTips.classList.add("section--trips-added");
    getAddedTips.classList.remove("section--trips-hidden");

    trips.push(currentTrip);
    cardContainer.innerHTML = "";
    renderData();
  });
  // Renders added trip cards
  const renderData = () => {
    if (trips === []) return;

    trips.forEach((trip, index) => {
      const alt = `image of ${trip.userInput.location}`;
      const weatherIconURL = `https://www.weatherbit.io/static/img/icons/${trip.weather.weather.icon}.png`;

      const cardHTML = `
      <div class="card card--trips-added">
        <div class="card card--img" style="background-image: url(${
          trip.image
        });"></div>
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
        trips.splice(index, 1);
        cardContainer.innerHTML = "";
        renderData();
      });
    });
  };
});
