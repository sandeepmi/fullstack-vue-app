import itemsService from '@/services/itemsService'
import { getErrorMsg, itemsMsgs } from '@/helpers'

const state = {
  items: [],
  listViewStatus: null,
  isLoading: false,
  isSaving: false
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  updateItem (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1, item)
  },
  setListViewStatus (state, status) {
    state.listViewStatus = status
  },
  setLoadingStatus (state, isLoading) {
    state.isLoading = isLoading
  },
  setSavingStatus (state, isSaving) {
    state.isSaving = isSaving
  }
}

const actions = {
  getItems ({commit}) {
    commit('setLoadingStatus', true)
    return itemsService.getItems()
      .then(items => {
        if (items && items.length > 0) {
          commit('setItems', items)
        } else {
          commit('setListViewStatus', itemsMsgs.noItems)
        }
        commit('setLoadingStatus', false)
      })
      .catch(err => {
        commit('setListViewStatus', getErrorMsg(err))
        commit('setLoadingStatus', false)
      })
  },
  updateItem ({commit}, { item, onSuccess, onError }) {
    commit('setSavingStatus', true)
    return itemsService.updateItem(item)
      .then(() => {
        commit('updateItem', item)
        commit('setSavingStatus', false)
        onSuccess()
      })
      .catch(err => {
        commit('setSavingStatus', false)
        onError(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
