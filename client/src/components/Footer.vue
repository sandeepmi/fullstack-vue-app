<template>
  <footer class="page-footer light-blue darken-1">
    <div class="footer-copyright">
      <div class="container">
        © {{copyRightYear}} Copyright Text
        <router-link :to="{ name: 'Items' }" class="grey-text text-lighten-4 right">Items</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      copyRightYear: (new Date()).getFullYear()
    }
  }
}
</script>
