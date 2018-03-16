import { shallow, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'Vue'
import Vuex from 'vuex'
import ItemList from '../src/components/items/ItemList.vue'
import itemsStore from '../src/store/modules/items'
import * as types from '../src/store/mutation-types'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('ItemList.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    state = {
      items: [],
      listViewStatus: null,
      isLoading: false,
      isSaving: false
    }

    actions = {
      getItems: ({ commit }) => {
        return new Promise((resolve, reject) => {
          const items = [
            {
              title: 'test title',
              type: 'test category'
            }
          ]
          commit(types.SET_ITEMS, items)
          resolve()
        })
      }
    }

    store = new Vuex.Store({
      modules: {
        items: {
          state,
          actions,
          mutations: itemsStore.mutations,
          getters: itemsStore.getters,
          namespaced: true
        }
      }
    })
  })

  it('should render h1 with item count', () => {
    const wrapper = shallow(ItemList, { store, localVue })
    return Vue.nextTick(() => {
      expect(wrapper.find('h1').text()).to.include('Items')
      expect(wrapper.find('.item-count').text()).to.equal('(1)')
    })
  })

  it('should render item list', () => {
    const wrapper = shallow(ItemList, { store, localVue })
    return Vue.nextTick(() => {
      const item = wrapper.find('.list-group-item')
      expect(item.find('h5').text()).to.equal('test title')
    })
  })

  it('should render edit item modal on edit action', (done) => {
    const wrapper = shallow(ItemList, { store, localVue })
    Vue.nextTick(() => {
      const item = wrapper.find('.list-group-item')
      item.find('.item-edit').trigger('click')
      Vue.nextTick(() => {
        expect(item.find('h5').text()).to.equal('test title')
        done()
      })
    })
  })

  it('should render delete item confirm modal on delete action', (done) => {
    const wrapper = shallow(ItemList, { store, localVue })
    Vue.nextTick(() => {
      const item = wrapper.find('.list-group-item')
      item.find('.item-delete').trigger('click')
      Vue.nextTick(() => {
        expect(item.find('h5').text()).to.equal('test title')
        done()
      })
    })
  })
})
