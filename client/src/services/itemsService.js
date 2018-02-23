import { fetchGet, fetchPost, fetchPut } from '@/services/fetchApi.js'

export default {
  getItems () {
    return fetchGet('/items')
  },

  createItem (item) {
    return fetchPost('/items', item)
  },

  updateItem (item) {
    return fetchPut('/items/' + item._id, item)
  }
}
