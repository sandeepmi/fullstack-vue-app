import { fetchPost } from '@/services/fetchApi.js'

export default {
  login (username, password) {
    return fetchPost('/login', { username, password })
  }
}
