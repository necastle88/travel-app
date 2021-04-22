import { handleSubmit } from './js/formHandler'
import { fetchData } from './js/helpers/fetchData'
import { resetField } from './js/helpers/resetField'
import './styles/base.scss'

const addedTrips = [];
const getFromdate = document.querySelector('.form__input--arrival-date').value;
const getResultContainer = document.querySelector('.result-container');
const getResultSection = document.querySelector('.section--result');
const style = document.createElement('style');
document.head.appendChild(style);

const createResult = (data) => {
  const resultDiv = document.createElement("div");
  const cardDetailsDiv = document.createElement("div");
  const cardInfoDiv = document.createElement("div");
  const cardInfoH2 = document.createElement("h2");
  const cardInfoP = document.createElement("p");
  const cardWeatherDiv = document.createElement("div");
  const cardWeatherImgDiv = document.createElement("div");
  const cardWeatherDetialsDiv = document.createElement("div");
  const cardWeatherDetialsP = document.createElement("p");

  
  resultDiv.setAttribute('class', 'result-container');
  getResultSection.insertAdjacentElement('beforeend',resultDiv);


}

const getFromID = document.querySelector('.form__submit');
getFromID.addEventListener('click', (e) => {
  handleSubmit(e);
  setTimeout(() => { 
    fetchData('/data').then((res, rej) => {
      console.log(res);
      resetField('.form__input');
      console.log(res.hits)
/*       if(!res) {
        return
      }
      
      if (!res.hits) {
        getResultContainer.classList.remove('result-container');
        getResultContainer.classList.add('result-container-missing-image');
      } */
      createResult()
      style.sheet.insertRule(`.result-container {background-image: url(${res.hits['0'].webformatURL})}`)
    })
  }, 2000);
})
/* <div class="result-container">
  <div class="result--card-details">
  <div class="div result--card-information">
    <h2>Location placeholder</h2>
    <p>Discover uncharted destinations perfect for any vacation.</p>
  </div>

  <p>12 months till you arrive</p>
  <div class="result--weather">
    <div class="result--weather-img">image here</div>
    <div class="result--weather-detials">
        <p>
            forcast here
        </p>
    </div>
<button class="card--add">Book it</button>
</div> */