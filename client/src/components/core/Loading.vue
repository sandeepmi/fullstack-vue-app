<template>
  <div class="loading-wrapper" :class="cssClasses">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    type: String,
    centered: Boolean,
    size: String
  },
  computed: {
    cssClasses () {
      const isCard = (this.type === 'card')
      return [
        {
          'card': isCard,
          'centered': this.centered || isCard
        },
        this.size
      ]
    }
  }
}
</script>
