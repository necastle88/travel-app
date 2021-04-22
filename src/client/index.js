import { handleSubmit } from './js/formHandler'
import { fetchData } from './js/helpers/fetchData'
import { resetField } from './js/helpers/resetField'
import './styles/base.scss'

const addedTrips = [];
const getFromdate = document.querySelector('.form__input--arrival-date').value;
const getResultContainer = document.querySelector('.result-container');
const getResultSection = document.querySelector('.section--result-hidden');
const getResultSectionH2 = document.querySelector('.result--card-information-h2');

const capitalize = (s) => {
  if (typeof s !== 'string') return null
  return s.charAt(0).toUpperCase() + s.slice(1);
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
      getResultContainer.style.backgroundImage =  `url(${res.hits['0'].webformatURL})`;
      getResultSectionH2.textContent = `${capitalize(res.location)}`;
      
      if (getResultSection.className !== 'section--result-active') {
        getResultSection.classList.add('section--result-active')
        getResultSection.classList.remove('section--result-hidden')
      }
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