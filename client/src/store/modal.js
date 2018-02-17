const state = {
  modal: {
    component: undefined,
    props: {}
  }
}

const getters = {
  getModal: state => state.modal
}

const mutations = {
  setModal (state, modal) {
    state.modal = modal
  }
}

const actions = {
  showModal ({commit}, modal) {
    commit('setModal', modal)
  },
  closeModal ({commit}) {
    commit('setModal', {
      component: undefined,
      props: {}
    })
  }
}

const modal = {
  state,
  getters,
  mutations,
  actions
}

export default modal
