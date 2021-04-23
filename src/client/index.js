import { handleSubmit } from './js/formHandler'
import { fetchData } from './js/helpers/fetchData'
import { resetField } from './js/helpers/resetField'
import { countDown } from './js/helpers/countDown'
import { capitalize } from './js/helpers/capitalize'
import { formatDate } from './js/helpers/formatDate'
import './styles/base.scss'

const addedTrips = [];
let currentTrip = {};

const getResultContainer = document.querySelector('.result-container');
const getResultSection = document.querySelector('.section--result-hidden');
const getResultSectionH2 = document.querySelector('.result--card-information-h2');
const getResultSectionWeatherP = document.querySelector('.result--weather--detials-p');
const getResultSectionWeatherIcon = document.querySelector('.result--weather-img-icon');
const getResultArrival = document.querySelector('.result--weather--detials-arrival');
const getResultDeparture = document.querySelector('.result--weather--detials-departure');
const getResultStopwatch = document.querySelector('.result--weather--countdown');
const getFromID = document.querySelector('.form__submit');

getFromID.addEventListener('click', (e) => {
  currentTrip = {}
  handleSubmit(e);
  setTimeout(() => { 
    fetchData('/data').then((res, rej) => {

      if (getResultSection.className !== 'section--result-active') {
        getResultSectionWeatherIcon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${res.weatherData['0'].weather.icon}.png`)
        getResultSection.classList.add('section--result-active')
        getResultSection.classList.remove('section--result-hidden')

        getResultContainer.style.backgroundImage =  `url(${res.hits['0'].webformatURL})`;
        getResultSectionWeatherP.textContent = `${res.weatherData['0'].temp}\xB0`;
        getResultSectionH2.textContent = `${capitalize(res.userInput.location)}`;
        
        if (res.userInput.departure){
          getResultDeparture.textContent = `Departure: ${formatDate(res.userInput.departure)}`;
        } else {
          getResultDeparture.textContent = `Departure: N/A`;
        }

        if (res.userInput.arrival){
          getResultArrival.textContent = `Arrival: ${formatDate(res.userInput.arrival)}`;
          countDown(res.userInput.arrival, getResultStopwatch);
        } else {
          getResultDeparture.textContent = `Arrival: N/A`;
        }
        
      }
      const fetchedTrip = {
        userInput: res.userInput,
        weather: res.weatherData['0'],
        image: res.hits['0'].webformatURL
      }
      return fetchedTrip 

    }).then((res, rej) => {
        currentTrip = {...res}
        console.log(currentTrip)
    })
  }, 2000);
  resetField('.form__input');
  console.log(currentTrip)
})

