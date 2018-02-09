<template>
  <div class="container">
    <h1>Items</h1>
    <ul class="collection">
      <li v-for="item in items" v-bind:key="item.id" class="collection-item item">
        <span>{{item.title}}</span><br>
        <span>{{item.type}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import itemsService from '@/services/itemsService.js'

export default {
  name: 'Items',
  data () {
    return {
      items: []
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
    }
  }
}
</script>
