<template>
  <div id="app">
    <Nav />
    <main>
      <router-view/>
    </main>
    <Footer />
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
  }
}
</script>
