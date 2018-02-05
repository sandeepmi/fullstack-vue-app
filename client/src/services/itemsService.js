import fetch from '@/services/api.js'

export default {
  getItems () {
    return fetch('/getItems')
  }
}
