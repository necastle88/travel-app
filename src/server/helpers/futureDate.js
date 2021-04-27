function futureDate(theDate, days) {
 
  let theFuture = new Date(theDate.getTime() + days*24*60*60*1000);
  let dd = String(theFuture.getDate()).padStart(2, '0');
  let mm = String(theFuture.getMonth() + 1).padStart(2, '0'); 
  let yyyy = theFuture.getFullYear();

  theFuture = `${yyyy}-${mm}-${dd}`;
 return theFuture
}

export { futureDate }