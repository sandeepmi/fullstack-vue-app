import * as types from '../mutation-types'
import { isLoggedIn } from '@/helpers'

const state = {
  isLoggedIn: false
}

const mutations = {
  [types.SET_LOGGED_IN_STATUS] (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  }
}

const actions = {
  setUserStatus ({commit}) {
    commit(types.SET_LOGGED_IN_STATUS, isLoggedIn())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
