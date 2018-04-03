<template>
  <div id="app">
    <Header />
    <main>
      <router-view/>
    </main>
    <Footer />

    <component :is="modalComponent" v-bind="modalComponentProps"></component>
    <Toasts />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Toasts from './components/core/Toasts'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Toasts
  },
  data () {
    return {
      modalComponent: undefined,
      modalComponentProps: {}
    }
  },
  mounted () {
    // get logged in user's info
    this.$store.dispatch('user/getUserInfo')

    // show modal event
    this.$root.$on('showModal', (componentInfo) => {
      this.modalComponent = componentInfo.component
      this.modalComponentProps = componentInfo.props
    })
  }
}
</script>
