<template>
  <div id="app">
    <Nav />
    <main>
      <router-view/>
    </main>
    <Footer />

    <EditItem v-if="showEditItemModal" v-bind:item="editItemData" @close="closeEditItemModal" />
  </div>
</template>

<script>
import Nav from './components/Nav'
import Footer from './components/Footer'
import EditItem from './components/EditItem'

export default {
  name: 'App',
  components: {
    Nav,
    Footer,
    EditItem
  },
  data () {
    return {
      showEditItemModal: false,
      editItemData: {}
    }
  },
  mounted () {
    this.$root.$on('showEditItemModal', (item) => {
      this.showEditItemModal = true
      this.editItemData = item
    })
  },
  methods: {
    closeEditItemModal () {
      this.showEditItemModal = false
      this.editItemData = {}
    }
  }
}
</script>
