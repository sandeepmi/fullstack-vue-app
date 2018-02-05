<template>
  <div>
    <h1>Items</h1>
    <div v-for="item in items" v-bind:key="item.id" class="item">
      <div>{{item.title}}</div>
      <div>{{item.type}}</div>
    </div>
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

<style>
  .item {
    background-color: #eeeeee;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
