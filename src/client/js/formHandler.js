import { postData } from "./helpers/postData";

// gets and posts user data to the server 
// from location field string expected
// arrival data date has to be in yyyy-mm-dd
// and departure date yyyy-mm-dd
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
