const resetField = (id) => {
  document.querySelector(`${id}`).value = "";
};

export { resetField };