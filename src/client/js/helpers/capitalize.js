const capitalize = (s) => {
  if (typeof s !== 'string') return null
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export { capitalize };