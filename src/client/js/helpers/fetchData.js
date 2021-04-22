const fetch = require("node-fetch");

const fetchData = async (url) => {
    console.log('fetching....')
  try {
      const request = await fetch(url);
      console.log(request);
      const data = await request.json()
      console.log(data)
      if (!request.ok) {
          console.log('an error has occured');
      } return data;
  }
  catch (error) {
      console.log("error", error);
  }
}  
export { fetchData };