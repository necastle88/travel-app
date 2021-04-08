import { fetchData } from "./helpers/fetchData";
import { postData } from "./helpers/postData";
import { resetTextValue } from "./helpers/resetForm";

async function handleSubmit(event) {
  event.preventDefault();
  const getSectionResultsID = document.getElementById("section_results");
  // check what text was put into the form field
  let formText = document.getElementById("form__user-input").value;
  await postData("/data", { formText });
  fetchData("/data")
    .then((res, rej) => {
      if (res.sentence_list === undefined) {
        getSectionResultsID.classList.add("error-text");
        const modifiedData = {
          subjectivity: "",
          confidence: "",
          agreement: "",
          sentence_list: "",
        };
        return modifiedData;
      } else {
        getSectionResultsID.classList.remove("error-text");
        const modifiedData = {
          subjectivity: res.subjectivity,
          confidence: res.confidence,
          agreement: res.agreement,
          sentence_list: res.sentence_list[0].text.toString(),
        };
        return modifiedData;
      }
    })
    .then((res) => {
      if (res.agreement === "") {
        getSectionResultsID.innerHTML =
          "Enter text in the textbox above to recieve results.";
      } else {
        resetTextValue("form__user-input");
        getSectionResultsID.innerHTML = "";
        const textTitles = [
          `Sentence: ${res.sentence_list}`,
          `Subjectivity: ${res.subjectivity}`,
          `Confidence: ${res.confidence}`,
          `Agreement: ${res.agreement}`,
        ];
        textTitles.forEach((element) => {
          const newParagraph = document.createElement("p");
          newParagraph.classList.add("form_results_text");
          return getSectionResultsID
            .insertAdjacentElement("beforeend", newParagraph)
            .append(element);
        });
      }
    });
}

export { handleSubmit };
