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
          commit(types.SET_DISPLAY_NAME, getDisplayName(userProfile))
        })
    }
  },
  updateDisplayName ({commit}, userProfile) {
    commit(types.SET_DISPLAY_NAME, getDisplayName(userProfile))
  }
}

function getDisplayName (userProfile) {
  const { firstName, lastName } = userProfile
  const displayName = `${firstName} ${lastName}`

  return displayName
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
