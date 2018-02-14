import fetch from '@/services/api.js'

export default {
  getItems () {
    return fetch('/items')
  },

  updateItem (item) {
    return fetch('/items/' + item._id, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
