<template>
  <transition name="fade">
    <div v-if="text" class="alert" :class="cssClass">{{text}}</div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    text: String,
    cssClass: {
      type: String,
      default: 'alert-danger'
    }
  }
}
</script>
