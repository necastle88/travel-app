import { postData } from "./helpers/postData";

async function handleSubmit(event) {
  event.preventDefault();
  let location = document.querySelector(".form__input").value;
  await postData("/data", {location});
}

export { handleSubmit };
