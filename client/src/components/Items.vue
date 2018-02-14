<template>
  <div class="container">
    <h1>Items</h1>
    <ul class="collection">
      <li v-for="item in items" v-bind:key="item.id" class="collection-item item">
        <a class="btn-floating light-blue darken-1 right" @click="editItem(item)"><i class="material-icons">mode_edit</i></a>
        <span>{{item.title}}</span><br>
        <span>{{item.type}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import itemsService from '@/services/itemsService'
import EditItem from './EditItem'
import { showModal } from '../common/modal'
import { cloneObj } from '../common/utils'

export default {
  name: 'Items',
  data () {
    return {
      items: [],
      isEditMode: false,
      itemInEditMode: null
    }
  },
  mounted () {
    this.showItems()
  },
  methods: {
    showItems () {
      itemsService.getItems()
        .then(res => res.json())
        .then(data => {
          this.items = data
        })
    },

    editItem (item) {
      showModal(this.$root, EditItem, { item: cloneObj(item) })
    }
  }
}
</script>
