<template>
  <div class="loading-wrapper" :class="cssClasses">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['type', 'centered', 'size'],
  computed: {
    cssClasses () {
      return [
        {
          'card centered': this.type === 'card',
          'centered': this.centered
        },
        this.size
      ]
    }
  }
}
</script>
