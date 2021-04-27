import { postData } from "./helpers/postData";

async function handleSubmit(event) {
  event.preventDefault();
  let location = document.querySelector(".form__input").value;
  let arrivalDate = document.getElementById('arrival').value;
  let departureDate = document.getElementById('departure').value;
  
  const arrivalDateDays = new Date(arrivalDate);
  const departureDateDays = new Date(departureDate);
  const calcRemainingDays = new Date(departureDateDays - arrivalDateDays);
  const daysRemaining = Number(String(calcRemainingDays.getDate()).padStart(2, '0'));

  const userInput = {
    "location": location,
    "arrival": arrivalDate,
    "departure": departureDate,
    "days": daysRemaining
  }
   
  await postData("/data", userInput);
}

export { handleSubmit };
