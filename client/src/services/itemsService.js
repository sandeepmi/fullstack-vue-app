import { fetchGet, fetchPost, fetchPut, fetchDelete } from '@/services/fetchApi.js'

export default {
  getItems () {
    return fetchGet('/items')
  },

  createItem (item) {
    return fetchPost('/items', item)
  },

  updateItem (item) {
    return fetchPut('/items/' + item._id, item)
  },

  deleteItem (item) {
    return fetchDelete('/items/' + item._id)
  }
}
