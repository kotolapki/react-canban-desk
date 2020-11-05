function getRandomId (numberOfDigits=5) {
  return Math.floor(Math.random().toFixed(numberOfDigits) * Math.pow(10, numberOfDigits));
}

export default getRandomId;