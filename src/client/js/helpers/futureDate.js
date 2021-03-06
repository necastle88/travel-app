// date must be in yyyy-mm-dd format
// creates a new date base off of the date
// then it takes in a set number of day must be a number
// it then adds the days to the new date then 
// return a date in the future as yyyy-mm-dd
function futureDate(theDate, days) {
 
  let theFuture = new Date(theDate.getTime() + days*24*60*60*1000);
  let dd = String(theFuture.getDate()).padStart(2, '0');
  let mm = String(theFuture.getMonth() + 1).padStart(2, '0'); 
  let yyyy = theFuture.getFullYear();

  theFuture = `${yyyy}-${mm}-${dd}`;
 return theFuture
}

export { futureDate }