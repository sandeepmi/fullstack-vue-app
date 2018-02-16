<template>
  <div class="container">
    <h1>Items</h1>
    <ul class="collection">
      <li v-for="item in items" v-bind:key="item._id" class="collection-item item">
        <a class="btn-floating light-blue darken-1 right" @click="editItem(item)"><i class="material-icons">mode_edit</i></a>
        <span>{{item.title}}</span><br>
        <span>{{item.type}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import itemsService from '@/services/itemsService'
import EditItem from './EditItemModal'
import { showModal } from '../helpers/modal'
import { cloneObj } from '../helpers/utils'
import { mapState } from 'vuex'

export default {
  name: 'Items',
  computed: mapState({
    items: state => state.items
  }),
  mounted () {
    this.getItems()
  },
  methods: {
    getItems () {
      itemsService.getItems()
        .then(res => res.json())
        .then(data => {
          this.$store.dispatch('setItems', data)
        })
    },

    editItem (item) {
      showModal(this.$root, EditItem, { item: cloneObj(item) })
    }
  }
}
</script>
