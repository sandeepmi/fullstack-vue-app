<template>
  <transition name="fade">
    <div v-if="text" class="my-2" :class="cssClass">{{text}}</div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  props: {
    text: String,
    cssClass: {
      type: String,
      default: 'text-danger'
    }
  }
}
</script>
