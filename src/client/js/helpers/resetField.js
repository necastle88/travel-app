// resets field value to ""
const resetField = (id) => {
  document.querySelector(`${id}`).value = "";
};

export { resetField };