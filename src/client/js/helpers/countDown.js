const countDown = (date, id) => {
  const arrivalDate = new Date(date).getTime();
  let stopWatch = setInterval(() => {
    let now = new Date().getTime();
    let dateDistance = arrivalDate - now;
    
    var days = Math.floor(dateDistance / (1000 * 60 * 60 * 24));
    var hrs = Math.floor((dateDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.floor((dateDistance % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.floor((dateDistance % (1000 * 60)) / 1000);
     
    id.textContent = `${days}d ${hrs}h ${min}m ${sec}s`

    if (dateDistance < 0) {
      clearInterval(stopWatch)
      id.textContent = 'Today!'
    }
  }, 1000)
}

export { countDown }