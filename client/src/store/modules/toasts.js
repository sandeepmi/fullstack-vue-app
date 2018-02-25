import * as types from '../mutation-types'

let id = 0

const state = {
  toasts: []
}

const mutations = {
  [types.ADD_TOAST] (state, toast) {
    state.toasts.push(toast)
  },
  [types.REMOVE_TOAST] (state, toast) {
    state.toasts = state.toasts.filter(t => t.id !== toast.id)
  }
}

const actions = {
  addToast ({commit}, toast) {
    toast.id = id++
    toast.dismissAfter = toast.dismissAfter || 5000
    toast.type = toast.type || 'info'

    commit(types.ADD_TOAST, toast)

    setTimeout(() => {
      commit(types.REMOVE_TOAST, toast)
    }, toast.dismissAfter)
  },
  removeToast ({commit}, toast) {
    commit(types.REMOVE_TOAST, toast)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
