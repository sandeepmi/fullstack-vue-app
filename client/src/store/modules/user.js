import * as types from '../mutation-types'
import { isLoggedIn } from '@/helpers'
import { getUserProfile } from '@/services/userService'

const state = {
  isLoggedIn: false,
  displayName: ''
}

const mutations = {
  [types.SET_LOGGED_IN_STATUS] (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  [types.SET_DISPLAY_NAME] (state, displayName) {
    state.displayName = displayName
  }
}

const actions = {
  updateUserStatus ({commit}) {
    commit(types.SET_LOGGED_IN_STATUS, isLoggedIn())
  },
  getUserInfo ({commit}) {
    const isUserLoggedIn = isLoggedIn()
    commit(types.SET_LOGGED_IN_STATUS, isUserLoggedIn)

    if (isUserLoggedIn) {
      getUserProfile()
        .then(userProfile => {
          const { firstName, lastName } = userProfile
          const displayName = `${firstName} ${lastName}`
          commit(types.SET_DISPLAY_NAME, displayName)
        })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
