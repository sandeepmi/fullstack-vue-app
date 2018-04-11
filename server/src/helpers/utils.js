function dateNow () {
  return new Date(Date.now()).toISOString()
}

module.exports = {
  dateNow
}
