const fetch = require("node-fetch");

const postData = async (url = "", data = {}) => {
  console.log(data)
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { postData };