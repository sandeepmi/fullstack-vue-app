import { fetchPost } from '@/services/fetchApi.js'

export function login (email, password) {
  return fetchPost('/auth/authenticate', { email, password })
}

export function register (email, password) {
  return fetchPost('/auth/register', { email, password })
}
