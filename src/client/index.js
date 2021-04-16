import { handleSubmit } from './js/formHandler'
import './styles/base.scss'

const getFromID = document.querySelector('.form__submit');
console.log(getFromID);

getFromID.addEventListener('click', (e) => {
  handleSubmit(e);
})

