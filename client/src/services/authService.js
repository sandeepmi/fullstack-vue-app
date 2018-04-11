import { fetchPost } from '@/services/fetchApi.js'

export function login (email, password) {
  return fetchPost('/auth/authenticate', { email, password })
}

export function register (email, password, firstName, lastName) {
  return fetchPost('/auth/register', { email, password, firstName, lastName })
}

export function changePassword (password, newPassword) {
  return fetchPost('/auth/changePassword', { password, newPassword })
}
