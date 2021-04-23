const formatDate = (date) => {
  const splitStr = date.split('-')
  const formattedStr = `${splitStr[1]}-${splitStr[2]}-${splitStr[0]}`
  return formattedStr
}

export { formatDate };