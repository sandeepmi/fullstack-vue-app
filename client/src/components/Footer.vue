<template>
  <footer class="footer ss-footer">
    <div class="container">
      <span class="copyright">© {{copyRightYear}} Copyright Text</span>
      <span class="float-right">Place footer content here.</span>
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
