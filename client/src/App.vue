<template>
  <div id="app">
    <Nav />
    <main>
      <router-view/>
    </main>
    <Footer />

    <component :is="modal.component" v-bind="modal.props"></component>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Footer from './components/Footer'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  computed: {
    ...mapGetters({
      modal: 'getModal'
    })
  }
}
</script>
