let id = 0

const state = {
  toasts: []
}

const mutations = {
  addToast (state, toast) {
    state.toasts.push(toast)
  },
  removeToast (state, toast) {
    state.toasts = state.toasts.filter(t => t.id !== toast.id)
  }
}

const actions = {
  addToast ({commit}, toast) {
    toast.id = id++
    toast.dismissAfter = toast.dismissAfter || 5000
    toast.type = toast.type || 'info'

    commit('addToast', toast)

    setTimeout(() => {
      commit('removeToast', toast)
    }, toast.dismissAfter)
  },
  removeToast ({commit}, toast) {
    commit('removeToast', toast)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
