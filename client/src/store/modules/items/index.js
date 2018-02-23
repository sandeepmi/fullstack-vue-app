import itemsService from '@/services/itemsService'
import { getErrorMsg, messages } from '@/helpers'

const state = {
  items: [],
  listViewStatus: null,
  isLoading: false,
  isSaving: false
}

const getters = {
  itemCount: state => {
    return state.items.length
  }
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  addItem (state, item) {
    state.items.push(item)
  },
  updateItem (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1, item)
  },
  deleteItem (state, item) {
    const itemIndex = state.items.findIndex(i => i._id === item._id)
    state.items.splice(itemIndex, 1)
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
          commit('setListViewStatus', messages.items.noItems)
        }
        commit('setLoadingStatus', false)
      })
      .catch(err => {
        commit('setListViewStatus', getErrorMsg(err))
        commit('setLoadingStatus', false)
      })
  },
  addOrUpdateItem ({commit}, { item, onSuccess, onError }) {
    commit('setSavingStatus', true)

    const isNewItem = !item._id
    let promise = isNewItem
      ? itemsService.createItem(item)
      : itemsService.updateItem(item)

    promise = promise
      .then(savedItem => {
        isNewItem ? commit('addItem', savedItem) : commit('updateItem', savedItem)
        commit('setSavingStatus', false)
        onSuccess()
      })
      .catch(err => {
        commit('setSavingStatus', false)
        onError(err)
      })

    return promise
  },
  deleteItem ({commit}, { item, onSuccess, onError }) {
    item.isDeleting = true
    commit('updateItem', item)
    return itemsService.deleteItem(item)
      .then(savedItem => {
        commit('deleteItem', item)
        onSuccess()
      })
      .catch(err => {
        delete item.isDeleting
        commit('updateItem', item)
        onError(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
