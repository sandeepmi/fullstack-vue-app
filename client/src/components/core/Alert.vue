<template>
  <transition name="fade">
    <div v-if="text" class="alert" :class="cssClass">
      <div v-if="isHtml" v-html="text"></div>
      <div v-else v-text="text"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    text: String,
    isHtml: {
      type: Boolean,
      default: false
    },
    cssClass: {
      type: String,
      default: 'alert-danger'
    }
  }
}
</script>
