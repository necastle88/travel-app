const resetTextValue = (id) => {
  document.getElementById(`${id}`).value = "";
};

const add = (a, b) => {
  return a + b;
} 

export { resetTextValue, add };