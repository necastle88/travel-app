import { postData } from "./helpers/postData";


async function handleSubmit(event) {
  event.preventDefault();
  let location = document.querySelector(".form__input").value;
  let arrivalDate = document.getElementById('arrival').value;
  let departureDate = document.getElementById('departure').value;
  
  const userInput = {
    "location": location,
    "arrival": arrivalDate,
    "departure": departureDate
  }

  await postData("/data", userInput);
}

export { handleSubmit };
