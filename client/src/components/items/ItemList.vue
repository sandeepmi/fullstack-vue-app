<template>
  <div class="container">
    <h1>Items</h1>
    <div v-if="items.length > 0">
      <ul class="collection">
        <li v-for="item in items" v-bind:key="item._id" class="collection-item item">
          <a class="btn-floating light-blue darken-1 right" @click="editItem(item)"><i class="material-icons">mode_edit</i></a>
          <span>{{item.title}}</span><br>
          <span>{{item.type}}</span>
        </li>
      </ul>
    </div>
    <div class="red-text" v-show="status" v-text="status"></div>
  </div>
</template>

<script>
import EditItem from './EditItemModal'
import { cloneObj, showModal } from '@/helpers'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Items',
  computed: mapState('items', {
    items: 'items',
    status: 'listViewStatus'
  }),
  mounted () {
    this.getItems()
  },
  methods: {
    ...mapActions('items', [
      'getItems'
    ]),

    editItem (item) {
      showModal(this.$root, EditItem, { item: cloneObj(item) })
    }
  }
}
</script>
