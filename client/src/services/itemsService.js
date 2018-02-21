import { fetchGet, fetchPut } from '@/services/fetchApi.js'

export default {
  getItems () {
    return fetchGet('/items')
  },

  updateItem (item) {
    return fetchPut('/items/' + item._id, item)
  }
}
