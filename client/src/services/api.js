const BASE_URL = 'http://localhost:8082/api'

export default (url, options) => {
  url = BASE_URL + url

  return options
    ? fetch(url, options)
    : fetch(url)
}
