import { fetchData } from "./helpers/fetchData";
import { postData } from "./helpers/postData";
import { resetTextValue } from "./helpers/resetText";

async function handleSubmit(event) {
  event.preventDefault();
  const getSectionResultsID = document.getElementById("section_results");
  // check what text was put into the form field
  let formText = document.querySelector(".form__input").value;
  console.log(formText)
  await postData("/data");
  //fetchData("/data")
    //.then((res, rej) => {
    //});
}

export { handleSubmit };
