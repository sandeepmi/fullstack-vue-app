import { fetchGet } from '@/services/fetchApi.js'

export function getUserProfile () {
  return fetchGet('/user/profile')
}
