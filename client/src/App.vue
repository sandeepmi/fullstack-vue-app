<template>
  <div id="app">
    <Nav />
    <main>
      <router-view/>
    </main>
    <Footer />

    <component :is="modalComponent" v-bind="modalComponentProps"></component>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  data () {
    return {
      modalComponent: undefined,
      modalComponentProps: {}
    }
  },
  mounted () {
    this.$root.$on('showModal', (componentInfo) => {
      this.modalComponent = componentInfo.component
      this.modalComponentProps = componentInfo.props
    })
  }
}
</script>
