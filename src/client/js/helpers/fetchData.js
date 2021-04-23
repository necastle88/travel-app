const fetch = require("node-fetch");

const fetchData = async (url) => {
  try {
      const request = await fetch(url);
      const data = await request.json()
      if (!request.ok) {
          console.log('an error has occured');
      } return data;
  }
  catch (error) {
      console.log("error", error);
  }
}  
export { fetchData };