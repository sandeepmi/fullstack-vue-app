export default (url, options) => {
  url = process.env.API_BASE_URL + url

  return options
    ? fetch(url, options)
    : fetch(url)
}
